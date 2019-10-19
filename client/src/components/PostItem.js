import React from "react";
import { scoreFormatter, formatCreatedDate } from "../utils/helpers.js";

const PostItem = ({ post, width }) => {
  console.log(width);
  const isMobile = width <= 500;
  if (!isMobile) {
    return (
      <div key={post.id} className="ui celled grid">
        <div className="row">
          <div className="one wide column">
            <span className="score" style={{ fontSize: "20px" }}>
              {scoreFormatter(post.score)}
            </span>
            <img alt="" src={post.thumbnail}></img>
          </div>
          <div className="fifteen wide column">
            <div className="content">
              <a href={post.url}><div className="ui header">{post.title}</div></a>
              <div className="meta">
                <span>
                  created at {formatCreatedDate(post.created_utc)} by{" "}
                  {post.author}
                </span>
              </div>
              <a href={post.permalink}>
                <div className="meta">
                  <span>{post.num_comments} comments </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  //This is never used, remove
  return (
    <div key={post.id} className="ui celled grid">
    <div className="row">
      <div className="sixteen wide column">
        <div className="content">
          <a href={post.url}><div className="ui header">{post.title}</div></a>
          <div className="meta">
            <span>
              created at {formatCreatedDate(post.created_utc)} by{" "}
              {post.author}
            </span>
          </div>
          <a href={post.permalink}>
            <div className="meta">
              <span>{post.num_comments} comments </span>
              <span>{post.score}</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
  )
};

export default PostItem;
