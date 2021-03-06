import * as functions from "firebase-functions";

import { tmpdir } from "os";
import { join, dirname } from "path";
import * as sharp from "sharp";
import * as fs from "fs-extra";

import { Storage } from "@google-cloud/storage";
import path = require("path");

const gcs = new Storage();

const optimiseImages = functions.storage.object().onFinalize(async (object) => {
	const bucket = gcs.bucket(object.bucket);
	const filePath = object.name;
	if (!filePath) return false;

	const fileName = path.basename(filePath);
	const bucketDir = dirname(filePath);

	const workingDir = join(tmpdir(), "thumbs");

	const tmpFilePath = join(workingDir, fileName);

	if (fileName?.includes("thumb@") || !object.contentType?.includes("image")) {
		return false;
	}

	// Ensure thumbnail dir exists
	await fs.ensureDir(workingDir);

	// Download source file
	await bucket.file(filePath).download({
		destination: tmpFilePath,
	});

	const sizes = [800];

	console.log(
		`Creating optimised images at sizes ${sizes.toString()} for ${filePath}`
	);

	const uploadPromises = sizes.map(async (size) => {
		const thumbName = `thumb@${size}_${fileName}`;

		const thumbPath = join(workingDir, thumbName);

		// This is where the magic happens
		await sharp(tmpFilePath).resize(size).toFile(thumbPath);

		console.log(`Saving ${thumbPath} to ${bucketDir}`);

		const metadata = {
			contentType: object.contentType,
		};

		return bucket.upload(thumbPath, {
			destination: join(bucketDir, thumbName),
			metadata,
		});
	});

	await Promise.all(uploadPromises);

	return fs.remove(workingDir);
});

export default optimiseImages;
