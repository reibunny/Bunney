const {
	addExpense,
	getExpenses,
	deleteExpense,
} = require("../controllers/expense");

const {
	addIncome,
	getIncomes,
	deleteIncome,
} = require("../controllers/income");

const router = require("express").Router();

router.post("/add-income", addIncome);
router.get("/get-incomes", getIncomes);
router.delete("/del-income/:id", deleteIncome);

router.post("/add-expense", addExpense);
router.get("/get-expenses", getExpenses);
router.delete("/del-expense/:id", deleteExpense);

module.exports = router;
