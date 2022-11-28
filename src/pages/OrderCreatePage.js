import React, { useState } from "react";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";
import { StripeWrapper, ValidateVAT } from "../components";
import { Wrapper } from "../components/admin";
import {
  AddressForm,
  BlankOrder,
  ContactDetailForm,
  DiscountForm,
  OrderSummary,
  ProductForm,
  StripeCreditCardCheckout,
  StripeCurrencyCodes,
  StripeInvoice,
} from "../components/order";
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
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
    contactDetails,
    setContactDetails,
    vatNumber,
    setVatNumber,
    shippingCost,
    setShippingCost,
    currency,
    setCurrency,
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
            <ContactDetailForm
              contactDetails={contactDetails}
              setContactDetails={setContactDetails}
            />
          </FormBlock>

          <FormBlock title="Shipping Address">
            <AddressForm
              type={"shipping"}
              setAddress={setShippingAddress}
              address={shippingAddress}
            />
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

          <FormBlock title="Products">
            <ProductForm />
          </FormBlock>

          <FormBlock title="Discounts">
            <DiscountForm />
          </FormBlock>

          <FormBlock title="Meta Details">
            <div className="flex-1">
              <ValidateVAT />
            </div>
            <div className="flex-1 mt-4 flex flex-row">
              <div className="flex-grow">
                <StripeCurrencyCodes
                  name="currency"
                  value={currency}
                  onChange={(obj) => setCurrency(obj.value)}
                />
              </div>
            </div>
            <div className="flex-1 mt-4">
              <TextField
                label="Shipping"
                variant="outlined"
                value={shippingCost}
                onChange={(e) => {
                  const newValue = e.target.value;
                  if (newValue >= 0) {
                    setShippingCost(parseInt(e.target.value));
                  }
                }}
                fullWidth
                type="number"
                helperText={"Amount in cents"}
              />
            </div>
          </FormBlock>

          {!isEmpty(cart) && (
            <FormBlock title="Order Summary">
              <OrderSummary />
            </FormBlock>
          )}

          <FormBlock title="Create Invoice">
            <StripeInvoice />
          </FormBlock>

          <div className="flex-1">
            <Typography variant="h4">OR</Typography>
          </div>

          <FormBlock title="Charge Customer">
            <StripeCreditCardCheckout />
          </FormBlock>

          <div className="flex-1">
            <Typography variant="h4">OR</Typography>
          </div>

          <FormBlock title="Create Blank Order for accounting reasons">
            <BlankOrder />
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
