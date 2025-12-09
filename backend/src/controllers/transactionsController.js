import Transaction from "../models/Transaction.js";
import { buildPipeline } from "../services/transactionsService.js";

export const getTransactions = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const pipeline = buildPipeline(req.query);
    const result = await Transaction.aggregate(pipeline);

    const meta = result[0]?.meta?.[0] || { total: 0 };
    const data = result[0]?.data || [];
    const total = meta.total || 0;

    res.json({
      data,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit || 10)),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
