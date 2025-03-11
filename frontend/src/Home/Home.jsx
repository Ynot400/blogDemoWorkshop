import { AppContext } from "../methods/AppContext";
import { useContext } from "react";
import "./Home.css";
export const Home = () => {
	// Source username and recent posts from context
	const { username, userPosts } = useContext(AppContext);
	return (
		<div className="home">
			<h1 className="homeTitle">Home - Hi {username}!</h1>
			<p className="yourPosts">Your Posts:</p>
			<div className="feed">
				{userPosts.map((post) => (
					<div className="post" key={post.id}>
						<h2 className="postTitle">{post.title}</h2>
						<p className="postBody">{post.content}</p>
					</div>
				))}
				{userPosts.length === 0 && (
					<p className="noPosts">You haven't posted anything yet!</p>
				)}
			</div>
		</div>
	);
};
