import React from "react";
import { TextField, Typography } from "@mui/material";

export default function ContactDetailForm({
  contactDetails,
  setContactDetails,
}) {
  const setValue = (key) => (event) => {
    setContactDetails({ ...contactDetails, [key]: event.target.value });
  };

  return (
    <div className="flex flex-col justify-start gap-y-2 ">
      <div className="flex flex-row justify-start gap-x-2">
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          fullWidth
          value={contactDetails["email"] || ""}
          onChange={setValue("email")}
        />
      </div>
      <div className="flex flex-row justify-start gap-x-2">
        <TextField
          id="phone"
          label="Phone Number"
          variant="outlined"
          fullWidth
          value={contactDetails["phone_number"] || ""}
          onChange={setValue("phone_number")}
        />
        <TextField
          id="fullName"
          label="Full Name"
          variant="outlined"
          fullWidth
          value={contactDetails["fullName"] || ""}
          onChange={setValue("fullName")}
        />
      </div>
    </div>
  );
}
