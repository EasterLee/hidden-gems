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

async function tokenVerification(req, res) {
	let userid = await verify(req.body.credential).catch(console.error);
	res.send({ userid });
}

module.exports = { tokenVerification };
