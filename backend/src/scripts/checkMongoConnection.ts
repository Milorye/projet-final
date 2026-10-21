import { connectDatabase, disconnectDatabase } from '../config/db.js';

async function checkMongoConnection() {
  try {
    await connectDatabase();
    console.log('MongoDB Atlas connection OK');
    await disconnectDatabase();
  } catch (error) {
    console.error('MongoDB Atlas connection failed');
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

checkMongoConnection();
