const express = require("express");
const fs = require("fs");
const path = require("path");
const { tokenVerification } = require("./auth");
const { getSigned } = require("./s3");
require("dotenv").config();

const app = express();
const port = 3000;

app.use((req, res, next) => {
	res.set("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
	next();
});
app.use(express.json());
app.use(express.static("../frontend/dist"));

// TODO: Move audio to file server
app.get("/stream/:trackId", async (req, res) => {
	const url = await getSigned(req.params.trackId);
	res.json({ url });
});

app.post("/auth/token-verification", tokenVerification);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
