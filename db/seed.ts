import { faker } from "@faker-js/faker";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";
import dotenv from "dotenv";

dotenv.config({ path: "./.env.local" });

const client = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN!,
});

const db = drizzle(client, { schema });

const TOTAL_USERS = 100;
const TOTAL_SKILLS = 50;
const TOTAL_SKILLS_TO_ADD = 5;

async function main() {
  console.log("Start seeding...");

  const usersToPush = [];

  const skillsToPush = [];

  const usersToSkillsToPush = [];

  const allProficiencies = ["beginner", "intermediate", "expert"] as const;

  for (let i = 0; i < TOTAL_USERS; i++) {
    const user = {
      id: faker.database.mongodbObjectId(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
    };

    usersToPush.push(user);
  }

  const usersFromDb = await db
    .insert(schema.users)
    .values(usersToPush)
    .onConflictDoNothing()
    .returning();

  for (let i = 0; i < TOTAL_SKILLS; i++) {
    const skill = {
      id: faker.database.mongodbObjectId(),
      name: faker.person.jobTitle(),
      icon: faker.image.avatar(),
    };

    skillsToPush.push(skill);
  }

  const skillsFromDb = await db
    .insert(schema.skills)
    .values(skillsToPush)
    .onConflictDoNothing()
    .returning();

  for (let i = 0; i < usersFromDb.length; i++) {
    const user = usersFromDb[i];
    let skillsIds: string[] = [];

    for (let j = 0; j < TOTAL_SKILLS_TO_ADD; j++) {
      const skillId =
        skillsFromDb[Math.floor(Math.random() * (skillsFromDb.length - 1))].id;

      skillsIds = Array.from(new Set([...skillsIds, skillId]));
    }

    for (let skillIndex = 0; skillIndex < skillsIds.length; skillIndex++) {
      usersToSkillsToPush.push({
        userId: user.id,
        skillId: skillsIds[skillIndex],
        proficiency:
          allProficiencies[Math.floor(Math.random() * allProficiencies.length)],
      });
    }
  }

  await db.insert(schema.usersToSkills).values(usersToSkillsToPush);
}

main();
