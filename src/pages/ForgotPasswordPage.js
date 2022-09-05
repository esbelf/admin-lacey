import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sendForgotPasswordEmail } from "../lib/api";
import { isNil } from "lodash";
import { Notification } from "../components";
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
  const [error, setError] = useState(false);
  const [email, setEmail] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await sendForgotPasswordEmail({ email });
    const data = res.data;
    if (!isNil(data.error)) {
      setError(true);
      setMessage(data.error);
    } else {
      setMessage("Password reset email was sent successfully");
      setError(false);
    }
    setLoading(false);
  };
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {message && <Notification boldText={message} success={!error} />}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="user"
            autoComplete="user"
            autoFocus
            value={email}
            onChange={(e) => {
              setEmail(e.currentTarget.value);
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            Send Reset Password Email
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/login" variant="body2">
                Back to login page
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
