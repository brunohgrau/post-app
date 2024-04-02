import React from "react";
import { Link } from "react-router-dom";

const PostExcerpt = ({ post, refetch }) => {
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div></div>
      <p className="post-content">{post.content.substring(0, 20)}</p>

      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  );
};

export default PostExcerpt;
