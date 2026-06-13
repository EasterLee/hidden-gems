const express = require("express");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

async function verify(token) {
	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: process.env.client_id, // Specify the WEB_CLIENT_ID of the app that accesses the backend
		// Or, if multiple clients access the backend:
		//[WEB_CLIENT_ID_1, WEB_CLIENT_ID_2, WEB_CLIENT_ID_3]
	});
	const payload = ticket.getPayload();
	// This ID is unique to each Google Account, making it suitable for use as a primary key
	// during account lookup. Email is not a good choice because it can be changed by the user.
	const userid = payload["sub"];
	// If the request specified a Google Workspace domain:
	// const domain = payload['hd'];
	console.log(payload);
	return userid;
}

console.log(process.env.client_id);
console.log(process.env.client_secret);

const app = express();
const port = 3000;

app.use((req, res, next) => {
	res.set("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
	next();
});
app.use(express.json());
app.use(express.static("../frontend/dist"));

app.get("/auth/login", (req, res) => {});

app.get("/stream/:trackId", (req, res) => {
	const filePath = path.join(
		__dirname,
		"uploads",
		`${req.params.trackId}.mp3`,
	);
	const stat = fs.statSync(filePath);
	const fileSize = stat.size;
	const range = req.headers.range;
	if (range) {
		// Parse "bytes=start-end"
		const [startStr, endStr] = range.replace(/bytes=/, "").split("-");
		const start = parseInt(startStr, 10);
		const end = endStr ? parseInt(endStr, 10) : fileSize - 1;
		const chunkSize = end - start + 1;

		res.writeHead(206, {
			// 206 Partial Content
			"Content-Range": `bytes ${start}-${end}/${fileSize}`,
			"Accept-Ranges": "bytes",
			"Content-Length": chunkSize,
			"Content-Type": "audio/mpeg",
		});

		fs.createReadStream(filePath, { start, end }).pipe(res);
	} else {
		// Full file (initial request)
		res.writeHead(200, {
			"Content-Length": fileSize,
			"Content-Type": "audio/mpeg",
		});
		fs.createReadStream(filePath).pipe(res);
	}
});

app.post("/auth/token-verification", async (req, res) => {
	//console.log(req.body);

	let userid = await verify(req.body.credential).catch(console.error);
	res.send({ userid });
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
