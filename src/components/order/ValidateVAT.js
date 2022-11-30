import React, { useState } from "react";
import useOrder from "../../contexts/order";
import useAuth from "../../contexts/auth";
import { validateVatNumber } from "../../lib/api";
import Notification from "../Notification";
import { Button } from "@mui/material";

export default function ValidateVAT({ vatNumber, setVatNumber }) {
  const { authToken } = useAuth();

  const [vatStr, setVatStr] = useState(vatNumber);
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);

  const onValidate = async () => {
    try {
      setProcessing(true);
      const { valid, validFormat } = await validateVatNumber({
        vatNumber: vatStr,
        token: authToken,
      });
      if (valid) {
        setVatNumber(vatStr);
        setMessage("Valid VAT Number");
        setErrorMessage(null);
      } else if (!validFormat) {
        setMessage(null);
        setErrorMessage("Invalid VAT Number Format");
      } else {
        setMessage(null);
        setErrorMessage("Invalid VAT Number");
      }
      setProcessing(false);
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message);
      setProcessing(false);
    }
  };

  const handleVatChange = (e) => {
    let str = e.target.value;
    str = str.replace(/\s/g, "");
    setVatStr(str);
  };

  const onOverride = () => {
    setVatNumber(vatStr);
  };

  return (
    <div className="w-full flex flex-col">
      {message && (
        <div className="pb-4">
          <Notification boldText={message} success />
        </div>
      )}
      {errorMessage && (
        <div className="pb-2">
          <Notification boldText={errorMessage} />
        </div>
      )}
      <div className="flex-1 w-full flex flex-row gap-x-2">
        <div className="flex-grow">
          <input
            className="h-full tracking-normal focus:outline-none focus:bg-white appearance-none block w-full bg-white text-gray-700 border border-primary rounded-lg py-3 px-4 leading-tight"
            name="vatNumber"
            placeholder="VAT Number"
            value={vatStr || ""}
            onChange={handleVatChange}
          />
        </div>
        <div className="flex-initial flex flex-col">
          <Button
            fullWidth
            color="primary"
            variant="contained"
            disabled={processing}
            onClick={onValidate}
            className="h-full"
          >
            Validate
          </Button>
          {errorMessage && (
            <Button
              fullWidth
              color="secondary"
              variant="contained"
              onClick={onOverride}
              className="h-full"
            >
              Override
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
