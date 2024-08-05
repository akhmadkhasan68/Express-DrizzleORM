import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '123a123',
    database: 'research-drizzle',
});

export const db = drizzle(pool, {
    schema,
    logger: true,
});
