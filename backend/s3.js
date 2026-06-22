const {
	S3Client,
	GetObjectCommand,
	ListObjectsV2Command,
	PutObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
require("dotenv").config();

const r2 = new S3Client({
	region: "auto",
	endpoint: process.env.s3_api,
	credentials: {
		accessKeyId: process.env.s3_accessKeyID,
		secretAccessKey: process.env.s3_secretAccessKey,
	},
});

async function getSigned(fileKey) {
	return await getSignedUrl(
		r2,
		new GetObjectCommand({ Bucket: "audio", Key: fileKey }),
		{ expiresIn: 3600 }, // seconds
	);
}

async function getSignedUpload(fileKey) {
	return await getSignedUrl(
		r2,
		new PutObjectCommand({
			Bucket: "audio",
			Key: fileKey,
		}),
		{ expiresIn: 3600 }, // seconds
	);
}

async function main() {
	const res = await r2.send(
		new ListObjectsV2Command({
			Bucket: "audio",
		}),
	);
	for (const obj of res.Contents ?? []) {
		console.log(obj.Key, obj.Size, obj.LastModified);
	}
}

module.exports = { getSigned, getSignedUpload };
