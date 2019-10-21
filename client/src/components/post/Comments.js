import React from "react";
import { formatCreatedDate } from "../../utils/helpers";
import "./Comments.css";
import Spinner from "../Spinner";

class Comments extends React.Component {
  renderComments() {
    const { comments, isLoading } = this.props;
    if (!isLoading)
      return comments.map(comment => {
        return (
          <div key={comment.id} className="fluid comment">
            <div className="content commenthover">
              <a className="author">{comment.author}</a>
              <div className="metadata">
                <span>{comment.score} Points</span>
                <span className="date">
                  Created at {formatCreatedDate(comment.created_utc)}
                </span>
              </div>
              <div className="text">{comment.body}</div>
              <div className="actions">
                <a className="reply">Reply</a>
              </div>
            </div>
          </div>
        );
      });
    return <Spinner />;
  }

  render() {
    return (
      <div className="ui threaded comments">
        <h3 className="ui dividing header">Comments</h3>
        {this.renderComments()}
      </div>
    );
  }
}

export default Comments;
