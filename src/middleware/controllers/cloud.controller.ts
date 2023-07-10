import axios from "axios";
import crypto from "crypto";
import streamifier from "streamifier";

import { getOne as getAudiobook } from "../../services/audiobook.service.js";
import {
	getByAudiobookAndNumber as getChapterByNumber,
	getOne as getChapter,
} from "../../services/chapter.service.js";

import * as multerMiddleware from "../storage/multer.middleware.js";

import { bucket } from "../../utils/cloud.util.js";
import {
	responseGenerator,
	responseTypes,
	messageTypes,
} from "../../utils/responseGenerator.utils.js";
import path from "path";

const audiobookDirectory = "audiobooks/";
const sampleDirectory = "samples/";
const coverDirectory = "images/covers";

// TODO: Optimize upload function after testing bucket
function uploadFile(fileName, directory, extension, buffer) {
	// path.extname(req.file.originalname)
	const blob = bucket.file(directory + "/" + fileName + extension);
	const blobStream = blob.createWriteStream();

	return new Promise((resolve, reject) => {
		streamifier
			.createReadStream(buffer)
			.on("error", (err) => {
				return reject(err);
			})
			.pipe(blobStream)
			.on("finish", async (response) => {
				return resolve(response);
			});
	});
}

export async function uploadFromAudiobook(req, res) {
	// Get audiobook and chapter
	const audiobook = await getAudiobook(req.params.id);
	const chapter = await getChapterByNumber(req.params.id, req.params.chapter);

	return upload(req, res, audiobook, chapter);
}

export async function uploadFromChapter(req, res) {
	// Get audiobook and chapter
	const chapter = await getChapter(req.params.id);
	const audiobook = await getAudiobook(chapter.dataValues.audiobook_id);

	return upload(req, res, audiobook, chapter);
}

