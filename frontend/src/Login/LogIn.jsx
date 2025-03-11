import { AppContext } from "../methods/AppContext";
import { useContext } from "react";
import "./Login.css";
export const Login = () => {
	// Source Username and Password state from Context
	const { setUsername, setPassword, logInMsg, getUserPosts } =
		useContext(AppContext);
	return (
		<div className="Login">
			<h1 className="LoginHeader">Log In / Register</h1>

			<label className="fieldLabel">
				User:
				<input
					type="text"
					name="username"
					className="field"
					onChange={(e) => {
						setUsername(e.target.value);
					}}
				/>
			</label>
			<br />
			<label className="fieldLabel">
				Pass:
				<input
					type="password"
					name="password"
					className="field"
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
			</label>
			<br />
			<p className="logInMsg">{logInMsg}</p>
			<button
				onClick={() => {
					getUserPosts();
				}}>
				Submit
			</button>
		</div>
	);
};
