import { Router } from "express";

import * as audiobookController from "../middleware/controllers/audiobook.controller.js";

const searchRouter = Router();

searchRouter.get("/audiobooks", audiobookController.search);

export { searchRouter };
