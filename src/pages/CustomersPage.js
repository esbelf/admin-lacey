import React from "react";
import { Wrapper, Table } from "../components/admin";
import { Button, TableCell, TableRow, Typography } from "@mui/material";

export default function CustomersPage() {
  return (
    <Wrapper>
      <div className="flex flex-row justify-between">
        <div className="flex-1">
          <Typography variant="h2">Customers</Typography>
        </div>
      </div>
      <Table
        url={"/customers"}
        paginationKey={"customers"}
        customTableRow={customerRow}
      />
    </Wrapper>
  );
}

function customerRow({ row }) {
  return (
    <TableRow key={row.id}>
      <TableCell component="th" scope="row">
        {row.email}
      </TableCell>
      <TableCell style={{ width: 160 }} align="right">
        {row.fullName}
      </TableCell>
      <TableCell style={{ width: 160 }} align="right">
        {row.phoneNumber}
      </TableCell>
    </TableRow>
  );
}
