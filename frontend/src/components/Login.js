import React from "react";
import "../styles/login.scss";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
	const userRef = useRef();
	const errRef = useRef();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		setErrorMsg("");
	}, [username, password]);

	return (
		<div>
			<section>
				<p
					ref={errRef}
					className={errorMsg ? "errormsg" : "offscreen"}
					aria-live="assertive">
					{errorMsg}
				</p>
				<h1>Sign In</h1>
				<form>
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

					<button>Log In</button>
				</form>
				<p>
					Not registered ? <br />
					<Link to="/register">Sign Up</Link>
				</p>
			</section>
		</div>
	);
}
