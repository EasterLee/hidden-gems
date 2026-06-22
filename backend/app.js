const express = require("express");
const fs = require("fs");
const path = require("path");
const { tokenVerification } = require("./auth");
const { getSigned, getSignedUpload } = require("./s3");
require("dotenv").config();

const app = express();
const port = 3000;

app.use((req, res, next) => {
	res.set("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
	next();
});
app.use(express.json());
app.use(express.static("../frontend/dist"));

app.get("/stream/:trackId", async (req, res) => {
	const url = await getSigned(req.params.trackId);
	res.json({ url });
});

app.post("/api/uploads/presign", async (req, res) => {
	const { name } = req.body;
	const url = await getSignedUpload(name);
	res.json({ url });
});

app.post("/auth/token-verification", tokenVerification);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
