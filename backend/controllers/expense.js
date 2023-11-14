const Expense = require("../models/Expense");

exports.addExpense = async (req, res) => {
	const { title, amount, category, date } = req.body;

	const expense = Expense({
		title,
		amount,
		category,
		date,
		userId: req.user._id,
	});

	if (!req.user) {
		return res.status(401).json({ message: "User not authenticated." });
	}

	try {
		// validations
		if (!title || !amount || !category) {
			return res.status(400).json({ message: "All fields are required." });
		}

		if (amount <= 0 || isNaN(amount)) {
			return res
				.status(400)
				.json({ message: "Amount must be a number superior to 0." });
		}

		if (category === "custom" && !customCategory) {
			return res
				.status(400)
				.json({ message: "Please submit a category or custom category." });
		}

		// finally
		await expense.save();
		res.status(200).json({ message: "Expense added." });
	} catch (error) {
		res.status(500).json({ message: "Server error." });
	}
};

exports.getExpenses = async (req, res) => {
	if (!req.user) {
		return res.status(401).json({ message: "User not authenticated." });
	}

	try {
		const expenses = await Expense.find({ userId: req.user._id }).sort({
			createdAt: -1,
		});
		res.status(200).json(expenses);
	} catch (error) {
		res.status(500).json({ message: "Server error." });
	}
};

exports.deleteExpense = async (req, res) => {
	const { id } = req.params;

	if (!req.user) {
		return res.status(401).json({ message: "User not authenticated." });
	}
	try {
		// Ensure that the user can only delete their own expenses
		const deletedExpense = await Expense.findOneAndDelete({
			_id: id,
			userId: req.user._id,
		});

		if (!deletedExpense) {
			return res.status(404).json({
				message: "Expense not found or you don't have permission to delete it.",
			});
		}

		res.status(200).json({ message: "Expense deleted." });
	} catch (error) {
		res.status(500).json({ message: "Server error." });
	}

	// expense
	// 	.findByIdAndDelete(id)
	// 	.then((expense) => {
	// 		res.status(200).json({ message: "Expense deleted." });
	// 	})
	// 	.catch((err) => {
	// 		res.status(500).json({ message: "Server error." });
	// 	});
};
