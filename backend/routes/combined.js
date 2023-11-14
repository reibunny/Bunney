const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");
const Income = require("../models/Income");

router.get("/get-transactions", async (req, res) => {
	try {
		const expenses = await Expense.find({ userId: req.user._id }).sort({
			createdAt: -1,
		});
		const incomes = await Income.find({ userId: req.user._id }).sort({
			createdAt: -1,
		});

		// Combine and sort the data
		const transactions = [...expenses, ...incomes].sort(
			(a, b) => new Date(b.date) - new Date(a.date)
		);

		res.status(200).json(transactions);
	} catch (error) {
		res.status(500).json({ message: "Server error." });
	}
});

module.exports = router;
