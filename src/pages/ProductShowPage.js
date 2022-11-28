import React, { useState } from "react";
import { isNil } from "lodash";
import { useParams } from "react-router-dom";
import useAuth from "../contexts/auth";
import { useApiFetch } from "../hooks/api";
import { formatPrice } from "../lib/currency";
import {
  Autocomplete,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { Wrapper, Grouping, ShowAttribute } from "../components/admin";

export default function ProductShowPage() {
  const { jwtData } = useAuth();
  const params = useParams();
  const { data: product, loading } = useApiFetch({
    url: `/products/${params.id}`,
  });

  const { data } = useApiFetch({ url: "/materials" });
  const materials = data.materials || [];
  const materialOptions = materials
    .filter((material) => material.euro === jwtData["euro"])
    .map((material) => ({ label: material.name, value: material }));

  const [selectedMaterial, setSelectedMaterial] = useState({});

  const handleMaterialSelect = (event, newValue) => {
    // setMaterialSelect(newValue["value"]);
  };

  const addMaterial = () => {
    if (!isNil(selectedMaterial)) {
      // setCartProductQuantity({ product: selectedMaterial, quantity: 1 });
    }
  };

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
      <Grouping>
        <ShowAttribute
          title={"Price"}
          value={formatPrice(product.price, product.currency)}
        />
      </Grouping>
      <Grouping>
        <div className="w-full flex flex-row gap-x-2">
          <Autocomplete
            fullWidth
            id="material-search"
            freeSolo
            options={materialOptions}
            renderInput={(params) => (
              <TextField {...params} label="Find Material" />
            )}
            onChange={handleMaterialSelect}
          />
          <Button variant="contained" onClick={addMaterial}>
            Add
          </Button>
        </div>
      </Grouping>
    </Wrapper>
  );
}
