const bcrypt = require('bcrypt');
const { usersTable } = require('../models');
const { eq, hasOwnEntityKind } = require('drizzle-orm');
const saltRounds = 10;

const hashPassword = async function (plainpassword) {
  try {
    const hashedPassword = await bcrypt.hash(plainpassword, saltRounds);
    return hashedPassword;
  } catch (err) {
    throw new Error(`Password hashing failed ${err}`);
  }
};

const comparePasswords = async function (plainPassword, hashedPassword) {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
  } catch (err) {
    throw new Error(`Password comparison failed ${err}`);
  }
};

module.exports = {
  hashPassword,
  comparePasswords,
};
