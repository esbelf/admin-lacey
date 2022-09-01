import React from "react";
import { Wrapper, Table } from "../components/admin";
import { Link } from "react-router-dom";
import { isNil } from "lodash";
import { Button, TableCell, TableRow, Typography } from "@mui/material";

export default function DiscountsPage() {
  return (
    <Wrapper>
      <div className="flex flex-row justify-between">
        <div className="flex-1">
          <Typography variant="h2">Discounts</Typography>
        </div>
        <div className="flex-1 flex flex-row justify-end items-center">
          <Button to="/discounts/new" component={Link} variant="contained">
            Create New Discount
          </Button>
        </div>
      </div>
      <div className="my-5">Search Bar to come</div>
      <Table
        url={"/discounts"}
        paginationKey={"discounts"}
        customTableRow={orderRow}
      />
    </Wrapper>
  );
}

function orderRow({ row }) {
  return (
    <TableRow key={row.id} component={Link} to={`/discounts/${row.id}`}>
      <TableCell component="th" scope="row">
        {row.uid}
      </TableCell>
      <TableCell style={{ width: 160 }} align="right">
        {row.discountType}
      </TableCell>
      <TableCell style={{ width: 160 }} align="right">
        {isNil(row.deletedAt) ? "VALID" : "INVALID"}
      </TableCell>
    </TableRow>
  );
}
