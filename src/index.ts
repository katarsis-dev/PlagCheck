import express from "express";
import { validateEnv } from "./config/config.js";
import { router } from "./router/route.js";
import { errorHandler } from "./middleware/errorHandler.js";
import cookieParses from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParses());
app.use("/", router);
app.use(errorHandler);

app.listen(validateEnv().value.PORT, () => {
  console.log(
    `Server Running on : 'http://localhost:${validateEnv().value.PORT}'`,
  );
});
