import { relations, sql } from "drizzle-orm";
import { primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";

export const users = sqliteTable("users", {
  id: text("id").default(uuidv4()).primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const usersRelations = relations(users, ({ many }) => ({
  usersToSkills: many(usersToSkills),
}));

export const skills = sqliteTable("skills", {
  id: text("id").default(uuidv4()).primaryKey(),
  name: text("name").notNull(),
  icon: text("icon_url").notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const skillsRelations = relations(skills, ({ many }) => ({
  usersToSkills: many(usersToSkills),
}));

export const usersToSkills = sqliteTable(
  "users_to_skills",
  {
    userId: text("user_id")
      .references(() => users.id)
      .notNull(),
    skillId: text("skill_id")
      .references(() => skills.id)
      .notNull(),
    proficiency: text("proficiency", {
      enum: ["beginner", "intermediate", "expert"],
    }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.skillId] }),
  })
);

export const userToSkillsRelations = relations(usersToSkills, ({ one }) => ({
  skill: one(skills, {
    fields: [usersToSkills.skillId],
    references: [skills.id],
  }),

  user: one(users, {
    fields: [usersToSkills.userId],
    references: [users.id],
  }),
}));
