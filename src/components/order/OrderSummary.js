import React, { useState } from "react";
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { isNil } from "lodash";
import useAuth from "../../contexts/auth";
import useOrder from "../../contexts/order";
import { formatPrice, priceBreakDown } from "../../lib/currency";

export default function OrderSummary() {
  const { jwtData } = useAuth();
  const { cart, discountCode, shippingAddress } = useOrder();

  const { subtotal, shippingTotal, discount, salesTax, total } = priceBreakDown(
    { cart, discountCode, shippingAddress }
  );

  const currency = jwtData["euro"] ? "EUR" : "USD";

  return (
    <div>
      <div className="flex flex-row gap-x-2">
        <LineItem title={"Subtotal"} value={formatPrice(subtotal, currency)} />
      </div>
      <div className="flex flex-row gap-x-2">
        <LineItem
          title={"Discount"}
          value={formatPrice(discount || 0, currency)}
          red
        />
      </div>
      <div className="flex flex-row gap-x-2">
        <LineItem
          title={jwtData["euro"] ? "VAT" : "Sales Tax"}
          value={formatPrice(salesTax, currency)}
        />
      </div>
      <div className="flex flex-row gap-x-2">
        <LineItem
          title="Shipping Total"
          value={formatPrice(shippingTotal, currency)}
        />
      </div>

      <div className="flex flex-row gap-x-2">
        <LineItem title={"Total"} value={formatPrice(total, currency)} />
      </div>
    </div>
  );
}

function LineItem({ title, value, red }) {
  return (
    <div className="flex flex-row my-1 w-full">
      <div className="px-3 py-2 w-72">
        <Typography className={red === true && "text-red-500"}>
          {title}
        </Typography>
      </div>
      <div className="bg-gray-100 px-3 py-1 rounded flex flex-col justify-center w-full">
        <Typography className={red === true && "text-red-500"}>
          {isNil(value) ? <span className="text-gray-500">Unkown</span> : value}
        </Typography>
      </div>
    </div>
  );
}
