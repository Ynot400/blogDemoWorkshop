import axios from "axios";

// Handler for getting posts from a specific topic
const getPosts = async (props) => {
	const topic = props.topic;
	const url = props.url + "get-topic/";
	const setFn = props.setFn;
	const params = {
		topic: topic,
	};
	const response = await axios.get(url, { params });
	setFn((prev) => ({ ...prev, [topic]: response.data }));
	return response.data;
};

const postPost = async (props) => {
	const url = props.url + "create-blog/";
	const title = props.title;
	const topic = props.topic;
	const body = props.body;
	const user = props.username;
	const params = {
		title: title,
		topic: topic,
		content: body,
		user: user,
	};
	const response = await axios.post(url, params);
	return response.data;
};
export { getPosts, postPost };
