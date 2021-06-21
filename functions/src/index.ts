import * as functions from "firebase-functions";

import { tmpdir } from "os";
import { join, dirname } from "path";
import * as sharp from "sharp";
import * as fs from "fs-extra";

import { Storage } from "@google-cloud/storage";

const gcs = new Storage();

const optimiseImages = functions.storage.object().onFinalize(async (object) => {
	const bucket = gcs.bucket(object.bucket);
	const filePath = object.name;
	const { metadata } = object;
	if (!filePath) return false;

	const fileName = filePath?.split("/").pop();
	const bucketDir = dirname(filePath);

	const workingDir = join(tmpdir(), "thumbs");

	const tmpFilePath = join(workingDir, "source.png");

	if (fileName?.includes("thumb@") || !object.contentType?.includes("image")) {
		console.log("Exiting function");
		return false;
	}

	// Ensure thumbnail dir exists
	await fs.ensureDir(workingDir);

	// Download source file
	await bucket.file(filePath).download({
		destination: tmpFilePath,
	});

	const sizes = [32, 128, 512];

	const uploadPromises = sizes.map(async (size) => {
		const fileExtension = metadata?.filename.split(".").pop();

		const thumbName = `thumb@${size}_${fileName}${
			!fileName?.includes(".") && `.${fileExtension}`
		}`;

		const thumbPath = join(workingDir, thumbName);

		// This is where the magic happens
		await sharp(tmpFilePath).resize(size).toFile(thumbPath);

		return bucket.upload(thumbPath, {
			destination: join(bucketDir, thumbName),
		});
	});

	await Promise.all(uploadPromises);

	return fs.remove(workingDir);
});
export default optimiseImages;
