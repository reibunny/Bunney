import React, { useContext, useEffect, useState } from "react";
import "../styles/modal.scss";
import axios from "axios";

import { ReactComponent as CrossIcon } from "../assets/croix-petit.svg";
import UserContext from "../context/UserProvider";
import AuthContext from "../context/AuthProvider";

export default function IncomeModal({ isVisible, toggleModal }) {
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

	const currentDate = new Date();
	const currentMonth = currentDate.getMonth();

	const formatDate = (date) => {
		const day = date.getDate().toString().padStart(2, "0");
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const year = date.getFullYear();

		return `${year}-${month}-${day}`;
	};

	const [customValue, setCustomValue] = useState("");
	const [selectedOption, setSelectedOption] = useState("salary");
	const [selectedDate, setSelectedDate] = useState(currentDate);

	const handleDateChange = (e) => {
		const newDate = new Date(e.target.value);
		setSelectedDate(newDate);
		console.log(e.target.value);
		setFormData((prevData) => ({
			...prevData,
			date: newDate,
		}));
	};

	const [formData, setFormData] = useState({
		userId: user._id,
		title: "",
		date: selectedDate,
		amount: "",
		category: "salary",
		customCategory: "",
		description: "",
	});

	// useEffect(() => {
	// 	setFormData((prevData) => ({
	// 		...prevData,
	// 		category: selectedOption,
	// 	}));
	// }, [selectedOption]);

	const handleSelect = (e) => {
		const newCategory = e.target.value;
		setSelectedOption(newCategory);
		setFormData((prevData) => ({
			...prevData,
			category: newCategory,
		}));
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
			const response = await axios.post(
				`${URI}/add-income`,
				{
					title: formData.title,
					date: formData.date,
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
					<h2>Income Form</h2>
					<div className="input">
						<label htmlFor="title">
							Title
							<span>*</span>
						</label>
						<input
							type="text"
							required="true"
							id="title"
							onChange={handleInputChange}
							value={formData.title}
							placeholder={`${months[currentMonth]} Salary`}
							autoComplete="off"
						/>
					</div>

					<div className="input">
						<label htmlFor="dateInput">Date</label>
						<input
							type="date"
							id="dateInput"
							value={formatDate(selectedDate)}
							onChange={handleDateChange}
							step="1"
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
							defaultValue="salary">
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
								placeholder="My Business"
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
						Add Income
					</button>
				</form>

				<div className="close-icon">
					<CrossIcon onClick={toggleModal} />
				</div>
			</section>
		</div>
	);
}
