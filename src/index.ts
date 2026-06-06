import express from "express";
import { validateEnv } from "./config/config.js";
import { router } from "./router/route.js";
import { errorHandler } from "./middleware/errorHandler.js";
import cookieParses from "cookie-parser";
import morgan from "morgan";
const app = express();

app.use(express.json());
app.use(cookieParses());
app.use(morgan("tiny"));

app.use("/", router);
app.use((req, res) => {
  return res.status(404).json({
    message: "route not found",
  });
});

app.use(errorHandler);
app.listen(validateEnv().value.PORT, () => {
  console.log(
    `Server Running on : 'http://localhost:${validateEnv().value.PORT}'`,
  );
});