// Uploading audiobook chapters
async function upload(req, res, audiobook, chapter) {
	const resGen = new responseGenerator(
		res,
		"Audiobook Upload",
		messageTypes.OPERATION
	);

	// Check if audiobook doesn't exist
	if (!audiobook) {
		return resGen.error(responseTypes.CLIENT_ERROR, "Audiobook doesn't exist!");
	}

	// Check if chapter doesn't exist
	if (!chapter) {
		return resGen.error(responseTypes.CLIENT_ERROR, "Chapter doesn't exist!");
	}

	try {
		// Get file from form-data into memory
		await multerMiddleware.processAudiobook(req, res);

		// Validation needs to be after multer parses upload
		if (req.fileValidationError) {
			return resGen.error(responseTypes.CLIENT_ERROR, req.fileValidationError);
		}

		// Check if file has been uploaded to memory
		if (req.file == undefined) {
			return resGen.error(
				responseTypes.CLIENT_ERROR,
				"Please upload necessary files!"
			);
		}

		// Generate Filename
		const fileName = chapter.dataValues.number;
		const extension = path.extname(req.file.originalname);
		let directory;

		// Generate Directory
		if (audiobook.dataValues.folder === null) {
			directory = audiobookDirectory + crypto.randomBytes(16).toString("hex");
		} else {
			directory = audiobook.dataValues.folder;
		}

		// Upload to GCP
		// Path is {GCS_URL}/audiobooks/{chapterNumber}
		const blob = bucket.file(
			directory + "/" + fileName + path.extname(req.file.originalname)
		);
		const blobStream = blob.createWriteStream();

		// Create Stream
		return new Promise((resolve, reject) => {
			streamifier
				.createReadStream(req.file.buffer)
				.on("error", (err) => {
					return reject(err);
				})
				.pipe(blobStream)
				.on("finish", async (response) => {
					return resolve(response);
				});
		}).then(async () => {
			const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
			// Set the file for the chapter
			// For streams
			chapter.file = publicUrl;
			await chapter.save();

			// Set the folder of the audiobook on database
			// For downloads
			await audiobook.save();
			req.audiobook = null;
			return resGen.simple(responseTypes.SUCCESS);
		});
	} catch (err) {
		console.log(err);
		return resGen.error(responseTypes.SERVER_ERROR, err.message);
	}
}
// Uploading sample file
export async function uploadSample(req, res) {
	const resGen = new responseGenerator(
		res,
		"Sample Upload",
		messageTypes.OPERATION
	);
	try {
		const audiobook = await getAudiobook(req.params.id);

		if (!audiobook) {
			return resGen.error(
				responseTypes.CLIENT_ERROR,
				"Audiobook doesn't exist!"
			);
		}

		await multerMiddleware.processSample(req, res);
		// Validation needs to be after multer parses upload
		if (req.fileValidationError) {
			return resGen.error(responseTypes.CLIENT_ERROR, req.fileValidationError);
		}
		if (req.file == undefined) {
			return resGen.error(
				responseTypes.CLIENT_ERROR,
				"Please upload necessary files!"
			);
		}

		// if (data.sample != null) {
		// 	multerMiddleware.removeFile(data.sample);
		// }

		// Generate Filename
		const fileName = crypto.randomBytes(16).toString("hex");

		// Upload to GCP
		// Path is {GCS_URL}/audiobooks/{chapterNumber}
		const blob = bucket.file(
			sampleDirectory + "/" + fileName + path.extname(req.file.originalname)
		);

		const blobStream = blob.createWriteStream();

		// Create Stream
		return new Promise((resolve, reject) => {
			streamifier
				.createReadStream(req.file.buffer)
				.on("error", (err) => {
					return reject(err);
				})
				.pipe(blobStream)
				.on("finish", async (response) => {
					return resolve(response);
				});
		}).then(async () => {
			const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
			audiobook.sample = publicUrl;
			await audiobook.save();

			return resGen.simple(responseTypes.SUCCESS);
		});
	} catch (err) {
		console.log(err);
		return resGen.error(responseTypes.SERVER_ERROR, err.message);
	}
}
// Uploading cover
export async function uploadCover(req, res) {
	const resGen = new responseGenerator(
		res,
		"Cover Upload",
		messageTypes.OPERATION
	);
	try {
		const audiobook = await getAudiobook(req.params.id);

		if (!audiobook) {
			return resGen.error(
				responseTypes.CLIENT_ERROR,
				"Audiobook doesn't exist!"
			);
		}

		await multerMiddleware.processCover(req, res);

		// Validation needs to be after multer parses upload
		if (req.fileValidationError) {
			return resGen.error(responseTypes.CLIENT_ERROR, req.fileValidationError);
		}
		if (req.file == undefined) {
			return resGen.error(
				responseTypes.CLIENT_ERROR,
				"Please upload necessary files!"
			);
		}

		// if (audiobook.cover != null) {
		// 	multerMiddleware.removeFile(audiobook.cover);
		// }

		// Generate Filename
		const fileName = crypto.randomBytes(16).toString("hex");

		// Upload to GCP
		// Path is {GCS_URL}/audiobooks/{chapterNumber}
		const blob = bucket.file(
			coverDirectory + "/" + fileName + path.extname(req.file.originalname)
		);

		const blobStream = blob.createWriteStream();

		// Create Stream
		return new Promise((resolve, reject) => {
			streamifier
				.createReadStream(req.file.buffer)
				.on("error", (err) => {
					return reject(err);
				})
				.pipe(blobStream)
				.on("finish", async (response) => {
					return resolve(response);
				});
		}).then(async () => {
			const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
			audiobook.cover = publicUrl;
			await audiobook.save();

			return resGen.simple(responseTypes.SUCCESS);
		});
	} catch (err) {
		console.log(err);
		return resGen.error(responseTypes.SERVER_ERROR, err.message);
	}
}

// TODO: Figure out how to download folder from gcs
export async function download(req, res) {}

export async function stream(req, res) {
	const resGen = new responseGenerator(res, "Stream", messageTypes.OPERATION);

	try {
		const chapter = await getChapterByNumber(req.params.id, req.params.chapter);

		// Check if chapter doesn't exist
		if (!chapter) {
			return resGen.error(responseTypes.CLIENT_ERROR, "Chapter doesn't exist!");
		}

		// pipe the cloud file
		const response = await axios.get(chapter.file, {
			responseType: "stream",
		});

		response.data.pipe(res);
	} catch (err) {
		console.log(err);
		return resGen.error(responseTypes.SERVER_ERROR, err.message);
	}
}
