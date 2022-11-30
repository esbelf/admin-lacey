import React, { useState } from "react";
import { Button, Typography, TextField } from "@mui/material";
import { saveCall } from "../../lib/api";
import useAuth from "../../contexts/auth";
import useNotification from "../../contexts/notification";
import { useApiFetch } from "../../hooks/api";
import { formatPrice } from "../../lib/currency";
import { ShowAttribute } from "../../components/admin";

export default function ProductVarietyEdit({
  productId,
  currentPriceCents,
  currentPriceCurrency,
  currentListPriceCents,
  currentListPriceCurrency,
}) {
  const { authToken } = useAuth();
  const { setErrorMessage, setSuccessMessage } = useNotification();

  const [price, setPrice] = useState(currentPriceCents);
  const [listPrice, setListPrice] = useState(currentListPriceCents);
  const [loading, setLoading] = useState(false);
  const [editAttribute, setEditAttribute] = useState(false);

  const handleNewVariety = async (e) => {
    e.preventDefault();
    setLoading(true);
    // TODO check if price and list price are positive integers
    const res = await saveCall({
      endpoint: `/products/${productId}/product_varieties`,
      authToken,
      data: {
        price,
        listPrice,
      },
    });
    console.log(res);
    setSuccessMessage("Successfully created new product variety");
    setLoading(false);
  };

  return (
    <div className="flex flex-row">
      {editAttribute ? (
        <div className="flex flex-row gap-x-6">
          <TextField
            id={"Price"}
            label="Price"
            variant="outlined"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            id={"List Price"}
            label="List Price"
            variant="outlined"
            fullWidth
            value={listPrice}
            onChange={(e) => setListPrice(e.target.value)}
            type="number"
          />
          <div className="flex-1">
            <Button
              disabled={loading}
              variant="outlined"
              color="primary"
              onClick={handleNewVariety}
              className="h-full"
            >
              Save
            </Button>
          </div>
          <div className="flex-1">
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setEditAttribute(false)}
              className="h-full"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-row justify-between w-full gap-x-6">
          <div className="flex flex-col flex-1">
            <ShowAttribute
              title={"Actual Price"}
              value={formatPrice(currentPriceCents, currentPriceCurrency)}
            />
            <ShowAttribute
              title={"List Price"}
              value={formatPrice(
                currentListPriceCents,
                currentListPriceCurrency
              )}
            />
          </div>
          <div className="flex-1 flex flex-col justify-end">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setEditAttribute(true)}
              className="h-full"
            >
              Edit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
