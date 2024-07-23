import dotenv from "dotenv";
import fs from "fs";

// TEMP FOR LOADING ENV FOR Github CI CD
export const loadEnv = () => {
  try {
    if (!fs.existsSync("./.env")) {
      console.log("Creating .env file");
      const src = "../../config.txt";
      const dest = "./.env";
      fs.copyFileSync(src, dest);
    }
    dotenv.config();
  } catch (error) {
    console.log("Error: Loading Env from config.txt", error);
  }
};
