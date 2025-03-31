const PORT=process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/MERN';

export {MONGODB_URI,PORT};

export const TOKEN_SECRET='some secret key';