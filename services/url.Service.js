const { eq, and } = require("drizzle-orm");
const db = require("../db/index");
const { urlsTable, usersTable } = require("../models");


const generateShortUrl = async function (shortCode, targetURL, userId) {
  try {
    const existingShortUrl = await db
      .select({
        id: urlsTable.id,
      })
      .from(urlsTable)
      .where(eq(urlsTable.shortCode, shortCode));

    if (existingShortUrl.length > 0) {
      return 0;
    }

    const [url] = await db
      .insert(urlsTable)
      .values({
        shortCode,
        targetURL,
        userId,
      })
      .returning({
        shortCode: urlsTable.shortCode,
      });
    return url.shortCode;
  } catch (err) {
    // console.log(err)
    throw err;
  }
};

const getUrlByCode = async function (urlCode) {
  try {
    const urlResponse = await db
      .select()
      .from(urlsTable)
      .where(eq(urlsTable.shortCode, urlCode));
    return urlResponse;
  } catch (err) {
    throw err;
  };
}

const getAllUrlsByUserId = async function (userId) {
  try {
    const urls = await db
      .select({
        shortCode: urlsTable.shortCode,
        targetURL: urlsTable.targetURL,
      })
      .from(urlsTable)
      .where(eq(urlsTable.userId, userId));
    return urls; 
  }
  catch (err) {
    throw err;
  }
}

const deleteUrlById = async function (urlId, userId) {
  try {
    const deleteResponse = await db
      .delete(urlsTable)
      .where(and(eq(urlsTable.id, urlId), eq(urlsTable.userId, userId)))
      .returning({ id: urlsTable.id });

    return deleteResponse;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  generateShortUrl,
  getUrlByCode,
  getAllUrlsByUserId,
  deleteUrlById
};