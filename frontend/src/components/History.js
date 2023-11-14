import React, { useState } from "react";
import LateralBar from "../utils/LateralBar";

import "../styles/history.scss";
import HistoryData from "../utils/HistoryData";
import IncomeModal from "../utils/IncomeModal";
import ExpenseModal from "../utils/ExpenseModal";

export default function History() {
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
			<div className="history">
				<div className="grid">
					<h2>History</h2>

					<div className="btns">
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
					<HistoryData />
				</div>
			</div>
		</div>
	);
}
