import React from "react";
import reddit from "../../apis/reddit";
import Comments from "./Comments";
import { formatCreatedDate } from "../../utils/helpers";
import Header from '../Header';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      comments: [],
      isLoading: false
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.fetchPost(id);
  }

  fetchPost = id => {
    this.setState({ isLoading: true });
    reddit.get(`/comments/${id}.json`).then(res => {
      const post = res.data[0].data.children;
      const comments = res.data[1].data.children.map(child => child.data);
      this.setState(
        {
          post: {
            title: post[0].data.title,
            selftext: post[0].data.selftext,
            created_utc: post[0].data.created_utc,
            author: post[0].data.author,
            num_comments: post[0].data.num_comments,
            url: post[0].data.url,
            post_hint: post[0].data.url
          },
          comments: comments
        },
        () => this.setState({ isLoading: false })
      );
    });
  };

  renderSelftext() {
    return (
      <div className="ui segment">
        <p>{this.state.post.selftext}</p>
      </div>
    )
  }

  renderImage() {
    return (
      <img className="ui large rounded image" src={this.state.post.url} alt=""></img>
    ) 
  }

  render() {
    const {
      created_utc,
      author,
      selftext,
      num_comments,
      post_hint,
    } = this.state.post;

    return (
      <div>
        <Header />
        <h2>{this.state.post.title}</h2>
        <div className="meta">
          <span>
            created at {formatCreatedDate(created_utc)} by {author}
          </span>
        </div>
        {selftext && this.renderSelftext()}
        {post_hint && this.renderImage()}
        <div className="meta">
          <span>{num_comments} comments</span>
        </div>
        <Comments
          comments={this.state.comments}
          isLoading={this.state.isLoading}
        />
      </div>
    );
  }
}

export default Post;
