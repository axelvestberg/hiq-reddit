import React from 'react';

const Post = ({post}) =>
    <div className="ui fluid card" key={post.id}>
        <div className="content">
    			<div className="header">{post.selftext}</div>
        </div>
    </div>
export default Post;