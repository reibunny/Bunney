import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthProvider";

import "../styles/historyData.scss";

import { ReactComponent as EditIcon } from "../assets/edit.svg";
import { ReactComponent as DeleteIcon } from "../assets/delete.svg";
import ConfirmModal from "./ConfirmDeleteModal";
import EditModal from "./EditModal";

export default function HistoryData() {
	const URI = "http://localhost:8000/api";
	const [data, setData] = useState([]);
	const { auth } = useContext(AuthContext);
	const [loading, setLoading] = useState(true);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [transactionToDelete, setTransactionToDelete] = useState(null);
	const [showEditModal, setShowEditModal] = useState(false);
	const [transactionToEdit, setTransactionToEdit] = useState(null);

	const formatTimestamp = (timestamp) => {
		const date = new Date(timestamp);
		const day = date.getDate().toString().padStart(2, "0");
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
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
				(a, b) => new Date(b.date) - new Date(a.date)
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
		}, 1500);

		return () => {
			clearInterval(updateInterval);
		};
	}, [auth]);

	const handleEdit = (info) => {
		setTransactionToEdit(info);
		setShowEditModal(true);
	};

	const editTransaction = async (editedData) => {
		if (transactionToEdit) {
			const { _id, type } = transactionToEdit;

			try {
				if (type === "income") {
					await axios.put(`${URI}/edit-income/${_id}`, editedData, {
						headers: {
							"Content-Type": "application/json",
							"x-auth-token": auth,
						},
					});
				} else {
					await axios.put(`${URI}/edit-expense/${_id}`, editedData, {
						headers: {
							"Content-Type": "application/json",
							"x-auth-token": auth,
						},
					});
				}

				// Refresh data after deleting
				fetchData();

				// Close the delete confirmation modal
				setShowEditModal(false);
			} catch (error) {
				console.log("Error: ", error.message);
			}
		}
	};

	const cancelEditTransaction = () => {
		setShowEditModal(false);
		setTransactionToEdit(null);
	};

	const handleDelete = (info) => {
		setTransactionToDelete(info);
		setShowDeleteModal(true);
	};

	const deleteTransaction = async () => {
		if (transactionToDelete) {
			const { _id, type } = transactionToDelete;

			try {
				if (type === "income") {
					await axios.delete(`${URI}/del-income/${_id}`, {
						headers: {
							"Content-Type": "application/json",
							"x-auth-token": auth,
						},
					});
				} else {
					await axios.delete(`${URI}/del-expense/${_id}`, {
						headers: {
							"Content-Type": "application/json",
							"x-auth-token": auth,
						},
					});
				}

				// Refresh data after deleting
				fetchData();
			} catch (error) {
				console.log("Error: ", error.message);
			} finally {
				// Close the delete confirmation modal
				setShowDeleteModal(false);
				setTransactionToDelete(null);
			}
		}
	};

	const cancelDeleteTransaction = () => {
		setShowDeleteModal(false);
		setTransactionToDelete(null);
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
										<td>{formatTimestamp(info.date)}</td>
										<td>{info.category}</td>
										<td>{info?.budget || "None"}</td>
										<td>
											<EditIcon
												className="edit-icon"
												onClick={() => {
													handleEdit(info);
												}}
											/>
											<DeleteIcon
												className="delete-icon"
												onClick={() => handleDelete(info)}
												id={info._id}
											/>
										</td>
									</tr>
								))}
							</tbody>

							{showEditModal && (
								<EditModal
									transactionToEdit={transactionToEdit}
									onConfirm={editTransaction}
									onCancel={cancelEditTransaction}
								/>
							)}

							{showDeleteModal && (
								<ConfirmModal
									message="Are you sure you want to delete this transaction?"
									transactionToDelete={transactionToDelete}
									onConfirm={deleteTransaction}
									onCancel={cancelDeleteTransaction}
								/>
							)}
						</table>
					) : (
						<p>No data available</p>
					)}
				</>
			)}
		</div>
	);
}
