import { axios } from "axios";

const getUser = async (props) => {
	const { username, password } = props;
	const url = props.url + "checkUser/";
	const params = {
		username: username,
		password: password,
	};
	const response = await axios.get(url, { params });

	return response.data;
};

export { getUser };
