import React from "react";
import { useOrder } from "../../contexts/order";
import StripeCountryCodes from "./StripeCountryCodes";
import { TextField, Typography } from "@mui/material";

export default function AddressForm({ type, setAddress, address }) {
  const handleAddressChange = (key) => (e) => {
    setAddress({ ...address, key: e.target.value });
  };
  return (
    <div className="flex flex-col gap-y-2">
      <TextField
        id={`${type}Name`}
        label="Full Name"
        variant="outlined"
        fullWidth
        value={address["name"]}
        onChange={handleAddressChange("name")}
      />

      <TextField
        id={`${type}CompanyName`}
        label="Company Name"
        variant="outlined"
        fullWidth
        value={address["companyName"]}
        onChange={handleAddressChange("companyName")}
      />
      <TextField
        id={`${type}AddressLine1`}
        label="Address Line 1"
        variant="outlined"
        fullWidth
        value={address["addressLine1"]}
        onChange={handleAddressChange("addressLine1")}
      />
      <TextField
        id={`${type}AddressLine2`}
        label="Address Line 2"
        variant="outlined"
        fullWidth
        value={address["addressLine2"]}
        onChange={handleAddressChange("addressLine2")}
      />
      <div className="flex flex-row justify-start gap-x-2">
        <TextField
          id={`${type}City`}
          label="City"
          variant="outlined"
          fullWidth
          value={address["city"]}
          onChange={handleAddressChange("city")}
        />
        <TextField
          id={`${type}postalCode`}
          label="Postal Code"
          variant="outlined"
          fullWidth
          value={address["postalCode"]}
          onChange={handleAddressChange("postalCode")}
        />
      </div>
      <TextField
        id={`${type}State`}
        label="State"
        variant="outlined"
        fullWidth
        value={address["state"]}
        onChange={handleAddressChange("state")}
      />
      <div className="w-full">
        <StripeCountryCodes
          name={`${type}Country`}
          value={address["country"]}
          onChange={handleAddressChange("country")}
        />
      </div>
    </div>
  );
}
