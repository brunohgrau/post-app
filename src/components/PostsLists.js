import React, { useMemo } from "react";
import { useGetPostsQuery } from "../slices/apiSlice";
import PostExcerpt from "./PostExcerpt";

const PostsLists = () => {
  const {
    data: posts = [],
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetPostsQuery();
  const sortedPosts = useMemo(() => {
    const sortedPosts = posts.slice();
    // Sort posts in descending chronological order
    sortedPosts.sort((a, b) => b.date.localeCompare(a.date));
    return sortedPosts;
  }, [posts]);

  let content;

  content = sortedPosts.map((post) => (
    <PostExcerpt key={post.id} post={post} refetch={refetch} />
  ));
  return (
    <>
      <section className="posts-list">
        <h2>Post List</h2>
        {content}
      </section>
    </>
  );
};

export default PostsLists;
