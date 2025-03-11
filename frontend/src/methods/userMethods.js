import axios from "axios";

const getUser = async (props) => {
	const { username, password } = props;
	const url = props.url + "checkUser/";
	const setLoggedIn = props.setLoggedIn;
	const setMsg = props.setMsg;
	const body = {
		username: username,
		password: password,
	};
	const response = await axios.get(url, body);

	if ("authenticated" in response.data) {
		setMsg("Incorrect Password");
		return response.data;
	} else {
		setLoggedIn(true);
		return response.data;
	}
};

export { getUser };
