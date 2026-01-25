const {pgTable, timestamp, uuid, text, varchar } = require("drizzle-orm/pg-core");


const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),

  firstname:varchar('first_name',{length:55}).notNull(),
  lastname:varchar('last_name',{length: 55}),

  email:varchar({length:255}).unique().notNull(),

  password:text().notNull(),

  createdAt: timestamp('created_At').defaultNow().notNull(),
  updatedAt: timestamp('updated_At').$onUpdate(()=>new Date()),
});

module.exports = {
  usersTable
};