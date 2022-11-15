import React from "react";
import { Wrapper } from "../components/admin";
import { Paper } from "@mui/material";
import {
  Chart,
  PieSeries,
  Title,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";
import { useApiFetch } from "../hooks/api";
import { isNil } from "lodash";

export default function AdminPage() {
  // const { data: orders, loading } = useApiFetch({ url: `/orders/pie_chart` });
  const orders = [];
  const loading = false;

  if (loading) {
    return (
      <Wrapper>
        <p>Loading</p>
      </Wrapper>
    );
  }

  const totalByMatType = calculateTotalByMatType(orders);
  return (
    <Wrapper>
      <Paper>
        <Chart data={totalByMatType}>
          <PieSeries valueField="quantity" argumentField="mat_type" />
          <Title text="Totals By Mat Type" />
          <Animation />
        </Chart>
      </Paper>
    </Wrapper>
  );
}

function calculateTotalByMatType(orders) {
  const data = {};
  orders.forEach((order) => {
    // order.order_line_items.forEach((item) => {
    //   if (isNil(data[item.sku])) {
    //     data[item.sku] = 0;
    //   }
    //   data[item.sku] += item.quantity;
    // });
  });
  return [];
}
