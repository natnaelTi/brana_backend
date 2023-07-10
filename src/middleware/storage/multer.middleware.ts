import multer from "multer";
import util from "util";

// import path from "path";
// import crypto from "crypto";
// import fs from "fs";

const maxAudiobookSize = 10 * 1024 * 1024 * 1024; // 10GB
const maxSampleSize = 1 * 1024 * 1024 * 1024; // 1GB
const maxCoverSize = 1 * 1024 * 1024 * 1024; // 1GB

// const uploadDirectory = process.cwd() + "/resources/uploads/";
// const audiobookDirectory = uploadDirectory + "audiobooks/";
// const sampleDirectory = uploadDirectory + "samples/";
// const coverDirectory = uploadDirectory + "images/covers";

let audiobookConfig = multer({
	storage: multer.memoryStorage(),

	fileFilter: (req, file, cb) => {
		if (file.mimetype == "audio/mpeg") {
			return cb(null, true);
		} else {
			console.log(file.mimetype);
			req.fileValidationError = "'Only .mp3 format allowed!'";
			return cb(null, false);
		}
	},
	limit: { fileSize: maxAudiobookSize },
}).single("file");

let sampleConfig = multer({
	storage: multer.memoryStorage(),
	fileFilter: (req, file, cb) => {
		if (file.mimetype == "audio/mpeg") {
			return cb(null, true);
		} else {
			console.log(file.mimetype);
			req.fileValidationError = "'Only .mp3 format allowed!'";
			return cb(null, false);
		}
	},
	limit: { fileSize: maxSampleSize },
}).single("file");

let coverConfig = multer({
	storage: multer.memoryStorage(),
	fileFilter: (req, file, cb) => {
		if (
			file.mimetype == "image/png" ||
			file.mimetype == "image/jpg" ||
			file.mimetype == "image/jpeg"
		) {
			return cb(null, true);
		} else {
			req.fileValidationError = "'Only .png, .jpg and .jpeg format allowed!'";
			return cb(null, false);
		}
	},
	limit: { fileSize: maxCoverSize },
}).single("file");

export const processAudiobook = util.promisify(audiobookConfig);
export const processSample = util.promisify(sampleConfig);
export const processCover = util.promisify(coverConfig);

// export async function renameFile(oldPath: string, newName: string) {
// 	// oldPath will have both path and the old name
// 	let uploadPath = path.dirname(oldPath) + "\\";
// 	let ext = path.extname(oldPath);

// 	let newPath = uploadPath + newName + ext;

// 	fs.rename(oldPath, newPath, function (err) {
// 		if (err) console.log("ERROR: " + err);
// 	});

// 	return newPath;
// }

// export async function removeFile(filePath: string) {
// 	return fs.unlink(filePath, function (err) {
// 		if (err) console.log("ERROR: " + err);
// 	});
// }
