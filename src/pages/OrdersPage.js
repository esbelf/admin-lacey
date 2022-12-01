import React from "react";
import { Wrapper, Table } from "../components/admin";
import { Button, TableCell, TableRow, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { formatPrice } from "../lib/currency";
import { orderStatus } from "../lib/helper";
import dayjs from "dayjs";

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

function orderRow({ euro, row }) {
  return (
    <TableRow key={row.uid} component={Link} to={`/orders/${row.id}`}>
      <TableCell component="th" scope="row">
        {euro ? row.orderNumber : row.shipstationKey}
      </TableCell>
      <TableCell style={{ width: 200 }} align="right">
        {orderStatus(row.status)}
      </TableCell>
      <TableCell style={{ width: 160 }} align="right">
        {row.siteName}
      </TableCell>
      <TableCell style={{ width: 160 }} align="right">
        {formatPrice(row.totalCents, row.currency)}
      </TableCell>
      <TableCell style={{ width: 160 }} align="right">
        {dayjs(row.orderDate, ["YYYY-MM-DD HH:mm:ss", "DD/MM/YYYY"]).format(
          "DD/MM/YYYY"
        )}
      </TableCell>
    </TableRow>
  );
}
