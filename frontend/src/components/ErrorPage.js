import React from "react";
import { useHistory } from "react-router-dom";

function ErrorPage() {
	const history = useHistory();

	const navigateToHome = () => {
		history.push("/");
	};

	return (
		<div id="error-page">
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>No Match</i>
			</p>
			<button onClick={navigateToHome}>Go Back to Home</button>
		</div>
	);
}

export default ErrorPage;
