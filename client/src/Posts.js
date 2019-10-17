import React from 'react';
import axios from 'axios';

class Posts extends React.Component {
	constructor() {
		super();
		this.state = {
			posts: [],
			after: "",
			before: "",
			selftextVisible: false
		}
	}

	fetchPosts = (pagination) => {
		const fetchUrl = `https://www.reddit.com/r/javascript.json?limit=10&${pagination}`
		console.log(fetchUrl);
		axios.get(fetchUrl)
		.then((res) => {
			const redditJson = res.data;
			const after = redditJson.data.after;
			const before = redditJson.data.before;
			// const test = redditJson.map(obj => obj.data)
			const posts = redditJson.data.children.map(obj => obj.data)
			console.log(posts);
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

	renderHeader() {
		return (
			<h2 className="ui icon center aligned header">
				<i aria-hidden="true" className="js circular icon yellow"></i>
				<div className="content">/r/javascript</div>
			</h2>
		)
	}


	renderThumbnail() {
		const { thumbnail } = this.state.posts;
		if (thumbnail === "") {
			return <img alt="" src=""></img>
		} else {
			return <img alt="" src={thumbnail}></img>
		}
	}

	renderSelftext = (selftext) => {
		console.log(selftext);
		if (!this.state.selftextVisible) {
			 return ''
		} else {
			return (
				<div className="row">
					<div className="sixteen column wide">
						<div className="ui segment">
							<p>{selftext}</p>
						</div>
					</div>
				</div>
			)
		}
	}

	renderList() {
		console.log(this.state)
		return this.state.posts.map(post => {
			return (
			<div key={post.id} className="ui celled grid">
				<div onClick={() => {
						this.setState({ selftextVisible: true });
						this.renderSelftext(post.selftext);	
					}}
						className="row">
					<div className="one wide column">
						<span style={{ fontSize: '20px'}}>{post.score}</span>
						<img alt="" src={post.thumbnail}></img>
					</div>
					<div className="fifteen wide column">
						<div className="content">
							<div style={{ fontSize: '1.4em'}} className="header">{post.title}</div>
							<div className="meta">
								<span>created at {post.created} by {post.author}</span>
							</div>
							<div className="meta">
								<span>{post.num_comments} comments </span>
							</div>
						</div>
					</div>
				</div>
				{this.renderSelftext}
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
		return ( 
			<button style={{ width: '10em' }} className="ui icon right labeled button" onClick={this.nextPage}>
				<i className="right arrow icon"></i>
				Next
			</button>
		)
	}

	renderButtonPrev() {
		return (
			<button style={{ width: '10em' }} className="ui icon left labeled button" onClick={this.prevPage}>
				<i className="left arrow icon"></i>
				Previous
			</button>
		)
	}
	
	render() {
		return (
			<div>
				{this.renderHeader()}
				{this.renderList()}
				{this.renderButtonPrev()}
				{this.renderButtonNext()}
			</div>
		)
	}
}

export default Posts;