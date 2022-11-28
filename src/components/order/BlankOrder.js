import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import useAuth from "../../contexts/auth";
import useOrder from "../../contexts/order";
import { useNavigate } from "react-router-dom";
import { saveCall } from "../../lib/api";

export default function BlankOrder() {
  const { generateStripeBaseParams, validateOrderParams } = useOrder();
  const { authToken } = useAuth();
  const [creatingOrder, setCreatingOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const onCreateOrder = async () => {
    if (!validateOrderParams()) {
      return;
    }
    setCreatingOrder(true);
    try {
      const data = generateStripeBaseParams();
      const response = await saveCall({
        endpoint: "/orders/create_blank",
        authToken,
        data,
      });
      const orderId = response.data.orderId;
      navigate(`/orders/${orderId}`);
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message);
    }
    setCreatingOrder(false);
  };

  return (
    <div className="flex flex-col">
      <div className="flex-1">
        <Button
          variant="contained"
          fullWidth
          onClick={onCreateOrder}
          disable={creatingOrder.toString()}
        >
          <Typography variant="h6">Generate Blank Order</Typography>
        </Button>
      </div>
      {errorMessage && <div className="flex-1">{errorMessage}</div>}
    </div>
  );
}
