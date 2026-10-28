import { initializeApp } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import { defineString } from "firebase-functions/params";
import { onObjectFinalized } from "firebase-functions/v2/storage";

import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, dirname, join } from "node:path";
import sharp from "sharp";

initializeApp();

const region = defineString("FUNCTION_REGION");

export const optimiseImages = onObjectFinalized({ region }, async (event) => {
	const object = event.data;
	const filePath = object.name;
	const fileName = basename(filePath);

	if (fileName.includes("thumb@") || !object.contentType?.includes("image")) {
		return;
	}

	const bucket = getStorage().bucket(object.bucket);
	const bucketDir = dirname(filePath);
	const workingDir = await mkdtemp(join(tmpdir(), "thumbs-"));
	const tmpFilePath = join(workingDir, fileName);

	try {
		await bucket.file(filePath).download({ destination: tmpFilePath });

		const sizes = [800];

		console.log(
			`Creating optimised images at sizes ${sizes.toString()} for ${filePath}`
		);

		await Promise.all(
			sizes.map(async (size) => {
				const thumbName = `thumb@${size}_${fileName}`;
				const thumbPath = join(workingDir, thumbName);

				await sharp(tmpFilePath).resize(size).toFile(thumbPath);

				console.log(`Saving ${thumbPath} to ${bucketDir}`);

				await bucket.upload(thumbPath, {
					destination: join(bucketDir, thumbName),
					metadata: { contentType: object.contentType },
				});
			})
		);
	} finally {
		await rm(workingDir, { recursive: true, force: true });
	}
});
