import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
const client = new PrismaClient();

app.get("/", async (req, res) => {
  res.status(200).json(await client.example.findMany());
});

app.listen(4000, () => console.log("listening on port 4000"));
