const { eq } = require('drizzle-orm');
const db = require('../db/index')
const {usersTable} = require('../models');
const {hashPassword,comparePasswords} = require('../utils/hash');

const createUser = async function (firstname, lastname, email, password) {
  const existingUser = await getUserByEmail(email);
  if (existingUser.length == 1) {
    return { status: "failed", message: `${email} already exists` };
  }
  const hashedPassword = await hashPassword(password);
  try {
    const [user] = await db
      .insert(usersTable)
      .values({
        firstname,
        lastname,
        email,
        password: hashedPassword,
      })
      .returning({ id: usersTable.id });

    return { status: `success`, message: ` sign up successful` };
  } catch (err) {
    throw err;
  }
};

const authenticateUser = async function (plainPassword, hashedPassword) {
  return await comparePasswords(plainPassword, hashedPassword);
};

const getUserByEmail = async function (email) {
  try {
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    return existingUser;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createUser,
  getUserByEmail,
  authenticateUser,
};
