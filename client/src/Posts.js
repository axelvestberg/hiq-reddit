import React from 'react';
import axios from 'axios';
import './Posts.css';
import moment from 'moment';

class Posts extends React.Component {
	constructor() {
		super();
		this.state = {
			posts: [],
			after: "",
			before: "",
		}
	}

	fetchPosts = (pagination) => {
		const fetchUrl = `https://www.reddit.com/r/javascript.json?limit=10&${pagination}`
		axios.get(fetchUrl)
		.then((res) => {
			const redditJson = res.data;
			const after = redditJson.data.after;
			const before = redditJson.data.before;
			const posts = redditJson.data.children.map(obj => obj.data)
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

	renderHeader(sub) {
		console.log('subreddit name', sub);
		return (
			<h2 className="ui icon center aligned header">
				<i aria-hidden="true" className="js circular icon yellow"></i>
				<div className="content">r/javascript</div>
			</h2>
		)
	}

	formatCreatedDate(date) {
		let dateString = moment.unix(date);
		let createdAt = dateString._d;
		let timeAgo = moment(createdAt).fromNow();
		return timeAgo;
	}

	renderSelftext = (selftext) => {
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

	scoreFormatter = (num) => {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
	}

	renderList() {
		console.log('posts', this.state.posts)
		return this.state.posts.map(post => {
			return (
			<div key={post.id} className="ui celled grid">
				<div className="row">
					<div className="one wide column">
						<span className="score" style={{ fontSize: '20px'}}>{this.scoreFormatter(post.score)}</span>
						<img alt="" src={post.thumbnail}></img>
					</div>
					<div className="fifteen wide column">
						<div className="content">
							<div style={{ fontSize: '1.4em'}} className="header">{post.title}</div>
							<div className="meta">
								<span>created at {this.formatCreatedDate(post.created_utc)} by {post.author}</span>
							</div>
							<div className="meta">
								<span>{post.num_comments} comments </span>
							</div>
						</div>
					</div>
				</div>
			</div>
			)
		})
	}

	nextPage = () => {
		let nextPageString = `after=${this.state.after}&count=10`
		this.fetchPosts(nextPageString)
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