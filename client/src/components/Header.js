import React from "react";
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    const { subreddit } = this.props;
    const icon =
      subreddit === "javascript" ? "js circular icon yellow" : "reddit circular icon";

    return (
      <div>
        <h2 className="ui icon center aligned header">
          <Link to="/">
            <i aria-hidden="true" className={icon}></i>
            <div className="content">{subreddit}</div>
          </Link>
        </h2>
      </div>
    );
  }
}

export default Header;
