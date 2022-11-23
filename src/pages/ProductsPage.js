import React from "react";
import { Wrapper, Table } from "../components/admin";
import { Button, TableCell, TableRow, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { formatPrice } from "../lib/currency";

export default function ProductsPage() {
  return (
    <Wrapper>
      <div className="flex flex-row justify-between">
        <div className="flex-1">
          <Typography variant="h2">Products</Typography>
        </div>
      </div>
      <Table
        url={"/products"}
        paginationKey={"products"}
        customTableRow={orderRow}
      />
    </Wrapper>
  );
}

function orderRow({ euro, row }) {
  return (
    <TableRow key={row.id} component={Link} to={`/products/${row.id}`}>
      <TableCell component="th" scope="row">
        {row.name}
      </TableCell>
      <TableCell style={{ width: 160 }} align="right">
        {formatPrice(row.price, row.currency)}
      </TableCell>
    </TableRow>
  );
}
