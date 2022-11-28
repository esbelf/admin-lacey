import React from "react";
import { isNil } from "lodash";
import { useParams } from "react-router-dom";
import useAuth from "../contexts/auth";
import { useApiFetch } from "../hooks/api";
import { Button, CircularProgress, Typography } from "@mui/material";
import {
  DeleteButton,
  Wrapper,
  Grouping,
  ShowAttribute,
} from "../components/admin";
import { formatPrice } from "../lib/currency";

export default function DiscountShowPage() {
  const { jwtData } = useAuth();
  const params = useParams();
  const { data: discount, loading } = useApiFetch({
    url: `/discounts/${params.id}`,
  });
  if (loading) {
    return (
      <Wrapper>
        <CircularProgress />
      </Wrapper>
    );
  }

  let amount = discount["discountAmount"];
  if (discount["discountType"] !== "percentage") {
    amount = formatPrice(amount, jwtData["euro"] ? "EUR" : "USD");
  } else {
    amount = `${discount["discountPercentage"]}%`;
  }
  return (
    <Wrapper>
      <div className="flex-1">
        <Typography variant="h2">Order Detail</Typography>
      </div>
      <Grouping>
        <ShowAttribute title={"KEY"} value={discount["uid"]} />
        <ShowAttribute title={"Description"} value={discount["description"]} />
        <ShowAttribute title={"Type"} value={discount["discountType"]} />
        <ShowAttribute title={"Amount"} value={amount} />
        <ShowAttribute
          title={"Min Total Amount"}
          value={formatPrice(
            discount["minTotalAmountCents"],
            jwtData["euro"] ? "EUR" : "USD"
          )}
        />
        <ShowAttribute
          title={"Valid"}
          value={isNil(discount["deletedAt"]) ? "VALID" : "INVALID"}
        />
      </Grouping>
      <div className="flex-1">
        <DeleteButton
          endpoint={`/discounts/${params.id}`}
          redirect={"/discounts"}
        />
      </div>
    </Wrapper>
  );
}
