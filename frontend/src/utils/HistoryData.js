import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthProvider";
import IncomeModal from "./IncomeModal";
import ExpenseModal from "./ExpenseModal";

import "../styles/historyData.scss";

import { ReactComponent as EditIcon } from "../assets/edit.svg";
import { ReactComponent as DeleteIcon } from "../assets/delete.svg";

export default function HistoryData() {
	const URI = "http://localhost:8000/api";
	const [data, setData] = useState([]);
	const { auth } = useContext(AuthContext);
	const [loading, setLoading] = useState(true);

	const formatTimestamp = (timestamp) => {
		const date = new Date(timestamp);
		const day = date.getDate().toString().padStart(2, "0");
		const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
		const year = date.getFullYear();
		const hours = date.getHours().toString().padStart(2, "0");
		const minutes = date.getMinutes().toString().padStart(2, "0");

		return `${day}/${month}/${year} at ${hours}:${minutes}`;
	};

	const fetchData = async () => {
		try {
			const response = await axios.get(`${URI}/get-transactions`, {
				headers: {
					"Content-Type": "application/json",
					"x-auth-token": auth,
				},
			});
			const result = response.data;
			const sortedData = result.sort(
				(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
			);
			setData(sortedData);
			setLoading(false);
		} catch (error) {
			console.log("Error fetching data:", error.message);
		}
	};

	useEffect(() => {
		const updateInterval = setInterval(() => {
			fetchData();
		}, 1000);

		return () => {
			clearInterval(updateInterval);
		};
	}, [auth]);

	const editTransaction = (e) => {
		e.preventDefault();
		return;
	};

	const deleteTransaction = (_id, type) => {
		if (type === "income") {
			try {
				axios.delete(`${URI}/del-income/${_id}`, {
					headers: {
						"Content-Type": "application/json",
						"x-auth-token": auth,
					},
				});
			} catch (error) {
				console.log("Error: ", error.message);
			}
		} else {
			try {
				axios.delete(`${URI}/del-expense/${_id}`, {
					headers: {
						"Content-Type": "application/json",
						"x-auth-token": auth,
					},
				});
			} catch (error) {
				console.log("Error: ", error.message);
			}
		}

		return;
	};

	return (
		<div className="history-data">
			{loading ? (
				<p>Loading...</p>
			) : (
				<>
					{Array.isArray(data) && data.length > 0 ? (
						<table>
							<thead>
								<tr>
									<th>Title</th>
									<th>Date</th>
									<th>Category</th>
									<th>Budget</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{data.map((info) => (
									<tr key={info._id}>
										<td
											className={info.type === "income" ? "income" : "expense"}>
											{info.title}
										</td>
										<td>{formatTimestamp(info.createdAt)}</td>
										<td>{info.category}</td>
										<td>{info?.budget || "None"}</td>
										<td>
											<EditIcon
												className="edit-icon"
												onClick={() => {
													editTransaction(info._id, info.type);
												}}
											/>
											<DeleteIcon
												className="delete-icon"
												onClick={() => {
													deleteTransaction(info._id, info.type);
												}}
												id={info._id}
											/>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<p>No data available</p>
					)}
				</>
			)}
		</div>
	);
}
