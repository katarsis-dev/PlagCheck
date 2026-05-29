import pg from "pg";
import { validateEnv } from "./config.js";

const client = new pg.Pool({
  connectionString: validateEnv().value.DATABASE_URL,
});

export default client;
