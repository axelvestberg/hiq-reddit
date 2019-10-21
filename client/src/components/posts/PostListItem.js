import React from "react";
import { Link } from "react-router-dom";
import { scoreFormatter, formatCreatedDate } from "../../utils/helpers.js";

const PostListItem = ({ post }) =>  {
 
  return (
    <div key={post.id} className="ui celled grid">
      <div className="row">
        <div className="one wide column">
          <span className="score">{scoreFormatter(post.score)}</span>
          <img alt="" src={post.thumbnail}></img>
        </div>
        <div className="fifteen wide column">
          <div className="content">
            <a href={post.url}>
              <div className="ui header">{post.title}</div>
            </a>
            <div className="meta">
              <span>
                created at {formatCreatedDate(post.created_utc)} by{" "}
                {post.author}
              </span>
            </div>
            <div className="meta">
              <Link to={`/comments/${post.id}`}>
                <span>{post.num_comments} comments</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostListItem;
