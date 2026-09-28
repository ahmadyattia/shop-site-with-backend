import express from "express";
import { Response } from "express";
import verifyToken, {
  AuthenticatedRequest,
} from "../../middleware/verifyToken.js";
import pool from "../../lib/db.js";

const router = express.Router();

router.delete(
  "/",
  verifyToken,
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
      return res
        .status(500)
        .json({ success: false, error: "Couldn't authenticate the user." });
    }

    const client = await pool.connect();

    try {
      await client.query(
        `
            DELETE FROM users
            WHERE id = $1
            `,
        [userId],
      );

      res
        .status(200)
        .json({
          success: true,
          message: "Successfully deleted the user's account.",
        });
    } catch (error) {
      console.error("Error deleting the user's account:", error);

      res
        .status(500)
        .json({ success: false, error: "Couldn't delete the user's account." });
    } finally {
      client.release();
    }
  },
);

export default router;
