import React from "react";
import LateralBar from "../utils/LateralBar";

import "../styles/history.scss";

export default function History() {
	return (
		<div className="wrap">
			<LateralBar />
			<div className="history">
				<div className="grid">
					<h1>History</h1>
				</div>
			</div>
		</div>
	);
}
