import React, { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import UserContext from "../context/UserProvider";
import LateralBar from "../utils/LateralBar";

import "../styles/dashboard.scss";

export default function Dashboard() {
	const { auth } = useContext(AuthContext);
	const { user } = useContext(UserContext);

	const incomeForm = (e) => {
		e.preventDefault();
		return;
	};

	const expenseForm = (e) => {
		e.preventDefault();
		return;
	};

	return (
		<div className="wrap">
			<LateralBar />
			<div className="dashboard">
				<div className="title">
					<h2>Hello {user.username},</h2>
					<h3>Take a look at your current financial state !</h3>
				</div>
				<div className="budgets"></div>
				<div className="daily"></div>
				<div className="transactions"></div>
				<div className="add-new">
					<button onClick={incomeForm}>New Income</button>
					<button onClick={expenseForm}>New Expense</button>
				</div>
			</div>
		</div>
	);
}
