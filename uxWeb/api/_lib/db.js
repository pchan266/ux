import pg from "pg";

// Return DATE columns as raw YYYY-MM-DD strings, not Date objects built in the
// server's timezone, which shifts them by a day.
pg.types.setTypeParser(1082, (value) => value);

const connectionString = process.env.POSTGRES_URL;

let pool = globalThis.__uxPgPool;

export function getPool() {
  if (!connectionString) {
    throw new Error("POSTGRES_URL is not set");
  }

  if (!pool) {
    pool = new pg.Pool({
      connectionString,
      max: 3,
      idleTimeoutMillis: 10_000,
      // Prisma Postgres suspends idle instances; resuming one can take a while.
      connectionTimeoutMillis: 30_000,
      ssl: { rejectUnauthorized: false },
    });

    pool.on("error", (err) => {
      console.error("Unexpected idle Postgres client error", err);
    });

    globalThis.__uxPgPool = pool;
  }

  return pool;
}

export function query(text, params) {
  return getPool().query(text, params);
}
