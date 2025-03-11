import "./App.css";
import { useState, useEffect } from "react";
import { AppContext } from "./methods/AppContext";
import { Navbar } from "./Navbar/Navbar";
import { useQuery, useMutation } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ForumPage } from "./ForumPage/ForumPage";
import { Home } from "./Home/Home";
import { Login } from "./Login/LogIn";
import { getUser } from "./methods/userMethods";
import { getPosts, postPost } from "./methods/postMethods";

function App() {
	// Define queries and mutations
	const url = "http://127.0.0.1:8000/api/";

	// Query to get a users posts
	const {
		data: userPosts,
		isLoading: isUserPostLoading,
		refetch: getUserPosts
	} = useQuery({
		queryKey: ["userPosts"],
		queryFn: () => {
			return getUser({
				username: username,
				password: password,
				url: url,
				setLoggedIn: setLoggedIn,
				setMsg: setLogInMsg
			});
		},
		enabled: false
	});

	// Query to get posts from a specific topic
	const { refetch: getTopicPosts } = useQuery({
		queryKey: ["topicPosts"],
		queryFn: (props) => {
			return getPosts({
				topic: props,
				url: url,
				setFn: setTopicPosts
			});
		},
		enabled: false
	});

	// Define a list of topics you want to fetch
	const topics = ["Sports", "Food", "Nature"];

	useEffect(() => {
		// Fetch posts for each topic initially
		topics.forEach((topic) => {
			getTopicPosts({ topic });
		});

		// Set up interval to refetch topic posts every 10 seconds
		const intervalId = setInterval(() => {
			topics.forEach((topic) => {
				getTopicPosts({ topic });
			});
		}, 10000);

		// Cleanup interval on component unmount
		return () => clearInterval(intervalId);
	}, [getTopicPosts]);

	// Mutation to post a new post
	const { mutation: createPost } = useMutation({
		mutationKey: ["postPost"],
		mutationFn: () => {
			return postPost({
				title: newPostTitle,
				topic: newPostTopic,
				body: newPostBody,
				username: username,
				url: url
			});
		}
	});

	// Create state to store user data
	const [loggedIn, setLoggedIn] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [logInMsg, setLogInMsg] = useState("");

	// Create state to manage user post fields
	const [newPostTitle, setPostTitle] = useState("");
	const [newPostBody, setPostBody] = useState("");
	const [newPostTopic, setPostTopic] = useState("");

	// Create State to store current page
	const [currPage, setCurrPage] = useState("home");

	// Create State to store posts by topic

	const [topicPosts, setTopicPosts] = useState({
		sports: [],
		food: [],
		nature: []
	});

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
				userPosts,
				isUserPostLoading,
				getUserPosts,
				logInMsg,
				topicPosts,
				setPostTopic,
				setPostTitle,
				setPostBody,
				createPost
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
									element={
										<ForumPage
											title="Sports"
											posts={topicPosts.sports}
										/>
									}
								/>
								<Route
									path="/food"
									element={
										<ForumPage
											title="Food"
											posts={topicPosts.food}
										/>
									}
								/>
								<Route
									path="/nature"
									element={
										<ForumPage
											title="Nature"
											posts={topicPosts.nature}
										/>
									}
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
