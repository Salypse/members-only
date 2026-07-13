const { Client } = require("pg");
require("dotenv").config();

const SQL = `
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS session;

    CREATE TABLE users (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      full_name VARCHAR( 255 ) NOT NULL,
      username VARCHAR( 255 ) NOT NULL,
      password VARCHAR( 255 ) NOT NULL,
      member boolean DEFAULT false,
      admin boolean DEFAULT false
    );

    CREATE TABLE "session" (
      "sid" varchar NOT NULL COLLATE "default",
      "sess" json NOT NULL,
      "expire" timestamp(6) NOT NULL
    )     
    WITH (OIDS=FALSE);

    ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

    CREATE INDEX "IDX_session_expire" ON "session" ("expire");
`;

async function main() {
  console.log("Seeding...");
  const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
  });

  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("End.");
}

main();
