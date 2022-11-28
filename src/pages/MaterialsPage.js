import React from "react";
import { Wrapper, Table } from "../components/admin";
import { Button, TableCell, TableRow, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { formatPrice } from "../lib/currency";

export default function MaterialsPage() {
  return (
    <Wrapper>
      <div className="flex flex-row justify-between">
        <div className="flex-1">
          <Typography variant="h2">Materials</Typography>
        </div>
        <div className="flex-1 flex flex-row justify-end items-center">
          <Button to="/materials/new" component={Link} variant="contained">
            Create a new material
          </Button>
        </div>
      </div>
      <Table
        url={"/materials"}
        paginationKey={"materials"}
        customTableRow={orderRow}
      />
    </Wrapper>
  );
}

function orderRow({ euro, row }) {
  return (
    <TableRow key={row.id} component={Link} to={`/materials/${row.id}`}>
      <TableCell component="th" scope="row">
        {row.name}
      </TableCell>
    </TableRow>
  );
}
