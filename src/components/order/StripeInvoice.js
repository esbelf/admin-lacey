import React, { useState } from "react";

import { Button, Typography } from "@mui/material";
import useAuth from "../../contexts/auth";
import useOrder from "../../contexts/order";
import { useNavigate } from "react-router-dom";
import { saveCall } from "../../lib/api";

export default function StripeInvoice() {
  const { generateStripeBaseParams, validateOrderParams } = useOrder();
  const { authToken } = useAuth();
  const [generatingInvoice, setGeneratingInvoice] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const onCreateInvoice = async () => {
    if (!validateOrderParams()) {
      return;
    }
    setGeneratingInvoice(true);
    try {
      const data = generateStripeBaseParams();
      const response = await saveCall({
        endpoint: "/orders/create_invoice",
        authToken,
        data,
      });
      const orderId = response.data.orderId;
      navigate(`/orders/${orderId}`);
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message);
    }
    setGeneratingInvoice(false);
  };

  return (
    <div className="flex flex-col">
      <div className="flex-1">
        <Button
          variant="contained"
          fullWidth
          onClick={onCreateInvoice}
          disable={generatingInvoice.toString()}
        >
          <Typography variant="h6">Generate</Typography>
        </Button>
      </div>
      {errorMessage && <div className="flex-1">{errorMessage}</div>}
    </div>
  );
}
