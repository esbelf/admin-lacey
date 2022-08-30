import React, { useState } from "react";
import { Wrapper } from "../components/admin";
import {
  AddressForm,
  ContactDetailForm,
  ProductForm,
} from "../components/order";
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import useAuth from "../contexts/auth";
import useOrder from "../contexts/order";
import { formatPrice } from "../lib/currency";

function OrderCreatePage() {
  const {
    billingAddressIsDifferent,
    setBillingAddressIsDifferent,
    billingAddress,
    setBillingAddress,
    shippingAddress,
    setShippingAddress,
  } = useOrder();

  console.log("billingAddressIsDifferent", billingAddressIsDifferent);

  return (
    <Wrapper>
      <div className="mt-4">
        <Typography variant="h2">Place New Order</Typography>
      </div>
      <div className="flex flex-wrap flex-col max-w-xl">
        <FormBlock title="Customer">
          <ContactDetailForm />
        </FormBlock>

        <FormBlock title="Shipping Address">
          <AddressForm
            type={"shipping"}
            setAddress={setShippingAddress}
            address={shippingAddress}
          />
        </FormBlock>

        <FormBlock title="Products">
          <ProductForm />
        </FormBlock>

        <FormBlock title="Billing Address">
          <FormControlLabel
            control={
              <Checkbox
                checked={!billingAddressIsDifferent}
                onChange={(e) => {
                  setBillingAddressIsDifferent(!e.target.checked);
                }}
                name="billingAddressIsDifferent"
              />
            }
            label="Same as shipping address"
          />
          {billingAddressIsDifferent && (
            <AddressForm
              type={"billing"}
              setAddress={setBillingAddress}
              address={billingAddress}
            />
          )}
        </FormBlock>

        <FormBlock title="Payment"></FormBlock>
      </div>
    </Wrapper>
  );
}

export default OrderCreatePage;

function FormBlock({ title, children }) {
  return (
    <div className="flex-1 flex flex-col my-5 min-w-fit">
      <div className="mb-1">
        <Typography variant="h5" className="text-blue-400">
          {title}
        </Typography>
      </div>
      <div className="border rounded border-blue-400 p-4">{children}</div>
    </div>
  );
}
