type production = "production" | "development";

export default {
  PRODUCTION: "development" as production,
  PORT: process.env.PORT || 5001,
  DATABASE_URL: process.env.DB_URL || "mongodb://localhost:27017/crud",
  JWT_SECRET_KEY: process.env.JWT_SECREY_KEY || "crud",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
  JWT_ISSUER: process.env.JWT_ISSUER || "crud",
  BCRYPT_SALT_ROUNDS: Number(process.env.BCRYPT_SALT_ROUNDS) || 10,
};
