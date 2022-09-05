import React from "react";
import { Wrapper, Table } from "../components/admin";
import { Button, TableCell, TableRow, Typography } from "@mui/material";

export default function AdminDealersPage() {
  return (
    <Wrapper>
      <div className="flex flex-row justify-between">
        <div className="flex-1">
          <Typography variant="h2">Dealers</Typography>
        </div>
      </div>
      <Table
        url={"/dealers"}
        paginationKey={"dealers"}
        customTableRow={dealerRow}
      />
    </Wrapper>
  );
}

function dealerRow({ row }) {
  return (
    <TableRow key={row.id}>
      <TableCell component="th" scope="row">
        {row.email}
      </TableCell>
      <TableCell style={{ width: 160 }} align="right">
        {row.name}
      </TableCell>
      <TableCell style={{ width: 160 }} align="right">
        {row.phoneNumber}
      </TableCell>
    </TableRow>
  );
}
