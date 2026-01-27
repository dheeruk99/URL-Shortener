const { pgTable, varchar, uuid, timestamp, text } = require("drizzle-orm/pg-core");
const { usersTable } = require("./user.model");

const urlsTable = pgTable("urls", {
  id: uuid().primaryKey().defaultRandom(),
  
  shortCode: varchar('code',{length:155}).unique().notNull(),
  targetURL: text('target_url').notNull(),

  userId: uuid('user_id').references(()=>usersTable.id).notNull(),

  createdAt:timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').$onUpdate(()=>new Date())
});

module.exports = {
    urlsTable
}

