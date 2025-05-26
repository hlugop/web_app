const fs = require('fs').promises;
const path = require('path');

const dbPath = path.join(__dirname, '../db.json');

async function readDB() {
  try {
    const data = await fs.readFile(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // If the file doesn't exist, return an empty database structure
      return { leads: [], citas: [] };
    }
    console.error('Error reading database file:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

async function writeDB(data) {
  try {
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing to database file:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

function generateNewId(items) {
  if (!items || items.length === 0) {
    return 1;
  }
  const maxId = items.reduce((max, item) => (item.id > max ? item.id : max), 0);
  return maxId + 1;
}

module.exports = {
  readDB,
  writeDB,
  generateNewId,
};
