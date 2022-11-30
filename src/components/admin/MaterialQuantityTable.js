import React from "react";
import Table from "./Table";
import { TableCell, TableRow } from "@mui/material";
import dayjs from "dayjs";
import Grouping from "./Grouping";

export default function MaterialQuantityTable({ materialId }) {
  return (
    <div className="flex flex-col">
      <Grouping title="Additions">
        <Table
          url={`/materials/${materialId}/material_additions`}
          paginationKey={"additions"}
          customTableRow={MaterialAdditionRow}
        />
      </Grouping>
      <Grouping title="Subtractions">
        <Table
          url={`/materials/${materialId}/material_subtractions`}
          paginationKey={"subtractions"}
          customTableRow={MaterialSubtractionRow}
        />
      </Grouping>
    </div>
  );
}

function MaterialAdditionRow({ euro, row }) {
  return (
    <TableRow key={row.id}>
      <TableCell component="th" scope="row">
        {dayjs(row.createdAt).format("DD/MM/YYYY")}
      </TableCell>
      <TableCell style={{ width: 160 }} align="right">
        {row.quantity}
      </TableCell>
      <TableCell style={{ width: 160 }} align="right">
        {row.name}
      </TableCell>
      <TableCell style={{ width: 160 }} align="right">
        {row.user}
      </TableCell>
      <TableCell style={{ width: 160 }} align="right">
        {row.title}
      </TableCell>
    </TableRow>
  );
}

function MaterialSubtractionRow({ euro, row }) {
  return (
    <TableRow key={row.id}>
      <TableCell component="th" scope="row">
        {dayjs(row.createdAt).format("DD/MM/YYYY")}
      </TableCell>
      <TableCell style={{ width: 160 }} align="right">
        -{row.quantity}
      </TableCell>
      <TableCell style={{ width: 160 }} align="right">
        {row.name}
      </TableCell>
      <TableCell style={{ width: 160 }} align="right">
        {row.description}
      </TableCell>
    </TableRow>
  );
}
