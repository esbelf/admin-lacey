import React from "react";
import Select from "react-select";

export default function StripeStateCodes({ country, name, onChange, value }) {
  const stateCodes = country === "CA" ? canada_states : usa_states;
  const options = stateCodes.map((countryRow) => ({
    value: countryRow["code"],
    label: countryRow["name"],
  }));
  return (
    <Select
      options={options}
      onChange={onChange}
      placeholder={"State / Province"}
      value={options.find((option) => option.value === value)}
      name={name}
      classNamePrefix="react-select-state-codes"
      theme={(theme) => {
        return {
          ...theme,
          borderRadius: "0.5rem",
          borderColor: "#1e4858",
          borderWidth: 0,
          spacing: {
            ...theme.spacing,
            controlHeight: 48,
          },
          colors: {
            ...theme.colors,
            primary25: "#bcdada",
            primary: "#1e4858",
            neutral10: "#1e4858",
          },
        };
      }}
    />
  );
}

const usa_states = [
  { code: "AK", name: "Alaska" },
  { code: "AL", name: "Alabama" },
  { code: "AR", name: "Arkansas" },
  { code: "AS", name: "American Samoa" },
  { code: "AZ", name: "Arizona" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DC", name: "District of Columbia" },
  { code: "DE", name: "Delaware" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "GU", name: "Guam" },
  { code: "HI", name: "Hawaii" },
  { code: "IA", name: "Iowa" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "MA", name: "Massachusetts" },
  { code: "MD", name: "Maryland" },
  { code: "ME", name: "Maine" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MO", name: "Missouri" },
  { code: "MS", name: "Mississippi" },
  { code: "MT", name: "Montana" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "NE", name: "Nebraska" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NV", name: "Nevada" },
  { code: "NY", name: "New York" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "PR", name: "Puerto Rico" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VA", name: "Virginia" },
  { code: "VI", name: "Virgin Islands" },
  { code: "VT", name: "Vermont" },
  { code: "WA", name: "Washington" },
  { code: "WI", name: "Wisconsin" },
  { code: "WV", name: "West Virginia" },
  { code: "WY", name: "Wyoming" },
];

const canada_states = [
  { name: "Alberta", code: "AB" },
  { name: "British Columbia", code: "BC" },
  { name: "Manitoba", code: "MB" },
  { name: "New Brunswick", code: "NB" },
  { name: "Newfoundland and Labrador", code: "NL" },
  { name: "Northwest Territories", code: "NT" },
  { name: "Nova Scotia", code: "NS" },
  { name: "Nunavut", code: "NU" },
  { name: "Ontario", code: "ON" },
  { name: "Prince Edward Island", code: "PE" },
  { name: "Quebec", code: "QC" },
  { name: "Saskatchewan", code: "SK" },
  { name: "Yukon Territory", code: "YT" },
];
