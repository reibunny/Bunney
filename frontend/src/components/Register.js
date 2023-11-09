import React from "react";
import Axios from "axios";

import "../styles/login.scss";

import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Register() {
	const URI = "http://localhost:8000/api";

	const history = useHistory();

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
			const response = await Axios.post(`${URI}/users`, {
				username,
				password,
			});
			console.log(response);
			// Then, redirect to login page.
			history.push("/");
			setSuccess(true);
		} catch (error) {}
	};

	const handlePassword = (e) => {
		if (e.target.value === password || e.target.value === "") {
			setErrorMsg("");
		} else {
			setErrorMsg("Passwords do not match.");
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

					<label htmlFor="passwordAgain">Re-enter password</label>
					<input
						type="password"
						id="passwordAgain"
						required
						onChange={handlePassword}
					/>

					<div className="btn">
						<button>Register</button>
					</div>
				</form>
				<p className="notregistered">
					Already have an account ? <br />
					<Link to="/">Sign In</Link>
				</p>
			</section>
		</div>
	);
}
