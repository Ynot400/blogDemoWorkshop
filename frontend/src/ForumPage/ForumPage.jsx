import "./ForumPage.css";
import { AppContext } from "../methods/AppContext";
import { useContext } from "react";

export const ForumPage = (props) => {
	const forumTitle = props.title;
	let posts = props.posts;

	const {
		setPostTitle,
		setPostBody,
		setTopicPosts,
		topicPosts,
		newPostTitle,
		newPostBody,
		currPage
	} = useContext(AppContext);

	return (
		<div className="forumPage">
			<h1 className="forumTitle">{forumTitle}</h1>
			<div className="postForm">
				<input
					className="postTitleInput"
					placeholder="Post Title"
					onChange={(e) => {
						setPostTitle(e.target.value);
					}}></input>
				<textarea
					className="postBodyInput"
					placeholder="Post Body"
					onChange={(e) => {
						setPostBody(e.target.value);
					}}></textarea>
				<button
					className="submitPost"
					onClick={() => {
						console.log(currPage);
						setTopicPosts((prev) => ({
							...prev,
							[currPage]: [
								{
									title: newPostTitle,
									content: newPostBody
								},
								...posts
							]
						}));
						console.log(topicPosts);
						posts = posts.concat({
							title: newPostTitle,
							content: newPostBody
						});
					}}>
					Submit Post
				</button>
			</div>

			<div className="feed">
				{posts.map((post, i) => (
					<div className="post" key={i}>
						<h2 className="postTitle">{post.title}</h2>
						<p className="postBody">{post.content}</p>
					</div>
				))}
				{posts.length === 0 && (
					<p className="noPosts">
						No posts yet! Be the first to post.
					</p>
				)}
			</div>
		</div>
	);
};
