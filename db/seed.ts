import { faker } from "@faker-js/faker";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";
import dotenv from "dotenv";

dotenv.config({ path: "./.env.local" });

const client = createClient({
  url: process.env.DATABASE_URL!,
});

const db = drizzle(client, { schema });

const TOTAL_USERS = 100;

async function main() {
  console.log("Start seeding...");

  const usersToPush = [];

  for (let i = 0; i < TOTAL_USERS; i++) {
    const user = {
      id: faker.database.mongodbObjectId(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
    };

    usersToPush.push(user);
  }

  const users = await db
    .insert(schema.users)
    .values(usersToPush)
    .onConflictDoNothing()
    .returning();

  console.log("Users seeded.", { users });
}

main();
