import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useApiFetch } from "../hooks/api";
import { Wrapper, ShowAttribute, Grouping } from "../components/admin";
import { Button, CircularProgress, Typography } from "@mui/material";
import { formatPrice } from "../lib/currency";
import { ContactDetailForm } from "../components/order";

function OrderEditPage() {
  const params = useParams();
  const { data, loading } = useApiFetch({ url: `/orders/${params.id}` });
  const [order, setOrder] = useState(data);

  const updateOrder = (orderData) => {
    setOrder(orderData);
  };

  if (loading) {
    return (
      <Wrapper>
        <CircularProgress />
      </Wrapper>
    );
  }
  console.log("order", order);
  return (
    <Wrapper>
      <div className="flex-1 flex flex-row justify-between">
        <div className="flex-1">
          <Typography variant="h2">Edit Order</Typography>
        </div>
        <div className="flex-1 flex flex-col justify-center items-end">
          <Button variant="contained">Save</Button>
        </div>
      </div>
      <Grouping title={"Customer"}>
        <ContactDetailForm
          contactDetails={order}
          setContactDetails={setOrder}
        />
      </Grouping>
    </Wrapper>
  );
}

export default OrderEditPage;
