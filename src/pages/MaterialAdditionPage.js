import React, { useState } from "react";
import { Wrapper, Grouping } from "../components/admin";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import { useApiFetch } from "../hooks/api";
import useAuth from "../contexts/auth";
import { useParams, useNavigate } from "react-router-dom";
import useNotification from "../contexts/notification";
import { saveCall } from "../lib/api";

export default function MaterialAdditionPage() {
  const params = useParams();
  const navigate = useNavigate();
  const { jwtData, authToken } = useAuth();
  const { setErrorMessage, setSuccessMessage } = useNotification();

  const { data: material, loading } = useApiFetch({
    url: `/materials/${params.id}`,
  });

  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [purchaseInfo, setPurchaseInfo] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  const onSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const data = {
      title,
      purchaseInfo,
      quantity,
      priceCents: price,
      // priceCurrency,
    };
    const res = await saveCall({
      endpoint: `/materials/${params.id}/material_additions`,
      authToken,
      data,
    });
    setSaving(false);
    if (res.status === 400) {
      setErrorMessage(res.data["error_messages"]);
    } else {
      navigate(`/materials/${params.id}`);
    }
  };

  return (
    <Wrapper>
      <div className="flex-1 flex flex-row justify-between mt-2 mb-10">
        <div className="flex-1">
          <Typography variant="h2">Material Addition</Typography>
          <Typography variant="h5">{material.name}</Typography>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-y-4">
        <div className="flex-1">
          <TextField
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            className="my-2"
          />
        </div>
        <div className="flex-1">
          <TextField
            label="Purchase Info"
            variant="outlined"
            value={purchaseInfo}
            onChange={(e) => setPurchaseInfo(e.target.value)}
            fullWidth
            multiline
            rows={4}
          />
        </div>
        <div className="flex-1">
          <TextField
            label="Number of pieces"
            variant="outlined"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            fullWidth
            type="number"
          />
        </div>
        <div className="flex-1">
          <TextField
            label="Price of Purchase in cents"
            variant="outlined"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            type="number"
          />
        </div>
        <div className="flex-1">
          <Button
            variant="contained"
            color="primary"
            onClick={onSave}
            disabled={saving}
          >
            Save
          </Button>
        </div>
      </div>
    </Wrapper>
  );
}
