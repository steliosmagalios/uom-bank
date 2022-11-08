import { PrismaClient } from "@prisma/client";
import express from "express";

// Import routes
import userRoutes from "./routes/user-routes";

// Export the client to use in the app
export const prisma = new PrismaClient();

// Setup the server
const app = express();
app.use(express.json());

// utility endpoint, creates a new account with 0 balance
app.post("/create", async (req, res) => {
  const acc = await prisma.user.create({ data: { account: { create: { balance: 0 } } } });

  res.status(200).json(acc);
});

// User routes
app.use("/user/", userRoutes);

// Start server
app.listen(4000, () => console.log("listening on port 4000"));
