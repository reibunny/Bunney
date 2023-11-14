const Income = require("../models/Income");

exports.addIncome = async (req, res) => {
	const { title, amount, category, customCategory, date } = req.body;

	if (!req.user) {
		return res.status(401).json({ message: "User not authenticated." });
	}

	const income = Income({
		title,
		amount,
		category,
		customCategory,
		date,
		userId: req.user._id,
	});

	try {
		// validations
		if (!title || !amount || (!category && !customCategory)) {
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
		await income.save();
		res.status(200).json({ message: "Income added." });
	} catch (error) {
		res.status(500).json({ message: "Server error." });
	}
};

exports.getIncomes = async (req, res) => {
	if (!req.user) {
		return res.status(401).json({ message: "User not authenticated." });
	}

	try {
		const incomes = await Income.find({ userId: req.user._id }).sort({
			createdAt: -1,
		});

		await res.status(200).json(incomes);
	} catch (error) {
		res.status(500).json({ message: "Server error." });
	}
};

exports.deleteIncome = async (req, res) => {
	const { id } = req.params;

	if (!req.user) {
		return res.status(401).json({ message: "User not authenticated." });
	}

	try {
		// Ensure that the user can only delete their own incomes
		const deletedIncome = await Income.findOneAndDelete({
			_id: id,
			userId: req.user._id,
		});

		if (!deletedIncome) {
			return res.status(404).json({
				message: "Income not found or you don't have permission to delete it.",
			});
		}

		res.status(200).json({ message: "Income deleted." });
	} catch (error) {
		res.status(500).json({ message: "Server error." });
	}
};

exports.patchIncome = async (req, res) => {
	const { id } = req.params;

	if (!req.user) {
		return res.status(401).json({ message: "User not authenticated." });
	}

	try {
		// Ensure that the user can only delete their own incomes
		const editedIncome = await Income.findOneAndUpdate(
			{
				_id: id,
				userId: req.user._id,
			},
			{
				$set: {
					title: req.body?.title,
					amount: req.body?.amount,
					date: req.body?.date,
					category: req.body?.category,
					customCategory: req.body?.customCategory,
					description: req.body?.description,
				},
			},

			{ new: true }
		);

		if (!editedIncome) {
			return res.status(404).json({
				message: "Income not found or you don't have permission to edit it.",
			});
		}

		res.status(200).json({ message: "Income edited." });
	} catch (error) {
		res.status(500).json({ message: "Server error." });
	}
};
