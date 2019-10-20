import React from "react";
import axios from "axios";
import "./Posts.css";
import Postitem from "./PostItem";
import Header from "./Header";

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      after: null,
      before: null,
      sub: "javascript",
      limit: 10,
      inputvalue: "",
      isLoading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { sub, limit, pagination } = this.state;
    this.fetchPosts(sub, limit, pagination);
	}
	
	fetchPosts = (sub, limit, pagination) => {
    this.setState({ isLoading: true });
    const fetchUrl = `https://www.reddit.com/r/${sub}.json?limit=${limit}&${pagination}`;
  	axios.get(fetchUrl).then(res => {
      const response = res.data.data;
      console.log(response);
      const posts = response.children.map(child => child.data);
      console.log(posts);
      this.setState(
        {
          posts: posts,
          after: response.after,
          before: response.before
        },
        () => this.setState({ isLoading: false })
      );
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { inputvalue, limit } = this.state;
    this.setState({ sub: inputvalue }, this.fetchPosts(inputvalue, limit));
  };

  handleChange = e => {
    this.setState({ inputvalue: e.target.value });
  }

  renderInputSubreddit = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="ui labeled input">
          <div className="ui label">r/</div>
          <input
            value={this.state.inputvalue}
            onChange={this.handleChange}
            type="text"
            placeholder="enter a subreddit"
          ></input>
        </div>
      </form>
    );
  };

  nextPage = () => {
    const { sub, limit } = this.state;
    let nextPageQuery = `after=${this.state.after}&count=${limit}`;
    this.fetchPosts(sub, limit, nextPageQuery);
  };

  prevPage = () => {
    const { sub, limit } = this.state;
    let prevPageQuery = `after=${this.state.before}&count=${limit}`;
    this.fetchPosts(sub, limit, prevPageQueryx2);
  };

  renderButtonNext() {
    return (
      <button
        style={{ width: "10em" }}
        className="ui icon right labeled button"
        onClick={this.nextPage}
      >
        <i className="right arrow icon"></i>
        Next
      </button>
    );
  }

  renderButtonPrev() {
    return (
      <button
        style={{ width: "10em" }}
        className="ui icon left labeled button"
        onClick={this.prevPage}
      >
        <i className="left arrow icon"></i>
        Previous
      </button>
    );
  }

  renderList() {
    if (!this.state.isLoading) {
      return this.state.posts.map(post => {
        return <Postitem key={post.id} post={post} />;
      });
    }
    return (
      <div style={{ height: "10em" }} className="ui">
        <div className="ui active transition visible inverted dimmer">
          <div className="content">
            <div className="ui massive text loader">Loading</div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Header subreddit={this.state.sub} />
        {this.renderInputSubreddit()}
        {this.renderList()}
        {this.renderButtonPrev()}
        {this.renderButtonNext()}
      </div>
    );
  }
}

export default Posts;
