import React from "react";
import { Wrapper } from "../components/admin";
import { Paper } from "@mui/material";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";

import { useApiFetch } from "../hooks/api";

export default function AdminPage() {
  return (
    <Wrapper>
      <Paper className="my-6">
        <MonthTotals />
      </Paper>
      <Paper className="my-6">
        <MatTypeTotals />
      </Paper>
      <Paper className="my-6">
        <StripeMonthTotals />
      </Paper>
    </Wrapper>
  );
}

function MonthTotals() {
  const { data, loading } = useApiFetch({
    url: `/meta_data/sold_by_month`,
  });
  if (loading) {
    return (
      <Wrapper>
        <p>Loading</p>
      </Wrapper>
    );
  }
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthTotal = data
    .map((row) => {
      const date = new Date(row.month);
      return {
        total: row.total,
        month: month[date.getMonth()],
        monthInt: date.getMonth(),
      };
    })
    .sort((a, b) => a.monthInt - b.monthInt);
  const currentYear = new Date().getFullYear();
  return (
    <Chart data={monthTotal} size={{ width: "100%", height: "75%" }}>
      <ArgumentAxis />
      <ValueAxis />
      <BarSeries valueField="total" argumentField="month" />
      <Title text={`Totals By Month for ${currentYear}`} />
      <Animation name="Mats Sold by month 2022" />
    </Chart>
  );
}

function MatTypeTotals() {
  const { data, loading } = useApiFetch({
    url: `/meta_data/sold_by_mat_type`,
  });
  if (loading) {
    return (
      <Wrapper>
        <p>Loading</p>
      </Wrapper>
    );
  }
  const currentYear = new Date().getFullYear();
  return (
    <Chart data={data} size={{ width: "100%", height: "75%" }}>
      <ArgumentAxis />
      <ValueAxis />
      <BarSeries valueField="total" argumentField="matType" />
      <Title text={`Totals By Mat Type for ${currentYear}`} />
      <Animation
        name="Types of Mats Sold 2022"
        // valueField=""
        // argumentField=""
        // pointComponent
      />
    </Chart>
  );
}

function StripeMonthTotals() {
  const { data, loading } = useApiFetch({
    url: `/meta_data/stripe_month_totals`,
  });
  if (loading) {
    return (
      <Wrapper>
        <p>Loading</p>
      </Wrapper>
    );
  }
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthTotal = data
    .map((row) => {
      const date = new Date(row.month);
      const total = row.stripeCharge - row.stripeFee; // - row.stripeRefund;
      return {
        total: total * 0.01,
        month: month[date.getMonth()],
        monthInt: date.getMonth(),
      };
    })
    .sort((a, b) => a.monthInt - b.monthInt);
  const currentYear = new Date().getFullYear();
  return (
    <Chart data={monthTotal} size={{ width: "100%", height: "75%" }}>
      <ArgumentAxis />
      <ValueAxis />
      <BarSeries valueField="total" argumentField="month" />
      <Title
        text={`Stripe total by month for ${currentYear} (refund not accounted for currently)`}
      />
      <Animation name="Stripe total by month" />
    </Chart>
  );
}
