import React, { useState } from "react";
import { Wrapper } from "../components/admin";
import {
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export default function DiscountCreatePage() {
  return (
    <Wrapper>
      <div className="my-4">
        <Typography variant="h2">Create Discount</Typography>
      </div>
      <div className="flex">
        <TextField
          label="UID"
          variant="outlined"
          // value={uid}
          // onChange={handleChange("uid")}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel id="discount_type">Discount Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Age"
            // onChange={handleChange("discount")}
          >
            <MenuItem value={"percentage"}>Percentage</MenuItem>
            <MenuItem value={"amount"}>Total Amount</MenuItem>
            <MenuItem value={"per_product"}>Amount per Product</MenuItem>
          </Select>
        </FormControl>
      </div>
    </Wrapper>
  );
}
