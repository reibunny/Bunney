const { addUser, logUser, authenticateToken } = require("../controllers/login");

const authRouter = require("express").Router();

authRouter.post("/users", addUser);
authRouter.post("/users/login", logUser);

module.exports = authRouter;
