import React from "react";
import PropTypes from "prop-types";
import { Wrapper, Table } from "../components/admin";
import { TableCell, TableRow, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function OrdersPage() {
  return (
    <Wrapper>
      <div>
        <Typography variant="h1">Orders</Typography>
      </div>
      <Table
        url={"/orders"}
        paginationKey={"orders"}
        customTableRow={orderRow}
      />
    </Wrapper>
  );
}

function orderRow({ row }) {
  console.log("row", row);
  return (
    <TableRow key={row.uid} component={Link} to={`/orders/${row.id}`}>
      <TableCell component="th" scope="row">
        {row.uid}
      </TableCell>
      <TableCell style={{ width: 160 }} align="right">
        {row.status}
      </TableCell>
      <TableCell style={{ width: 160 }} align="right">
        {row.totalCents}
      </TableCell>
    </TableRow>
  );
}
