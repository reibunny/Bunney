import React, { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import UserContext from "../context/UserProvider";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import "../styles/lateral.scss";

import { ReactComponent as DisconnectIcon } from "../assets/power-off-solid.svg";
import { ReactComponent as DashboardIcon } from "../assets/couches.svg";
import { ReactComponent as ReportsIcon } from "../assets/graphique-line-up.svg";
import { ReactComponent as HistoryIcon } from "../assets/horloge-cinq.svg";
import { ReactComponent as ProfileIcon } from "../assets/utilisateur.svg";
import { ReactComponent as SettingsIcon } from "../assets/reglages.svg";
import { ReactComponent as InfoIcon } from "../assets/info.svg";

export default function LateralBar() {
	const { setAuth } = useContext(AuthContext);
	const { user } = useContext(UserContext);

	return (
		<div className="lateral">
			<div className="logo">
				<h1>Bunney</h1>
			</div>
			<div className="tabs">
				<ul>
					<li>
						<NavLink exact to="/" className="tab" activeClassName="tab active">
							<DashboardIcon className="icon" />
							Dashboard
						</NavLink>
					</li>
					<li>
						<NavLink
							exact
							to="/reports"
							className="tab"
							activeClassName="tab active">
							<ReportsIcon className="icon" />
							Reports
						</NavLink>
					</li>
					<li>
						<NavLink
							exact
							to="/history"
							className="tab"
							activeClassName="tab active">
							<HistoryIcon className="icon" />
							History
						</NavLink>
					</li>
					<li>
						<NavLink
							exact
							to="/profile"
							className="tab"
							activeClassName="tab active">
							<ProfileIcon className="icon" />
							Profile
						</NavLink>
					</li>
					<li>
						<NavLink
							exact
							to="/info"
							className="tab"
							activeClassName="tab active">
							<InfoIcon className="icon" />
							Info
						</NavLink>
					</li>
					<li>
						<NavLink
							exact
							to="/settings"
							className="tab"
							activeClassName="tab active">
							<SettingsIcon className="icon" />
							Settings
						</NavLink>
					</li>
				</ul>

				{/* <NavLink to="/reports" className="tab" activeClassName="tab active">
					Reports
				</NavLink>

				<NavLink to="/history" className="tab" activeClassName="tab active">
					History
				</NavLink>

				<NavLink to="/profile" className="tab" activeClassName="tab active">
					Profile
				</NavLink>

				<NavLink to="/settings" className="tab" activeClassName="tab active">
					Settings
				</NavLink> */}
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
					<DisconnectIcon />
				</button>
			</div>
		</div>
	);
}
