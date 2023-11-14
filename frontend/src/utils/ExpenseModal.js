import React, { useContext, useEffect, useState } from "react";
import { ReactComponent as CrossIcon } from "../assets/croix-petit.svg";
import UserContext from "../context/UserProvider";
import AuthContext from "../context/AuthProvider";

import "../styles/modal.scss";
import axios from "axios";

export default function ExpenseModal({ isVisible, toggleModal }) {
	const URI = "http://localhost:8000/api";
	const modalClassName = isVisible ? "modal display" : "modal offscreen";

	const { user } = useContext(UserContext);
	const { auth } = useContext(AuthContext);

	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const now = Date.now();
	const currentDate = new Date(now);
	const currentMonth = currentDate.getMonth();

	const [customValue, setCustomValue] = useState("");
	const [selectedOption, setSelectedOption] = useState("salary");

	const [formData, setFormData] = useState({
		userId: user._id,
		title: "",
		amount: "",
		category: "salary",
		customCategory: "",
		description: "",
	});

	useEffect(() => {
		setFormData((prevData) => ({
			...prevData,
			category: selectedOption,
		}));
	}, [selectedOption]);

	const handleSelect = (e) => {
		setSelectedOption(e.target.value);
	};

	useEffect(() => {
		setFormData((prevData) => ({
			...prevData,
			customCategory: customValue,
		}));
	}, [customValue]);

	const handleCustom = (e) => {
		setCustomValue(e.target.value);
	};

	const handleInputChange = (e) => {
		const { id, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[id]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			console.log(formData);
			console.log(typeof formData.date);
			const response = await axios.post(
				`${URI}/add-expense`,
				{
					title: formData.title,
					amount: formData.amount,
					category: formData.category,
					customCategory: formData?.customCategory,
					description: formData?.description,
				},

				{
					headers: {
						"Content-Type": "application/json",
						"x-auth-token": auth,
					},
				}
			);

			if (response.status === 200) {
				toggleModal();

				// Reset Form
				setFormData({
					userId: user._id,
					title: `${months[currentMonth]} Salary`,
					amount: "",
					category: "salary",
					customCategory: "",
					description: "",
				});
			} else {
				console.error("Error:", response.status);
			}
		} catch (error) {
			console.error("Error:", error.message);
		}
	};

	return (
		<div className={`modal ${modalClassName}`}>
			<section className="modal-main">
				<form>
					<h2>Expense Form</h2>
					<div className="input">
						<label htmlFor="title">
							Title<span>*</span>
						</label>
						<input
							type="text"
							required="true"
							id="title"
							onChange={handleInputChange}
							value={formData.title}
							placeholder={`${months[currentMonth]} Expenses`}
							autoComplete="off"
						/>
					</div>

					<div className="input">
						<label htmlFor="amount">
							Amount<span>*</span>
						</label>
						{/* Change currency into settings currency */}
						<input
							type="text"
							required="true"
							id="amount"
							onChange={handleInputChange}
							value={formData.amount}
							placeholder="In your currency, without spaces"
							autoComplete="off"
						/>
					</div>

					<div className="input">
						<label htmlFor="category">
							Category<span>*</span>
						</label>
						<select
							id="category"
							onChange={handleSelect}
							value={selectedOption}
							defaultValue="food">
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

					{selectedOption === "custom" && (
						<div className="input">
							<label htmlFor="customCategory">
								Custom category<span>*</span>
							</label>
							<input
								type="text"
								required="true"
								id="customCategory"
								onChange={handleCustom}
								value={formData.customCategory}
								// Add an eventual placeholder for custom expenses
								placeholder=""
								autoComplete="off"
							/>
						</div>
					)}

					<div className="input">
						<label htmlFor="description">Description</label>
						<input
							type="textarea"
							required="false"
							id="description"
							onChange={handleInputChange}
							value={formData.description}
							maxLength={50}
							autoComplete="off"
						/>
					</div>

					<button type="submit" onClick={handleSubmit}>
						Add Expense
					</button>
				</form>

				<div className="close-icon">
					<CrossIcon onClick={toggleModal} />
				</div>
			</section>
		</div>
	);
}
