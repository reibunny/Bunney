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

const { authenticateToken } = require("../controllers/login");

const router = require("express").Router();

router.post("/add-income", authenticateToken, addIncome);
router.get("/get-incomes", authenticateToken, getIncomes);
router.delete("/del-income/:id", authenticateToken, deleteIncome);

router.post("/add-expense", authenticateToken, addExpense);
router.get("/get-expenses", authenticateToken, getExpenses);
router.delete("/del-expense/:id", authenticateToken, deleteExpense);

module.exports = router;
