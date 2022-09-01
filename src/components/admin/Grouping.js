import React from "react";
import { Typography } from "@mui/material";

export default function Grouping({ title, children }) {
  return (
    <div className="flex flex-col mt-2">
      <div className="flex">
        <Typography variant="h5">{title}</Typography>
      </div>
      <div className="flex flex-col w-full my-1 min-w-fit border rounded border-blue-400 p-3">
        {children}
      </div>
    </div>
  );
}
