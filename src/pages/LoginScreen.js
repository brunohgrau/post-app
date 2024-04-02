import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

const LoginScreen = () => {
  return (
    <Container sx={{ py: { xs: 14 } }} maxWidth="xs">
      <CssBaseline />

      {/* Page Header */}

      <Typography
        component="h4"
        variant="h4"
        color="text.primary"
        //sx={{ mb: 1 }}
      >
        Login
      </Typography>
      <Typography component="body" variant="body" color="text.secondary">
        Hint: enter anything, or leave it blank and hit login
      </Typography>

      {/* Form */}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="city"
            label="City"
            // type="password"
            id="city"
            //autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            href="/post"
          >
            Login
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="body2">New Customer?</Typography>
        <Link href="/register" variant="body2" sx={{ ml: 2 }}>
          Register
        </Link>
      </Box>
    </Container>
  );
};

export default LoginScreen;
