import React, { useState } from "react";
import { isNil } from "lodash";
import { useNavigate } from "react-router-dom";
import { Wrapper } from "../components/admin";
import {
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  InputAdornment,
} from "@mui/material";
import { saveCall } from "../lib/api";
import useAuth from "../contexts/auth";
import { Notification } from "../components";

export default function DiscountCreatePage() {
  const { jwtData, authToken } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);
  const [uid, setUid] = useState("");
  const [description, setDescription] = useState("");
  const [discountType, setDiscountType] = useState("amount");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [minTotalAmountCents, setMinTotalAmountCents] = useState(0);

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      uid,
      description,
      discountType,
      discountAmount: discountAmount * 100,
      discountPercentage,
      minTotalAmountCents: minTotalAmountCents * 100,
    };
    const res = await saveCall({ endpoint: "/discounts", authToken, data });
    setLoading(false);
    if (res.status === 400) {
      setErrorMessages(res.data["error_messages"]);
    } else {
      navigate("/discounts");
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
            label="UID"
            variant="outlined"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            fullWidth
            className="my-2"
          />
        </div>
        <div className="my-2">
          <TextField
            label="Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={4}
          />
        </div>
        <div className="my-2">
          <FormControl fullWidth>
            <InputLabel id="discountTypeLabel">Discount Type</InputLabel>
            <Select
              labelId="discountTypeLabel"
              id="discountType"
              value={discountType}
              label="Discount Type"
              onChange={(e) => setDiscountType(e.target.value)}
            >
              <MenuItem value={"percentage"}>Percentage</MenuItem>
              <MenuItem value={"amount"}>Total Amount</MenuItem>
              <MenuItem value={"per_product"}>Amount per Product</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="my-2 gap-x-2 flex flex-row">
          <TextField
            label="Discount Amount"
            variant="outlined"
            value={discountAmount}
            onChange={(e) => setDiscountAmount(e.target.value)}
            fullWidth
            type="number"
            disabled={discountType === "percentage"}
            startAdornment={
              <InputAdornment position="start">
                {jwtData["euro"] ? "€" : "$"}
              </InputAdornment>
            }
          />
          <TextField
            label="Discount Percentage"
            variant="outlined"
            defaultValue={discountPercentage}
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
            fullWidth
            type="number"
            disabled={discountType !== "percentage"}
          />
        </div>
        <div className="my-2">
          <TextField
            label="Min Total Amount for Valid Discount"
            variant="outlined"
            value={minTotalAmountCents}
            onChange={(e) => setMinTotalAmountCents(e.target.value)}
            fullWidth
            type="number"
            startAdornment={
              <InputAdornment position="start">
                {jwtData["euro"] ? "€" : "$"}
              </InputAdornment>
            }
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
