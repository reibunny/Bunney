import React, { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import LateralBar from "../utils/LateralBar";

import "../styles/dashboard.scss";

export default function Dashboard() {
	const { auth, setAuth } = useContext(AuthContext);

	return (
		<div className="wrap">
			<LateralBar />
			<div className="dashboard">
				<div className="grid">
					<h1>Dashboard</h1>
				</div>
			</div>
		</div>
	);
}
