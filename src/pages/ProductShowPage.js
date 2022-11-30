import React, { useState } from "react";
import { isNil } from "lodash";
import { useParams } from "react-router-dom";
import useAuth from "../contexts/auth";
import useNotification from "../contexts/notification";
import { useApiFetch } from "../hooks/api";
import { saveCall } from "../lib/api";
import { formatPrice } from "../lib/currency";
import {
  Autocomplete,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import {
  ProductMaterials,
  ProductVarietyEdit,
  Wrapper,
  Grouping,
  ShowAttribute,
} from "../components/admin";

export default function ProductShowPage() {
  const { authToken } = useAuth();
  const { setErrorMessage, setSuccessMessage } = useNotification();
  const params = useParams();
  const { data: product, loading } = useApiFetch({
    url: `/products/${params.id}`,
  });

  if (loading) {
    return (
      <Wrapper>
        <CircularProgress />
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="flex-1">
        <Typography variant="h2">Product Detail</Typography>
      </div>
      <Grouping title="Basic Details">
        <ShowAttribute title={"Name"} value={product.name} />
        <ShowAttribute title={"Size"} value={product.size} />
        <ShowAttribute title={"Version"} value={product.version} />
        <ShowAttribute title={"Length"} value={product.length} />
        <ShowAttribute title={"Width"} value={product.width} />
        <ShowAttribute title={"Mat Type"} value={product.matType} />
      </Grouping>
      <Grouping title="Pricing">
        <ProductVarietyEdit
          productId={product.id}
          currentPriceCents={product.price}
          currentPriceCurrency={product.currency}
          currentListPriceCents={product.listPrice}
          currentListPriceCurrency={product.listCurrency}
        />
      </Grouping>
      <Grouping title="Materials">
        <ProductMaterials productId={product.id} />
      </Grouping>
    </Wrapper>
  );
}
