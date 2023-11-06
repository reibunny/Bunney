const Income = require("../models/Income");

exports.addIncome = async (req, res) => {
	const { title, amount, category, date } = req.body;

	const income = Income({
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
		await income.save();
		res.status(200).json({ message: "Income added." });
	} catch (error) {
		res.status(500).json({ message: "Server error." });
	}
};

exports.getIncomes = async (req, res) => {
	try {
		const incomes = await Income.find().sort({ createdAt: -1 });
		res.status(200).json(incomes);
	} catch (error) {
		res.status(500).json({ message: "Server error." });
	}
};

exports.deleteIncome = async (req, res) => {
	const { id } = req.params;
	Income.findByIdAndDelete(id)
		.then((income) => {
			res.status(200).json({ message: "Income deleted." });
		})
		.catch((err) => {
			res.status(500).json({ message: "Server error." });
		});
};
