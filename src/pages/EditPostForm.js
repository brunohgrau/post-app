import React, { useState } from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/system/Unstable_Grid/Grid";
import { useGetPostQuery, useEditPostMutation } from "../slices/apiSlice";
import { useParams, useNavigate } from "react-router-dom";

const EditPostForm = () => {
  const { postId } = useParams();
  const { data: post } = useGetPostQuery(postId);
  const [updatePost, { isLoading }] = useEditPostMutation();

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const navigate = useNavigate();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);

  const onSavePostClicked = async () => {
    if (title && content) {
      await updatePost({ id: postId, title, content });
      navigate(`/posts/${postId}`);
    }
  };

  return (
    <>
      <Container>
        <Grid container>
          <Grid item>
            <section>
              <h2>Edit Post</h2>
              <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                  type="text"
                  id="postTitle"
                  name="postTitle"
                  placeholder="What's on your mind?"
                  value={title}
                  onChange={onTitleChanged}
                  disabled={isLoading}
                />
                <label htmlFor="postContent">Content:</label>
                <textarea
                  id="postContent"
                  name="postContent"
                  value={content}
                  onChange={onContentChanged}
                  disabled={isLoading}
                />
              </form>

              <button
                type="button"
                onClick={onSavePostClicked}
                disabled={isLoading}
              >
                Save Post
              </button>
            </section>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default EditPostForm;
