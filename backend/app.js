const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
const { readdirSync } = require("fs");

require("dotenv").config();

const app = express();

const jwt = require("jsonwebtoken");

const PORT = process.env.SERVER_PORT;

// JWT middleware
app.use((req, res, next) => {
	const token = req.header("x-auth-token");

	// Check if the request is targeting /api/users
	if (req.path === "/api/users" || req.path === "/api/users/login") {
		// If the request is for a non-protected endpoint, skip token verification
		return next();
	}

	if (!token) {
		return res
			.status(401)
			.json({ message: "Access denied. No token provided." });
	}

	try {
		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		req.user = decoded;
		next();
	} catch (error) {
		// Rediriger vers le login.
		res.status(400).json();
	}
});

// middlewares
app.use(express.json());
app.use(cors());

// routes
readdirSync("./routes").map((route) => {
	app.use("/api", require("./routes/" + route));
});

// server
const server = () => {
	db();
	app.listen(PORT, () => {
		console.log("Server listening to port", PORT);
	});
};

server();
