import "./Navbar.css";
import { Link } from "react-router-dom";
import { AppContext } from "../methods/AppContext";
import { useContext } from "react";

export const Navbar = () => {
	// Source routing logic from context to render navbar based on current page
	const { setCurrPage, currPage, setPostTopic } = useContext(AppContext);

	return (
		<div className="navbar">
			<Link
				to="/"
				onClick={() => setCurrPage("home")}
				className={currPage == "home" ? "active" : "inactive"}>
				Home
			</Link>

			<Link
				to="/sports"
				onClick={() => {
					setCurrPage("sports");
					setPostTopic("Sports");
				}}
				className={currPage == "sports" ? "active" : "inactive"}>
				Sports
			</Link>

			<Link
				to="/food"
				onClick={() => {
					setCurrPage("food");
					setPostTopic("Food");
				}}
				className={currPage == "food" ? "active" : "inactive"}>
				Food
			</Link>

			<Link
				to="/nature"
				onClick={() => {
					setCurrPage("nature");
					setPostTopic("Nature");
				}}
				className={currPage == "nature" ? "active" : "inactive"}>
				Nature
			</Link>
		</div>
	);
};
