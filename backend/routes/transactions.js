const {
	addExpense,
	getExpenses,
	deleteExpense,
	patchExpense,
} = require("../controllers/expense");

const {
	addIncome,
	getIncomes,
	deleteIncome,
	patchIncome,
} = require("../controllers/income");

const { authenticateToken } = require("../controllers/login");

const router = require("express").Router();

router.post("/add-income", authenticateToken, addIncome);
router.get("/get-incomes", authenticateToken, getIncomes);
router.delete("/del-income/:id", authenticateToken, deleteIncome);
router.put("/edit-income/:id", authenticateToken, patchIncome);

router.post("/add-expense", authenticateToken, addExpense);
router.get("/get-expenses", authenticateToken, getExpenses);
router.delete("/del-expense/:id", authenticateToken, deleteExpense);
router.put("/edit-expense/:id", authenticateToken, patchExpense);

module.exports = router;
