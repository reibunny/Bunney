import React from "react";
import "../styles/modal.scss";
import { ReactComponent as CrossIcon } from "../assets/croix-petit.svg";

const ConfirmModal = ({
	message,
	transactionToDelete,
	onConfirm,
	onCancel,
}) => {
	return (
		<div className="modal">
			<section className="modal-main">
				<div className="close-icon">
					<CrossIcon onClick={onCancel} />
				</div>
				<div className="column">
					<h2>{message}</h2>
					<p>
						{transactionToDelete.title} {transactionToDelete.type} of{" "}
						{transactionToDelete.amount} €
					</p>
					{/* ^ Change into dynamic currency from settings  */}

					<div className="btns">
						<button onClick={onConfirm}>Confirm</button>
						<button onClick={onCancel}>Cancel</button>
					</div>
				</div>
			</section>
		</div>
	);
};

export default ConfirmModal;
