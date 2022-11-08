import { PrismaClient } from "@prisma/client";
import express from "express";

// Import routes
import userRoutes from "./routes/user-routes";

// Export the client to use in the app
export const prisma = new PrismaClient();

// Setup the server
const app = express();
app.use(express.json());

// User routes
app.use("/", userRoutes);

// Start server
app.listen(4000, () => console.log("listening on port 4000"));
