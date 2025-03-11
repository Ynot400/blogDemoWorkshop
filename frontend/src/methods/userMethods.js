import axios from "axios";

// Works great! needs to create a new user on no username match
const getUser = async (props) => {
	const { username, password } = props;
	const url = props.url + "checkUser/";
	const setLoggedIn = props.setLoggedIn;
	const setMsg = props.setMsg;
	const body = {
		username: username,
		password: password
	};
	const response = await axios.post(url, body);

	console.log(response.data);

	if ("authenticated" in response.data) {
		setMsg("Incorrect Password");
		return response.data;
	} else {
		setLoggedIn(true);
		return response.data.blogs;
	}
};

export { getUser };
