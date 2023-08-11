import express from "express";

import { PORT } from "./config.js";
import app from "./app.js";

export const server = express();

server.use(app);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});