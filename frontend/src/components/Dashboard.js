import "../styles/dashboard.scss";

import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthProvider";
import UserContext from "../context/UserProvider";
import LateralBar from "../utils/LateralBar";
import IncomeModal from "../utils/IncomeModal";
import ExpenseModal from "../utils/ExpenseModal";
import HistoryData from "../utils/HistoryData";

export default function Dashboard() {
	const { auth } = useContext(AuthContext);
	const { user } = useContext(UserContext);

	const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
	const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);

	const toggleIncomeModal = () => {
		setIsIncomeModalVisible(!isIncomeModalVisible);
	};
	const toggleExpenseModal = () => {
		setIsExpenseModalVisible(!isExpenseModalVisible);
	};

	return (
		<div className="wrap">
			<LateralBar />
			<div className="dashboard">
				<div className="title">
					<h2>
						Hello <span>{user.username}</span>,
					</h2>
					<h3>Take a look at your current financial state !</h3>
				</div>
				<div className="budgets"></div>
				<div className="daily"></div>
				<div className="transactions">
					<HistoryData />
				</div>
				<div className="add-new">
					<button onClick={toggleIncomeModal}>New Income</button>
					<IncomeModal
						isVisible={isIncomeModalVisible}
						toggleModal={toggleIncomeModal}
					/>

					<button onClick={toggleExpenseModal}>New Expense</button>
					<ExpenseModal
						isVisible={isExpenseModalVisible}
						toggleModal={toggleExpenseModal}
					/>
				</div>
			</div>
		</div>
	);
}
