import { Request, Router } from "express";
import { z } from "zod";
import userController from "../controllers/user-controller";
import withSchema from "../middleware/with-schema";

// zod object used from validation
const userReqSchema = z.object({
  amount: z.number().int().min(0),
});

// Let Typescript know the type of the body object
interface UserReqBody extends Request {
  body: z.infer<typeof userReqSchema>;
}

/**
 * Parses the user's id that is provided
 * @param idStr The id as provided from the request object
 * @returns The id parsed as an integer
 * @throws Will throw an error if the id provided is not an integer
 */
function parseUserId(idStr: string): number {
  try {
    return parseInt(idStr);
  } catch (err) {
    throw new Error("ID needs to be an integer");
  }
}

const router = Router();

// GET <user_id>/account
// Returns the user's balance
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

// GET <user_id>/account/withdraw
// Makes a withdrawal from the user's account
router.patch(
  "/:user_id/account/withdraw",
  withSchema(userReqSchema),
  async (req: UserReqBody, res) => {
    const uId = parseUserId(req.params.user_id);

    try {
      // Call the controller
      const balance = await userController.withdraw(uId, req.body.amount);

      // Return the new balance
      res.status(404).json({ balance });
    } catch (err: any) {
      // If an error occurs, return the relevant message to the user
      res.status(404).json({ error: err.message });
    }
  }
);

// GET <user_id>/account/deposit
// Makes a deposit to the user's account
router.patch(
  "/:user_id/account/deposit",
  withSchema(userReqSchema),
  async (req: UserReqBody, res) => {
    const uId = parseUserId(req.params.user_id);

    try {
      // Call the controller
      const balance = await userController.deposit(uId, req.body.amount);

      // Return the new balance
      res.status(404).json({ balance });
    } catch (err: any) {
      // If an error occurs, return the relevant message to the user
      res.status(404).json({ error: err.message });
    }
  }
);

export default router;
