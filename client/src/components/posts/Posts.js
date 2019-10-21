import React from "react";
import "./Posts.css";
import PostListItem from "./PostListItem";
import Header from "../Header";
import PageButtons from "./PageButtons";
import reddit from "../../apis/reddit";
import Spinner from '../Spinner';

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
    console.log(this.props.match.params);
    const { sub, limit, pagination } = this.state;
    this.fetchPosts(sub, limit, pagination);
  }

  fetchPosts = (sub, limit, pagination) => {
    this.setState({ isLoading: true });
    const fetchPostsUrl = `/r/${sub}.json?limit=${limit}&${pagination}`;
    reddit
      .get(fetchPostsUrl)
      .then(res => {
        const posts = res.data.data.children.map(child => child.data);
        console.log(posts);
        this.setState(
          {
            posts: posts,
            after: res.data.data.after,
            before: res.data.data.before
          },
          () => this.setState({ isLoading: false })
        );
      })
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { inputvalue, limit } = this.state;
    this.setState({ sub: inputvalue }, this.fetchPosts(inputvalue, limit));
    this.setState({ inputvalue: "" });
  };

  handleChange = e => {
    let input = e.target.value.replace(/\s/g, "");
    this.setState({ inputvalue: input });
  };

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

  renderList() {
    if (!this.state.isLoading) {
      return this.state.posts.map(post => {
        return <PostListItem 
          key={post.id} 
          post={post} />;
      });
    }
    return <Spinner />;
  }

  render() {
    return (
      <div>
        <Header subreddit={this.state.sub} />
        {!this.state.isLoading && this.renderInputSubreddit()}
        {this.renderList()}
        {!this.state.isLoading && (
          <PageButtons fetch={this.fetchPosts} state={this.state} />
        )}
      </div>
    );
  }
}

export default Posts;
