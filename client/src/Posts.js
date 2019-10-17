import React from 'react';
import axios from 'axios';

class Posts extends React.Component {
	constructor() {
		super();
		this.state = {
			posts: [],
			after: "",
			before: ""
		}
	}

	fetchPosts = (pagination) => {
		const fetchUrl = `https://www.reddit.com/r/javascript.json?limit=10&${pagination}`
		console.log(fetchUrl);
		console.log("test" + pagination)
		axios.get(fetchUrl)
		.then((res) => {
			const redditJson = res.data;
			const after = redditJson.data.after;
			const before = redditJson.data.before;
			// const test = redditJson.map(obj => obj.data)
			const posts = redditJson.data.children.map(obj => obj.data)
			console.log(redditJson)
			console.log(posts);
			console.log(after);
			console.log(before);
			this.setState({
					posts: posts,
					after: after,
					before: before
			})
		})
	}
	componentDidMount() {
		this.fetchPosts();
	}

	renderList() {
		console.log(this.state)

		return this.state.posts.map((post, index) => {
			return (
			<div key={post.id}>
				<li>{post.title}</li>
			</div>
			)
		})
	}

	nextPage = () => {
		let nextPageString = `after=${this.state.after}&count=10`
		this.fetchPosts(nextPageString)
		console.log(this.state.after);
	}

	prevPage = () => {
		let prevPageString = `before=${this.state.before}&count=10`
		this.fetchPosts(prevPageString);
	}

	renderButtonNext() {
		return <button onClick={this.nextPage}>Next</button>
	}

	renderButtonPrev() {
		return <button onClick={this.prevPage}>Previous</button>
	}
	
	render() {
		return (
			<div>
				Posts
				{this.renderList()}
				{this.renderButtonPrev()}
				{this.renderButtonNext()}
			</div>
		)
	}
}

export default Posts;