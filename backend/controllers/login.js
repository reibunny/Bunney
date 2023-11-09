require("dotenv").config();

const User = require("../models/User");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

// POST METHOD (REGISTER)
exports.addUser = async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);

		// Check if the username already exists
		const existingUser = await User.findOne({ username: req.body.username });

		if (existingUser) {
			return res.status(400).json({ message: "Username already taken" });
		}

		// Create a new User with hashed password (secured)
		const newUser = new User({
			username: req.body.username,
			password: hashedPassword,
		});

		// Save into MongoDB collection
		await newUser.save();

		// Finally
		res.status(201).send("User created!");
	} catch (error) {
		res.status(500).send(error.message);
	}
};

// POST METHOD (LOG IN)
exports.logUser = async (req, res) => {
	try {
		const user = await User.findOne({ username: req.body.username });

		if (!user) {
			return res.status(400).send("User doesn't exist.");
		}

		const isPasswordValid = await bcrypt.compare(
			req.body.password,
			user.password
		);

		if (isPasswordValid) {
			// Password is correct so
			// Generate a JWT Token
			const payload = {
				username: user.username,
				_id: user._id,
				// Donner son id à l'utilisateur
				// user._id
				// password: user.password,
			};
			const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
			res.json({ accessToken: accessToken, user: payload });
		} else {
			// Password is incorrect
			res.send("Not Allowed.");
		}
	} catch (error) {
		res.status(500).send(error.message);
	}
};

exports.authenticateToken = (req, res, next) => {
	const authHeader = req.headers["x-auth-token"];
	const token = authHeader; // && authHeader.split(" ")[1];

	// Check if the request is targeting a specific endpoint that should skip token verification
	if (req.path === "/api/users") {
		// If the request is for a non-protected endpoint, skip token verification
		req.user = null; // Or you can choose to skip it in another way
		return next();
	}

	if (token == null) return res.status(401);

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) return res.status(403).send(err.message);
		req.user = user;
		next();
	});
};
