const Expense = require("../models/Expense");

exports.addExpense = async (req, res) => {
	const { title, amount, category, date } = req.body;

	const expense = Expense({
		title,
		amount,
		category,
		date,
	});

	try {
		// validations
		if (!title || !amount || !category) {
			return res.status(400).json({ message: "All fields are required." });
		}

		if (amount <= 0 || !amount === "number") {
			return res
				.status(400)
				.json({ message: "Amount must be a number superior to 0." });
		}

		// finally
		await expense.save();
		res.status(200).json({ message: "Expense added." });
	} catch (error) {
		res.status(500).json({ message: "Server error." });
	}
};

exports.getExpenses = async (req, res) => {
	try {
		const expenses = await expense.find().sort({ createdAt: -1 });
		res.status(200).json(expenses);
	} catch (error) {
		res.status(500).json({ message: "Server error." });
	}
};

exports.deleteExpense = async (req, res) => {
	const { id } = req.params;
	expense
		.findByIdAndDelete(id)
		.then((expense) => {
			res.status(200).json({ message: "Expense deleted." });
		})
		.catch((err) => {
			res.status(500).json({ message: "Server error." });
		});
};
