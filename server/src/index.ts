import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express from "express";

// Import routes
import userRoutes from "./routes/user-routes";

// Export the client to use in the app
export const prisma = new PrismaClient();

// Setup the server
const app = express();
app.use(express.json());
app.use(cors());

// utility endpoint, creates a new account with 0 balance
app.post("/create", async (req, res) => {
  const acc = await prisma.user.create({ data: { account: { create: { balance: 0 } } } });

  res.status(200).json(acc);
});

// utility encpoint to return all user ids. this shouldn't be in the final product
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();

  res.status(200).json(users);
});

// User routes
app.use("/user/", userRoutes);

// Start server
app.listen(4000, () => console.log("listening on port 4000"));
