import React from "react";
import Select from "react-select";

export default function StripeCountryCodes({ name, onChange, value }) {
  const countryCodes =
    process.env.NEXT_PUBLIC_EURO !== "true"
      ? northAmericanCountryCodes
      : europeanCountryCodes;
  return (
    <Select
      options={countryCodes.map((countryRow) => ({
        value: countryRow["code"],
        label: countryRow["country"],
      }))}
      onChange={onChange}
      placeholder={"Country"}
      value={value}
      name={name}
      classNamePrefix="react-select-country-codes"
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

const europeanCountryCodes = [
  { country: "Austria", code: "AT" },
  { country: "Belgium", code: "BE" },
  { country: "Bulgaria", code: "BG" },
  { country: "Czech Republic", code: "CZ" },
  { country: "Denmark", code: "DK" },
  { country: "Estonia", code: "EE" },
  { country: "Finland", code: "FI" },
  { country: "France", code: "FR" },
  { country: "Germany", code: "DE" },
  { country: "Greece", code: "GR" },
  { country: "Ireland", code: "IE" },
  { country: "Italy", code: "IT" },
  { country: "Latvia", code: "LV" },
  { country: "Lithuania", code: "LT" },
  { country: "Luxembourg", code: "LU" },
  { country: "Netherlands", code: "NL" },
  { country: "Norway", code: "NO" },
  { country: "Poland", code: "PL" },
  { country: "Portugal", code: "PT" },
  { country: "Romania", code: "RO" },
  { country: "Slovakia", code: "SK" },
  { country: "Slovenia", code: "SI" },
  { country: "Spain", code: "ES" },
  { country: "Sweden", code: "SE" },
  { country: "Switzerland", code: "CH" },
  { country: "United Kingdom", code: "GB" },
];
const northAmericanCountryCodes = [
  { country: "United States", code: "US" },
  { country: "Canada", code: "CA" },
];
