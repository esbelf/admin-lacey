import React, { useState } from "react";
import { saveCall } from "../lib/api";
import useAuth from "../contexts/auth";
import { useNavigate } from "react-router-dom";
import { Wrapper } from "../components/admin";
import { isNil } from "lodash";
import { Notification } from "../components";
import { TextField, Typography } from "@mui/material";

export default function MaterialCreatePage() {
  const { jwtData, authToken } = useAuth();
  const navigate = useNavigate();

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
      setErrorMessages(res.data["error_messages"]);
    } else {
      navigate("/materials");
    }
  };

  return (
    <Wrapper>
      <div className="my-4">
        <Typography variant="h2">Create Discount</Typography>
      </div>
      <div className="flex flex-col max-w-xl">
        {!isNil(errorMessages) && (
          <div className="my-2">
            <Notification smallText={errorMessages[0]} />
          </div>
        )}
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
      </div>
    </Wrapper>
  );
}
