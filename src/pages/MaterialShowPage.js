import React, { useState, useEffect } from "react";
import { isNil } from "lodash";
import { useParams } from "react-router-dom";
import useAuth from "../contexts/auth";
import { useApiFetch } from "../hooks/api";
import {
  Autocomplete,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { Wrapper, Grouping } from "../components/admin";

export default function MaterialShowPage() {
  const { jwtData } = useAuth();
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
      <div className="flex-1">
        <Typography variant="h2">Material Details</Typography>
      </div>
    </Wrapper>
  );
}
