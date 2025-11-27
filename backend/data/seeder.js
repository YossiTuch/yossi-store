import dotenv from "dotenv";
import connectDB from "../config/db.js";
import { initialize } from "./init.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();
    await initialize();
    console.log("✅ Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

if (process.argv[2] === "--import") {
  seedDatabase();
}

export { seedDatabase };
