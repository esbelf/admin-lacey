import React, { useState } from "react";
import { isNil } from "lodash";
import { Wrapper, Table } from "../components/admin";
import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import { useApiFetch } from "../hooks/api";
import useAuth from "../contexts/auth";
import { formatPrice } from "../lib/currency";

const type = "billing";

function OrderCreatePage() {
  const [selectedProduct, setSelectedProduct] = useState();
  const [productsInCart, setProductsInCart] = useState({});

  const { jwtData } = useAuth();
  const { data: products } = useApiFetch({ url: "/products" });
  const productOptions = products
    .filter((product) => product.euro === jwtData["euro"])
    .map((product) => ({ label: product.name, value: product }));

  const handleProductSelect = (event, newValue) => {
    setSelectedProduct(newValue["value"]);
  };

  const addProduct = () => {
    if (!isNil(selectedProduct)) {
      if (isNil(productsInCart[selectedProduct.sku])) {
        productsInCart[selectedProduct.sku] = {
          product: selectedProduct,
          quantity: 1,
        };
      }
      setProductsInCart({ ...productsInCart });
    }
  };

  const handleQuantityChange = (sku) => (event) => {
    const newQuantity = event.target.value;
    if (newQuantity <= 0) {
      delete productsInCart[sku];
    } else {
      productsInCart[sku].quantity = newQuantity;
    }
    setProductsInCart({ ...productsInCart });
  };

  return (
    <Wrapper>
      <div className="mt-4">
        <Typography variant="h2">Place New Order</Typography>
      </div>
      <div className="flex flex-wrap flex-col max-w-xl">
        <FormBlock title="Customer">
          <div className="flex flex-col justify-start gap-y-2 ">
            <div className="flex flex-row justify-start gap-x-2">
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                fullWidth
              />
              <TextField
                id="phone"
                label="Phone Number"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="flex flex-row justify-start gap-x-2">
              <TextField
                id="first_name"
                label="First Name"
                variant="outlined"
                fullWidth
              />
              <TextField
                id="last_name"
                label="Last Name"
                variant="outlined"
                fullWidth
              />
            </div>
          </div>
        </FormBlock>

        <FormBlock title="Billing Address">
          <div className="flex flex-col gap-y-2">
            <div className="flex flex-row justify-start gap-x-2">
              <TextField
                id={`${type}_first_name`}
                label="First Name"
                variant="outlined"
                fullWidth
              />
              <TextField
                id={`${type}_last_name`}
                label="Last Name"
                variant="outlined"
                fullWidth
              />
            </div>
            <TextField
              id={`${type}_company_name`}
              label="Company Name"
              variant="outlined"
              fullWidth
            />
            <TextField
              id={`${type}_address_line_1`}
              label="Address Line 1"
              variant="outlined"
              fullWidth
            />
            <TextField
              id={`${type}_address_line_2`}
              label="Address Line 2"
              variant="outlined"
              fullWidth
            />
            <div className="flex flex-row justify-start gap-x-2">
              <TextField
                id={`${type}_city`}
                label="City"
                variant="outlined"
                fullWidth
              />
              <TextField
                id={`${type}_postal_code`}
                label="Postal Code"
                variant="outlined"
                fullWidth
              />
            </div>
            <TextField
              id={`${type}_state`}
              label="State"
              variant="outlined"
              fullWidth
            />
            <TextField
              id={`${type}_country`}
              label="Country"
              variant="outlined"
              fullWidth
            />
          </div>
        </FormBlock>

        <FormBlock title="Products">
          <div className="w-full flex flex-row gap-x-2">
            <Autocomplete
              fullWidth
              id="product-search"
              freeSolo
              options={productOptions}
              renderInput={(params) => (
                <TextField {...params} label="Find Product" />
              )}
              onChange={handleProductSelect}
            />
            <Button variant="contained" onClick={addProduct}>
              Add
            </Button>
          </div>

          <div className="flex flex-col w-full">
            {Object.values(productsInCart).map(({ product, quantity }) => (
              <ProductLineItem
                key={product.sku}
                product={product}
                quantity={quantity}
                handleQuantityChange={handleQuantityChange}
              />
            ))}
          </div>
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

function ProductLineItem({ handleQuantityChange, product, quantity }) {
  return (
    <div className="flex flex-row my-5">
      <div className="flex-grow flex flex-col justify-center">
        <Typography variant="h6">{product.name}</Typography>
      </div>
      <div className="flex-1">
        <TextField
          id="product-quantity"
          label="Quantity"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleQuantityChange(product.sku)}
          value={quantity}
        />
      </div>
      <div className="flex-1 flex flex-col justify-center items-end">
        <Typography variant="h6">
          {formatPrice(product.price * quantity)}
        </Typography>
      </div>
    </div>
  );
}
