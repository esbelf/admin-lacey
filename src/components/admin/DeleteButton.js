import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import useAuth from "../../contexts/auth";
import { Button, Typography } from "@mui/material";
import { deleteCall } from "../../lib/api";

function DeleteButton({ endpoint, redirect }) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { authToken } = useAuth();
  const navigate = useNavigate();

  const onDelete = async () => {
    try {
      setLoading(true);
      await deleteCall({ endpoint, authToken });
      setLoading(false);
      navigate(redirect);
    } catch (err) {
      if (
        err["response"] &&
        err["response"]["data"] &&
        err["response"]["data"]["message"]
      ) {
        setErrorMessage(err["response"]["data"]["message"]);
      } else {
        setErrorMessage(err.message);
      }
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      {errorMessage && (
        <Typography variant="h6" color="secondary">
          {errorMessage}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={onDelete}
        disabled={loading}
      >
        Delete
      </Button>
    </React.Fragment>
  );
}

DeleteButton.propTypes = {
  endpoint: PropTypes.string.isRequired,
  redirect: PropTypes.string.isRequired,
};

export default DeleteButton;
