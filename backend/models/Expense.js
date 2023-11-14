const mongoose = require("mongoose");

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const now = Date.now();
const currentDate = new Date(now);
const currentMonth = currentDate.getMonth();

const ExpenseSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},

		title: {
			type: String,
			required: true,
			trim: true,
			maxLength: 50,
		},

		amount: {
			type: Number,
			required: true,
			trim: true,
			maxLength: 20,
		},

		type: {
			type: String,
			default: "expense",
		},

		date: {
			type: Date,
			default: currentDate,
			required: true,
		},

		category: {
			type: String,
			required: true,
			trim: true,
		},

		budget: {
			type: String,
			required: false,
			trim: true,
			default: `${months[currentMonth]} expenses`,
		},

		description: {
			type: String,
			required: false,
			maxLength: 20,
			trim: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Expense", ExpenseSchema);
