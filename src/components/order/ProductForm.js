import React, { useEffect, useState } from "react";
import { isNil } from "lodash";
import {
  Autocomplete,
  Button,
  Checkbox,
  TextField,
  Typography,
} from "@mui/material";
import useAuth from "../../contexts/auth";
import useOrder from "../../contexts/order";
import { useApiFetch } from "../../hooks/api";
import { formatPrice } from "../../lib/currency";

export default function ProductForm({}) {
  const { jwtData } = useAuth();
  const { cart, setCartProductQuantity } = useOrder();
  const { data: products } = useApiFetch({ url: "/products" });

  useEffect(() => {
    setSelectedProduct(null);
  }, [jwtData]);

  const [selectedProduct, setSelectedProduct] = useState();

  const productOptions = products
    .filter((product) => product.euro === jwtData["euro"])
    .map((product) => ({ label: product.name, value: product }));

  const handleProductSelect = (event, newValue) => {
    setSelectedProduct(newValue["value"]);
  };

  const addProduct = () => {
    if (!isNil(selectedProduct)) {
      setCartProductQuantity({ product: selectedProduct, quantity: 1 });
    }
  };

  const handleQuantityChange = (product) => (event) => {
    const newQuantity = event.target.value;
    setCartProductQuantity({ product, quantity: newQuantity });
  };

  return (
    <React.Fragment>
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
        {Object.values(cart).map(({ product, quantity }) => (
          <ProductLineItem
            key={product.sku}
            product={product}
            quantity={quantity}
            handleQuantityChange={handleQuantityChange}
          />
        ))}
      </div>
    </React.Fragment>
  );
}

function ProductLineItem({ handleQuantityChange, product, quantity }) {
  const currency = product.euro ? "EUR" : "USD";
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
          onChange={handleQuantityChange(product)}
          value={quantity}
        />
      </div>
      <div className="flex-1 flex flex-col justify-center items-end">
        <Typography variant="h6">
          {formatPrice(product.price * quantity, currency)}
        </Typography>
      </div>
    </div>
  );
}
