import { BrowserRouter, Route } from "react-router-dom";
import { Switch } from "react-router-dom/cjs/react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import ErrorPage from "./components/ErrorPage.js";
import AuthContext from "./context/AuthProvider.js";
import { useContext } from "react";
import History from "./components/History.js";

function App() {
	const { auth } = useContext(AuthContext);

	return (
		<div className="App">
			<BrowserRouter>
				<Switch>
					<Route exact path="/">
						{auth ? <Dashboard /> : <Login />}
					</Route>

					<Route path="/register">
						<Register />
					</Route>

					<Route path="/history">
						<History />
					</Route>

					<Route path="*">
						<ErrorPage />
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
