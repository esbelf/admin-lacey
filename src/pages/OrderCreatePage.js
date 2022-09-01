import React, { useState } from "react";
import { isEmpty } from "lodash";
import { StripeWrapper } from "../components";
import { Wrapper } from "../components/admin";
import {
  AddressForm,
  ContactDetailForm,
  OrderSummary,
  ProductForm,
  StripeCreditCardCheckout,
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
    cart,
  } = useOrder();
  const { jwtData } = useAuth();

  return (
    <StripeWrapper euro={jwtData["euro"] === true}>
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

          {!isEmpty(cart) && (
            <FormBlock title="Order Summary">
              <OrderSummary />
            </FormBlock>
          )}

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

          <FormBlock title="Payment">
            <StripeCreditCardCheckout />
          </FormBlock>
        </div>
      </Wrapper>
    </StripeWrapper>
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
