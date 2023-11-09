import React, { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import UserContext from "../context/UserProvider";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import "../styles/lateral.scss";

import { ReactComponent as Disconnect } from "../assets/power-off-solid.svg";

export default function LateralBar() {
	const { auth, setAuth } = useContext(AuthContext);
	const { user } = useContext(UserContext);

	return (
		<div className="lateral">
			<div className="tabs">
				<div className="tab">
					<NavLink exact to="/" activeClassName="active">
						Dashboard
					</NavLink>
				</div>
				<div className="tab">
					<NavLink to="/reports" activeClassName="active">
						Reports
					</NavLink>
				</div>
				<div className="tab">
					<NavLink to="/history" activeClassName="active">
						History
					</NavLink>
				</div>
				<div className="tab">
					<NavLink to="/profile" activeClassName="active">
						Profile
					</NavLink>
				</div>
				<div className="tab">
					<NavLink to="/settings" activeClassName="active">
						Settings
					</NavLink>
				</div>
			</div>
			<div className="profile">
				<div className="card">
					<div className="icon"></div>
					<div className="name">{user.username}</div>
				</div>

				<button
					onClick={() => {
						setAuth(null);
					}}>
					<Disconnect />
				</button>
			</div>
		</div>
	);
}
