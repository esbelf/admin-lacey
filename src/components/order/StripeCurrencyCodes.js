import React from "react";
import Select from "react-select";

export default function StripeCurrencyCodes({ name, onChange, value }) {
  const options = currencyCodes.map((countryRow) => ({
    value: countryRow["code"],
    label: countryRow["label"],
  }));
  return (
    <Select
      options={options}
      onChange={onChange}
      placeholder={"Country"}
      value={options.find((option) => option.value === value)}
      name={name}
      classNamePrefix="react-select-country-codes"
      theme={(theme) => {
        return {
          ...theme,
          zIndex: 20,
          backgroundColor: "#fff",
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

const currencyCodes = [
  { label: "Euro (EUR)", code: "EUR" },
  { label: "Dollar (USD)", code: "USD" },
  { label: "UK Pound (GBP)", code: "GBP" },
  { label: "Denmark Krone (DKK)", code: "DKK" },
  { label: "Norway Krone (NOK)", code: "NOK" },
  { label: "Swedish Krona (SEK)", code: "SEK" },
  { label: "Switzerland Franc (CHF)", code: "CHF" },
  { label: "Poland (PLN)", code: "PLN" },
];
