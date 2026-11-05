import { PrismaClient } from "./generated/client";
import path from "path";

const dbPath = path.resolve(__dirname, "../prisma/kost_management.db");

export const db = new PrismaClient({
  datasources: {
    db: {
      url: `file:${dbPath}`
    }
  }
});
