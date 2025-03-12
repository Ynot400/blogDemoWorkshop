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

	// State to set current topic
	const [qTopic, setQTopic] = useState("");
	// Query to get posts from a specific topic
	const { refetch: getTopicPosts } = useQuery({
		queryKey: ["topicPosts", qTopic],
		queryFn: ({ queryKey }) => {
			return getPosts({
				topic: queryKey[1],
				url: url,
				setFn: setTopicPosts
			});
		},
		enabled: false
	});

	// useEffect(() => {
	// 	// Fetch posts for each topic initially
	// 	setQTopic(() => "Sports");
	// 	setTimeout(() => {}, 1000);
	// 	getTopicPosts();
	// 	setTimeout(() => {}, 1000);
	// 	setQTopic(() => "Food");
	// 	setTimeout(() => {}, 1000);
	// 	getTopicPosts();
	// 	setTimeout(() => {}, 1000);
	// 	setQTopic(() => "Nature");
	// 	setTimeout(() => {}, 1000);
	// 	getTopicPosts();
	// 	setTimeout(() => {}, 1000);

	// 	// Set up interval to refetch topic posts every 10 seconds
	// 	const intervalId = setInterval(() => {
	// 		setQTopic(() => "Sports");
	// 		setTimeout(() => {}, 1000);
	// 		getTopicPosts();
	// 		setTimeout(() => {}, 1000);
	// 		setQTopic(() => "Food");
	// 		setTimeout(() => {}, 1000);
	// 		getTopicPosts();
	// 		setTimeout(() => {}, 1000);
	// 		setQTopic(() => "Nature");
	// 		setTimeout(() => {}, 1000);
	// 		getTopicPosts();
	// 		setTimeout(() => {}, 1000);
	// 	}, 10000);

	// 	// Cleanup interval on component unmount
	// 	return () => clearInterval(intervalId);
	// }, [getTopicPosts]);

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
		sports: [
			{
				title: "DJ Metcalf",
				content:
					"Seahawks Star WR gets traded to the Steelers on a 5 year, $150 Million deal."
			},
			{
				title: "LeBron James",
				content:
					"LeBron James scores 50 points in a thrilling game against the Warriors."
			},
			{
				title: "Olympics 2024",
				content:
					"The 2024 Summer Olympics will be held in Paris, France."
			},
			{
				title: "Tom Brady",
				content:
					"Tom Brady announces his retirement after 22 seasons in the NFL."
			},
			{
				title: "NBA Playoffs",
				content: "The NBA Playoffs are set to begin on April 16th."
			}
		],
		food: [
			{
				title: "Best Pizza Places",
				content: "Check out these top 10 pizza places in New York City."
			},
			{
				title: "Vegan Recipes",
				content:
					"Discover delicious vegan recipes that are easy to make."
			},
			{
				title: "Healthy Eating",
				content:
					"Learn about the benefits of healthy eating and how to get started."
			},
			{
				title: "Food Festivals",
				content: "Find out about upcoming food festivals in your area."
			},
			{
				title: "Cooking Classes",
				content:
					"Sign up for cooking classes to improve your culinary skills."
			}
		],
		nature: [
			{
				title: "National Parks",
				content:
					"Explore the beauty of national parks across the United States."
			},
			{
				title: "Wildlife Conservation",
				content:
					"Learn about efforts to conserve wildlife and protect endangered species."
			},
			{
				title: "Hiking Trails",
				content:
					"Discover the best hiking trails for beginners and experienced hikers."
			},
			{
				title: "Eco-Friendly Living",
				content:
					"Find tips on how to live a more eco-friendly lifestyle and reduce your carbon footprint."
			},
			{
				title: "Camping Gear",
				content:
					"Get recommendations on the best camping gear for your next outdoor adventure."
			}
		]
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
				setTopicPosts,
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
