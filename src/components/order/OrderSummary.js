import React, { useState } from "react";
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import useOrder from "../../contexts/order";
import { formatPrice, priceBreakDown } from "../../lib/currency";

export default function OrderSummary() {
  const { cart, discountCode, shippingAddress } = useOrder();

  const { subtotal, shippingTotal, discount, salesTax, total } = priceBreakDown(
    { cart, discountCode, shippingAddress }
  );

  // console.log("subtotal", subtotal);
  // console.log("shippingTotal", shippingTotal);
  // console.log("discount", discount);
  // console.log("salesTax", salesTax);
  // console.log("total", total);

  return (
    <div>
      <div className="flex flex-row gap-x-2">
        <div>
          <Typography>Subtotal</Typography>
        </div>
        <div>
          <Typography>{formatPrice(subtotal)}</Typography>
        </div>
      </div>
      <div className="flex flex-row gap-x-2">
        <div>
          <Typography>Shipping Total</Typography>
        </div>
        <div>
          <Typography>{formatPrice(shippingTotal)}</Typography>
        </div>
      </div>
      <div className="flex flex-row gap-x-2">
        <div>
          <Typography>Sales Tax (VAT)</Typography>
        </div>
        <div>
          <Typography>{formatPrice(salesTax)}</Typography>
        </div>
      </div>
      <div className="flex flex-row gap-x-2">
        <div>
          <Typography>Total</Typography>
        </div>
        <div>
          <Typography>{formatPrice(total)}</Typography>
        </div>
      </div>
    </div>
  );
}
