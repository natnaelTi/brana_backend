import * as logger from "../utils/logger.utils.js";
import { sequelize } from "../models/models.js";

// Get arguments
let args = process.argv.slice(2);

let eraseDatabaseOnSync = true;

// TODO: figure out how to get args in typescript
// console.log(args);
// if (args[0] && args[0] == "-clean") {
// 	logger.info("ERASING DATABASE");
// 	eraseDatabaseOnSync = true;
// }

logger.info("DATABASE SYNC STARTED");
sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
	logger.success("DATABASE SYNC SUCCESSFUL");
	process.exit(0);
});
