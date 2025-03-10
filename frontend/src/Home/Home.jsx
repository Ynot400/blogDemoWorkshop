import { AppContext } from "../methods/AppContext";
import { useContext } from "react";

export const Home = () => {
	// Source username and recent posts from context
	const { username } = useContext(AppContext);
	return (
		<div>
			<h1>Home - Hi {username}!</h1>
		</div>
	);
};
