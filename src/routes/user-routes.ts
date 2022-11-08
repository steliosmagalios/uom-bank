import { Router } from "express";
import { z } from "zod";
import userController from "../controllers/user-controller";
import withSchema from "../middleware/withSchema";

const userReqSchema = z.object({
  amount: z.number().int().min(0),
});

interface UserReqBody extends Express.Request {
  body: z.infer<typeof userReqSchema>;
}

function parseUserId(idStr: string): number {
  try {
    return parseInt(idStr);
  } catch (err) {
    throw new Error("ID needs to be an integer");
  }
}

const router = Router();

router.get("/:user_id/account", async (req, res) => {
  const uId = parseUserId(req.params.user_id);

  try {
    // Call the controller
    const balance = await userController.balance(uId);

    // Return the new balance
    res.status(404).json({ balance });
  } catch (err: any) {
    // If an error occurs, return the relevant message to the user
    res.status(404).json({ error: err.message });
  }
});

router.patch(
  "/:user_id/account/withdraw",
  withSchema(userReqSchema),
  async (req: UserReqBody, res) => {
    res.status(404).json({ message: "Unimplemented" });
  }
);

router.patch(
  "/:user_id/account/deposit",
  withSchema(userReqSchema),
  async (req: UserReqBody, res) => {
    res.status(404).json({ message: "Unimplemented" });
  }
);

export default router;
