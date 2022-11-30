import React, { useState } from "react";
import { saveCall } from "../lib/api";
import useAuth from "../contexts/auth";
import { useNavigate } from "react-router-dom";
import { Wrapper } from "../components/admin";
import { isNil } from "lodash";
// import { Notification } from "../components";
import { Button, TextField, Typography } from "@mui/material";
import useNotification from "../contexts/notification";

export default function MaterialCreatePage() {
  const { jwtData, authToken } = useAuth();
  const navigate = useNavigate();
  const { setErrorMessage, setSuccessMessage } = useNotification();

  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);
  const [name, setName] = useState("");

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      name,
    };
    const res = await saveCall({ endpoint: "/materials", authToken, data });
    setLoading(false);
    if (res.status === 400) {
      setErrorMessage(res.data["error_messages"]);
    } else {
      setSuccessMessage("Successfully created");
      navigate("/materials");
    }
  };

  return (
    <Wrapper>
      <div className="my-4">
        <Typography variant="h2">Create Material</Typography>
      </div>
      <div className="flex flex-col max-w-xl">
        <div className="my-2">
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            className="my-2"
          />
        </div>
        <div className="my-2">
          <Button
            variant="contained"
            color="primary"
            onClick={onSave}
            disabled={loading}
          >
            Save
          </Button>
        </div>
      </div>
    </Wrapper>
  );
}
