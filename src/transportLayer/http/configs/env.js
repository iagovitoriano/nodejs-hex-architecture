import 'dotenv/config';

export default {
  FIREBASE_CONFIG: process.env.FIREBASE || '',
  PORT: process.env.PORT || 3000,
};
