import React from "react";
import { isNil } from "lodash";
import { Typography } from "@mui/material";

export default function ShowAttribute({ title, value }) {
  return (
    <div className="flex flex-row my-1">
      <div className="px-3 py-2 w-48">
        <Typography>{title}</Typography>
      </div>
      <div className="bg-gray-100 px-3 py-1 rounded flex flex-col justify-center w-full">
        <Typography>
          {isNil(value) ? <span className="text-gray-500">Unkown</span> : value}
        </Typography>
      </div>
    </div>
  );
}
