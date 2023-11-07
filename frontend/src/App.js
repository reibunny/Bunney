import { BrowserRouter, Route } from "react-router-dom";
import { Switch } from "react-router-dom/cjs/react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import ErrorPage from "./components/ErrorPage.js";

function App() {
	const logged = false;
	return (
		<div className="App">
			<BrowserRouter>
				<Switch>
					<Route exact path="/">
						{logged ? <Dashboard /> : <Login />}
					</Route>

					<Route path="/register">
						<Register />
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
