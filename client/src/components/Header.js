import React from "react";

// MOVE SUBREDDIT SEARCHBAR INTO HEADER

const Header = ({ subreddit }) => {
  let icon =
    subreddit === "javascript"
      ? "js circular icon yellow"
      : "reddit circular icon";
  return (
    <div>
      <h2 className="ui icon center aligned header">
        <i aria-hidden="true" className={icon}></i>
        <div className="content">{subreddit}</div>
      </h2>
    </div>
  );
};

export default Header;
