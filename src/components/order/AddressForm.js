import React from "react";
import useAuth from "../../contexts/auth";
import StripeCountryCodes from "./StripeCountryCodes";
import StripeStateCodes from "./StripeStateCodes";
import { TextField, Typography } from "@mui/material";

export default function AddressForm({ type, setAddress, address }) {
  const { jwtData } = useAuth();

  const handleAddressChange = (key) => (e) => {
    setAddress({ ...address, [key]: e.target.value });
  };
  const handleStateChange = (obj) => {
    setAddress({ ...address, state: obj.value });
  };

  const handleCountryChange = (obj) => {
    setAddress({ ...address, state: null, country: obj.value });
  };

  return (
    <div className="flex flex-col gap-y-2">
      <TextField
        id={`${type}Name`}
        label="Full Name"
        variant="outlined"
        fullWidth
        value={address["fullName"]}
        onChange={handleAddressChange("fullName")}
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
      {jwtData["euro"] === true ? (
        <div className="w-full">
          <TextField
            id={`${type}State`}
            label="State"
            variant="outlined"
            fullWidth
            value={address["state"]}
            onChange={handleAddressChange("state")}
          />
        </div>
      ) : (
        <div className="w-full">
          <StripeStateCodes
            name={`${type}State`}
            value={address["state"]}
            onChange={handleStateChange}
            country={address["country"]}
          />
        </div>
      )}
      <div className="w-full">
        <StripeCountryCodes
          name={`${type}Country`}
          value={address["country"]}
          onChange={handleCountryChange}
          euro={jwtData["euro"] === true}
        />
      </div>
    </div>
  );
}
