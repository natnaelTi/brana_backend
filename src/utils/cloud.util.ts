import { Storage } from "@google-cloud/storage";
import path from "path";

const storage = new Storage({
	keyFilename: path.join(process.cwd(), "static/keys/berana_gcs.json"),
});

export const bucket = storage.bucket("berana_audiobooks");
