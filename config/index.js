const env = process.env.NODE_ENV || "LOCAL";
const LOCAL = {
  db: {
    CONNECTION_STRING: process.env.MONGO_URI,
  },
};

const config = {
  LOCAL,
};

module.exports = config[env];
