import React from "react";

import PostItem from "./PostItem";

const PostFeed = ({ posts }) => {
    return posts.map((post) => (
        <PostItem key={post.id.toString()} post={post} showActions={true} />
    ));
};

export default PostFeed;
