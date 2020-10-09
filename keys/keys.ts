import dotenv from 'dotenv';

dotenv.config();

export const keys = {
  MONGO_KEY: process.env.MONGO_KEY,
  PORT: process.env.PORT,
  MONGO_LOCAL: 'mongodb://127.0.0.1:27017/electrolux',
};
