import React from "react";
import PropTypes from "prop-types";
import { Wrapper, Table } from "../components/admin";
import { Button, TableCell, TableRow, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function OrdersPage() {
  return (
    <Wrapper>
      <div className="flex flex-row justify-between">
        <div className="flex-1">
          <Typography variant="h2">Orders</Typography>
        </div>
        <div className="flex-1 flex flex-row justify-end items-center">
          <Button to="/orders/new" component={Link} variant="contained">
            Place New Order
          </Button>
        </div>
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
