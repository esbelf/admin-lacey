import React, { useState, useEffect } from "react";
import { isNil } from "lodash";
import { useParams, Link } from "react-router-dom";
import useAuth from "../contexts/auth";
import { useApiFetch } from "../hooks/api";
import {
  Autocomplete,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import {
  Wrapper,
  Grouping,
  ShowAttribute,
  ShowEditAttribute,
} from "../components/admin";

export default function MaterialShowPage() {
  const { jwtData } = useAuth();
  const params = useParams();
  const { data: material, loading } = useApiFetch({
    url: `/materials/${params.id}`,
  });
  const { data: materialAdditions } = useApiFetch({
    url: `/materials/${params.id}/material_additions`,
  });
  const { data: materialSubtractions } = useApiFetch({
    url: `/materials/${params.id}/material_subtractions`,
  });

  if (loading) {
    return (
      <Wrapper>
        <CircularProgress />
      </Wrapper>
    );
  }
  console.log("material", material);
  console.log("materialSubtractions", materialSubtractions);
  console.log("materialAdditions", materialAdditions);
  return (
    <Wrapper>
      <div className="flex flex-row justify-between">
        <div className="flex-1">
          <Typography variant="h2">Material</Typography>
        </div>
        <div className="flex-1 flex flex-row justify-end items-center">
          <Button
            to={`/materials/${params.id}/additions`}
            component={Link}
            variant="contained"
          >
            Add material inventory
          </Button>
        </div>
      </div>
      <div className="flex-1">
        <ShowAttribute title={"Name"} value={material["name"]} />
        <ShowAttribute title={"Inventory"} value={material["inventory"]} />
        <ShowEditAttribute
          title={"Notification Quantity"}
          value={material.notification_quantity}
        />
      </div>
      <div className="flex-1"></div>
    </Wrapper>
  );
}
