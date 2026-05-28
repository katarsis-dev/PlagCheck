import express from "express";
import { validateEnv } from "./config/config.js";
import { router } from "./router/route.js";

const app = express();
app.use(express.json());

app.use("/", router);

app.listen(validateEnv().value.PORT, () => {
  console.log(
    `Server Running on : 'http://localhost:${validateEnv().value.PORT}'`,
  );
});
