import dotenv from "dotenv";

dotenv.config();

function getEnvVariable(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const ENV_VARS={
    PORT:process.env.PORT||5000,
    SCRAPING_DOG_API_KEY:getEnvVariable("SCRAPING_DOG_API_KEY"),
}