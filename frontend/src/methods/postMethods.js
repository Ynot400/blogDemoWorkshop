import axios from "axios";

// Handler for getting posts from a specific topic
const getPosts = async (props) => {
	const topic = props.topic;
	console.log(topic);
	const url = props.url + "blogs-topic/";
	const setFn = props.setFn;
	const body = {
		topic: topic
	};
	const response = await axios.get(url, body);
	setFn((prev) => ({ ...prev, [topic]: response.data }));
	console.log(response.data);
	return response.data;
};

const postPost = async (props) => {
	const url = props.url + "create-blog/";
	const title = props.title;
	const topic = props.topic;
	const content = props.body;
	const user = props.username;
	const body = {
		title: title,
		topic: topic,
		content: content,
		user: user
	};
	const response = await axios.post(url, body);
	return response.data;
};
export { getPosts, postPost };
