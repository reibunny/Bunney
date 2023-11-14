import React, { useState } from "react";
import "../styles/modal.scss";
import { ReactComponent as CrossIcon } from "../assets/croix-petit.svg";

export default function EditModal({ transactionToEdit, onConfirm, onCancel }) {
	const [formData, setFormData] = useState({
		userId: transactionToEdit.userId,
		title: transactionToEdit.title,
		date: transactionToEdit.date,
		amount: transactionToEdit.amount,
		category: transactionToEdit.category,
		customCategory: transactionToEdit?.customCategory,
		description: transactionToEdit.description,
	});

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const day = date.getDate().toString().padStart(2, "0");
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const year = date.getFullYear();

		return `${year}-${month}-${day}`;
	};

	const handleChange = (e) => {
		setFormData((prevData) => ({
			...prevData,
			[e.target.id]: e.target.value,
		}));
		console.log(formData.title);
	};

	const handleConfirm = (e) => {
		e.preventDefault();
		onConfirm(formData);
	};

	return (
		<div className="modal">
			<div className="modal-main">
				<div className="close-icon">
					<CrossIcon onClick={onCancel} />
				</div>
				<div className="column">
					<h2>{transactionToEdit.title}</h2>

					<form onSubmit={handleConfirm}>
						<div className="input">
							<label htmlFor="title">Title</label>
							<input
								type="text"
								id="title"
								onChange={handleChange}
								value={formData.title}
								autoComplete="off"
							/>
						</div>

						<div className="input">
							<label htmlFor="date">Date</label>
							<input
								type="date"
								id="date"
								value={formatDate(formData.date)}
								onChange={handleChange}
								step="1"
							/>
						</div>

						<div className="input">
							<label htmlFor="amount">Amount</label>
							{/* Change currency into settings currency */}
							<input
								type="text"
								required="true"
								id="amount"
								onChange={handleChange}
								value={formData.amount}
								placeholder="In your currency, without spaces"
								autoComplete="off"
							/>
						</div>

						{transactionToEdit.type === "income" && (
							<div className="input">
								<label htmlFor="category">Category</label>
								<select
									id="category"
									onChange={handleChange}
									value={formData.category}>
									<option value="salary" key="0">
										Salary
									</option>
									<option value="refund" key="1">
										Refund
									</option>
									<option value="state" key="2">
										State Aid
									</option>
									<option value="custom" key="3">
										Custom
									</option>
								</select>
							</div>
						)}

						{transactionToEdit.type === "expense" && (
							<div className="input">
								<label htmlFor="category">Category</label>
								<select
									id="category"
									onChange={handleChange}
									value={formData.category}>
									<option value="restaurant" key="0">
										Restaurant
									</option>
									<option value="groceries" key="1">
										Groceries
									</option>
									<option value="vices" key="2">
										Vices
									</option>
									<option value="subscription" key="3">
										Subscription
									</option>
									<option value="bills" key="4">
										Bills
									</option>
									<option value="clothes" key="5">
										Clothes
									</option>
									<option value="misc" key="6">
										Misc
									</option>
									<option value="custom" key="7">
										Custom
									</option>
								</select>
							</div>
						)}

						{formData.category === "custom" && (
							<div className="input">
								<label htmlFor="customCategory">Custom category</label>
								<input
									type="text"
									required="true"
									id="customCategory"
									onChange={handleChange}
									value={formData.customCategory}
									placeholder="My Business"
									autoComplete="off"
								/>
							</div>
						)}

						{transactionToEdit.type === "expense" && (
							<div className="input">
								<label htmlFor="budget">Budget</label>
								<input type="text" id="budget" value={formData?.budget} />
							</div>
						)}

						<div className="input">
							<label htmlFor="description">Description</label>
							<input
								type="textarea"
								id="description"
								onChange={handleChange}
								value={formData.description}
								maxLength={50}
								autoComplete="off"
							/>
						</div>

						<button>Edit {transactionToEdit.title}</button>
					</form>
				</div>
			</div>
		</div>
	);
}
