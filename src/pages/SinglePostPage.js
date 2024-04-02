import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/system/Unstable_Grid/Grid";
import { useGetPostQuery } from "../slices/apiSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDeletePostMutation } from "../slices/apiSlice";

const SinglePostPage = () => {
  const { postId } = useParams();
  const { data: post, isFetching, isSuccess } = useGetPostQuery(postId);
  const [deletePost, { isLoading: loadingDelete }] = useDeletePostMutation();
  const navigate = useNavigate();

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const onDeletePostClicked = async (id) => {
    await deletePost({ id: postId });
    navigate(`/post`);
  };

  let content;
  if (isFetching) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = (
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
        <button className="button" onClick={() => onDeletePostClicked(post.id)}>
          Delete
        </button>
      </article>
    );
  }

  return (
    <Container
      fixed
      id="products"
      sx={{
        py: { xs: 16 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Grid container>
        <Grid item>
          <section>{content}</section>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SinglePostPage;
