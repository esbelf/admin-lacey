import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { sendResetPassword } from "../lib/api";
import { isNil, isEmpty } from "lodash";
import { Notification } from "../components";
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function ResetPasswordPage() {
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isEmpty(password) || isEmpty(passwordConfirmation)) {
      setMessage(
        "Must fill out the password and password confirmation fields."
      );
      setError(true);
      return;
    }
    if (password !== passwordConfirmation) {
      setMessage("Passwords do not match");
      setError(true);
    }
    const res = await sendResetPassword({
      password,
      passwordConfirmation,
      token: params.token,
    });
    const data = res.data;

    if (!isNil(data.error)) {
      setError(true);
      setMessage(data.error[0]);
    } else {
      setMessage("Password was reset successfully. Go to login page now.");
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
          Reset Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {message && <Notification boldText={message} success={!error} />}
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            autoFocus
            value={password}
            onChange={(e) => {
              setPassword(e.currentTarget.value);
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password-confirmation"
            label="Password Confirmation"
            name="password-confirmation"
            type="password"
            autoFocus
            value={passwordConfirmation}
            onChange={(e) => {
              setPasswordConfirmation(e.currentTarget.value);
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
              <Link to="/login" variant="body2" className="text-blue-400">
                To login page
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
