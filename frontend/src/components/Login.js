import React from "react";
import AuthContext from "../context/AuthProvider";
import UserContext from "../context/UserProvider";
import Axios from "axios";

import "../styles/login.scss";

import { useRef, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

export default function Login() {
	const URI = "http://localhost:8000/api";

	const { setAuth } = useContext(AuthContext);
	const { setUser } = useContext(UserContext);

	const userRef = useRef();
	const errRef = useRef();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		userRef.current.focus();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await Axios.post(`${URI}/users/login`, {
				username,
				password,
			});

			// Assuming your server returns an accessToken in the response
			const { accessToken } = response.data;
			const { user } = response.data;

			// Store the accessToken in your context or wherever you manage authentication
			setAuth(accessToken);
			setUser(user);
			console.log(user);
			setSuccess(true);
		} catch (error) {
			// Handle login failure, show error message, etc.
			setErrorMsg(`${error.response.data}`);
		}
	};

	return (
		<div className="login">
			<section>
				<h1>Sign In</h1>
				<p
					ref={errRef}
					className={errorMsg ? "errormsg" : "offscreen"}
					aria-live="assertive">
					{errorMsg}
				</p>
				<form onSubmit={handleSubmit}>
					<label htmlFor="username">Username</label>
					<input
						type="text"
						id="username"
						ref={userRef}
						autoComplete="off"
						required
						onChange={(e) => {
							setUsername(e.target.value);
						}}
						value={username}
					/>

					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						required
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						value={password}
					/>

					<div className="btn">
						<button>Log In</button>
					</div>
				</form>
				<p className="notregistered">
					Not registered ? <br />
					<Link to="/register">Sign Up</Link>
				</p>
			</section>
		</div>
	);
}
