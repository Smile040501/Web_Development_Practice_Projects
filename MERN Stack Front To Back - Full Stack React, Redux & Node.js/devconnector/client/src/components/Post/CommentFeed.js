import React from "react";

import CommentItem from "./CommentItem";

const CommentFeed = ({ comments, postId }) => {
    if (comments) {
        return comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} postId={postId} />
        ));
    } else {
        return null;
    }
};

export default CommentFeed;
