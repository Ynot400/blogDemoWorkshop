import "./App.css";
import { useState } from "react";
import { AppContext } from "./methods/AppContext";
import { Navbar } from "./Navbar/Navbar";
import { useQuery, useMutation } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ForumPage } from "./ForumPage/ForumPage";
import { Home } from "./Home/Home";
import { Login } from "./Login/LogIn";

function App() {
	// Define queries and mutations
	const url = "localhost:8000/api/";

	// Create state to store user data
	const [loggedIn, setLoggedIn] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	// Create State to store current page
	const [currPage, setCurrPage] = useState("home");

	return (
		// Use App Context to pass state to child components
		// Use Router, Routes, and Route to establish routing logic within the app
		<AppContext.Provider
			value={{
				loggedIn,
				setLoggedIn,
				username,
				setUsername,
				password,
				setPassword,
				currPage,
				setCurrPage,
			}}>
			<Router>
				<div className="App">
					{loggedIn ? (
						<>
							<Navbar />
							<Routes>
								<Route path="/" element={<Home />} />
								<Route
									path="/sports"
									element={<ForumPage title="Sports" />}
								/>
								<Route
									path="/food"
									element={<ForumPage title="Food" />}
								/>
								<Route
									path="/nature"
									element={<ForumPage title="Nature" />}
								/>
							</Routes>
						</>
					) : (
						<Login />
					)}
				</div>
			</Router>
		</AppContext.Provider>
	);
}

export default App;
