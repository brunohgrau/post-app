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

//import { useLoginMutation } from '../../app/services/auth'
//import type { LoginRequest } from '../../app/services/auth'

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

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
            name="password"
            label="Password"
            // type="password"
            id="password"
            //autoComplete="current-password
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            href="/post"
            // onClick={}
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
