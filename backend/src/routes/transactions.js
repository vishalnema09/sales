import express from "express";
import Transaction from "../models/Transaction.js";
import { getTransactions } from "../controllers/transactionsController.js";

const router = express.Router();

router.get("/", getTransactions);

router.get("/options", async (_req, res) => {
  try {
    const [regions, genders, categories, tags, paymentMethods] = await Promise.all([
      Transaction.distinct("customerRegion").then((values) => values.filter(Boolean).sort()),
      Transaction.distinct("gender").then((values) => values.filter(Boolean).sort()),
      Transaction.distinct("productCategory").then((values) => values.filter(Boolean).sort()),
      Transaction.distinct("tags").then((values) => [...new Set(values)].filter(Boolean).sort()),
      Transaction.distinct("paymentMethod").then((values) => values.filter(Boolean).sort()),
    ]);

    res.json({ regions, genders, categories, tags, paymentMethods });
  } catch (error) {
    console.error("Error fetching filter options:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
