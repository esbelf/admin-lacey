import React from "react";
import { useParams } from "react-router-dom";
import { Wrapper, ShowAttribute, Grouping } from "../components/admin";
import { useApiFetch } from "../hooks/api";
import { Button, CircularProgress, Typography } from "@mui/material";
import { formatPrice } from "../lib/currency";

function OrderShowPage() {
  const params = useParams();
  const { data: order, loading } = useApiFetch({ url: `/orders/${params.id}` });
  console.log("order OrderShowPage", order, params.id);

  if (loading) {
    return (
      <Wrapper>
        <CircularProgress />
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="flex-1">
        <Typography variant="h2">Order Detail</Typography>
      </div>
      <Grouping title={"Customer"}>
        <ShowAttribute title={"Email"} value={order["email"]} />
        <ShowAttribute
          title={"Full Name"}
          value={order["customer"]["fullName"]}
        />
        <ShowAttribute
          title={"Phone Number"}
          value={order["customer"]["phoneNumber"]}
        />
      </Grouping>
      <Grouping title={"Receipt"}>
        <ShowAttribute
          title={"Subtotal"}
          value={formatPrice(order["subtotalCents"], order["subtotalCurrency"])}
        />
        <ShowAttribute
          title={"Shipping"}
          value={formatPrice(
            order["shippingCostCents"],
            order["shippingCostCurrency"]
          )}
        />
        <ShowAttribute
          title={"Tax"}
          value={formatPrice(
            order["taxAmountCents"],
            order["taxAmountCurrency"]
          )}
        />
        <ShowAttribute
          title={"Discount"}
          value={formatPrice(
            order["discountAmountCents"],
            order["discountAmountCurrency"]
          )}
        />
        <ShowAttribute
          title={"Total"}
          value={formatPrice(order["totalCents"], order["totalCurrency"])}
        />
      </Grouping>
      <Grouping title={"Products"}>
        {order.orderLineItems.map((item) => (
          <div className="flex flex-row my-2">
            <div className="flex-1 flex flex-col justify-center">
              <Typography variant="h6">{item.product.name}</Typography>
            </div>
            <div className="flex-1 flex flex-row justify-end items-center">
              <Typography variant="h6" className="pr-4">
                ({item.quantity} x{" "}
                {formatPrice(
                  item.product.price,
                  item.product.euro ? "EUR" : "USD"
                )}
                )
              </Typography>
              <Typography variant="h6">
                {formatPrice(
                  item.product.price * item.quantity,
                  item.product.euro ? "EUR" : "USD"
                )}
              </Typography>
            </div>
          </div>
        ))}
      </Grouping>
      <Grouping title={"Shipping Address"}>
        <ShowAttribute
          title={"Adress Name"}
          value={order.shippingAddress.fullName}
        />
        <ShowAttribute
          title={"Address Line 1"}
          value={order.shippingAddress.addressLine1}
        />
        <ShowAttribute
          title={"Address Line 2"}
          value={order.shippingAddress.addressLine2}
        />
        <ShowAttribute title={"City"} value={order.shippingAddress.city} />
        <ShowAttribute
          title={"Postal Code"}
          value={order.shippingAddress.postalCode}
        />
        <ShowAttribute title={"State"} value={order.shippingAddress.state} />
        <ShowAttribute
          title={"Country"}
          value={order.shippingAddress.country}
        />
      </Grouping>
      <Grouping title={"Billing Address"}>
        <ShowAttribute
          title={"Adress Name"}
          value={order.billingAddress.fullName}
        />
        <ShowAttribute
          title={"Address Line 1"}
          value={order.billingAddress.addressLine1}
        />
        <ShowAttribute
          title={"Address Line 2"}
          value={order.billingAddress.addressLine2}
        />
        <ShowAttribute title={"City"} value={order.billingAddress.city} />
        <ShowAttribute
          title={"Postal Code"}
          value={order.billingAddress.postalCode}
        />
        <ShowAttribute title={"State"} value={order.billingAddress.state} />
        <ShowAttribute title={"Country"} value={order.billingAddress.country} />
      </Grouping>
      <Grouping title="Extra Details">
        <ShowAttribute title={"UID"} value={order.uid} />
        <ShowAttribute title={"Status"} value={order.status} />
        <ShowAttribute title={"Tracking Number"} value={order.trackingNumber} />
        <ShowAttribute title={"Ship Date"} value={order.shipDate} />
        <ShowAttribute
          title={"Shipping Company"}
          value={order.shippingCompany}
        />
        <ShowAttribute
          title={"From Shipstation"}
          value={order.internalOrder ? "false" : "true"}
        />
        <ShowAttribute title={"Imported From Excel"} value={order.fromExcel} />
        <ShowAttribute
          title={"Internal Shipping Cost"}
          value={formatPrice(
            order["internalShippingCostCents"],
            order["internalShippingCostCurrency"]
          )}
        />
      </Grouping>
    </Wrapper>
  );
}

export default OrderShowPage;
