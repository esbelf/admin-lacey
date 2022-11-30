import React from "react";
import { useParams, Link } from "react-router-dom";
import { useApiFetch } from "../hooks/api";
import { Button, CircularProgress, Typography } from "@mui/material";
import {
  Wrapper,
  ShowAttribute,
  ShowEditAttribute,
  MaterialQuantityTable,
} from "../components/admin";

export default function MaterialShowPage() {
  const params = useParams();
  const { data: material, loading } = useApiFetch({
    url: `/materials/${params.id}`,
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
      <div className="flex-1">
        <MaterialQuantityTable materialId={material.id} />
      </div>
    </Wrapper>
  );
}
