import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/system/Unstable_Grid/Grid";
import PostsLists from "../components/PostsLists";
import AddPostForm from "../components/AddPostForm";

const PostScreen = () => {
  return (
    <div>
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
        <Grid
          container
          sx={{ display: "flex ", justifyContent: "space-between" }}
        >
          <Grid item>
            <PostsLists />
          </Grid>
          <Grid item>
            <AddPostForm />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default PostScreen;
