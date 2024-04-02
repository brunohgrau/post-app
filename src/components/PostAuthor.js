import React from "react";
import { useGetUsersQuery } from "../slices/usersApiSlice";

const PostAuthor = ({ userId }) => {
  const { data: users } = useGetUsersQuery();

  const author = users?.find((user) => user.id === userId);

  return <span>by {author ? author.name : "Unknown author"}</span>;
};

export default PostAuthor;
