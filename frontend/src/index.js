import "./styles/index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { AuthProvider } from "./context/AuthProvider.js";
import { UserProvider } from "./context/UserProvider.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<AuthProvider>
			<UserProvider>
				<App />
			</UserProvider>
		</AuthProvider>
	</React.StrictMode>
);
