import React from "react";
import { useParams } from "react-router-dom";
import {
  Wrapper,
  ShowEditAttribute,
  ShowEditCountryCodes,
  ShowAttribute,
  Grouping,
} from "../components/admin";
import { useApiFetch } from "../hooks/api";
import { Button, CircularProgress, Typography } from "@mui/material";
import { formatPrice } from "../lib/currency";
import { isNil } from "lodash";
import { Link } from "react-router-dom";
import PrintIcon from "@mui/icons-material/Print";
import StoreIcon from "@mui/icons-material/Store";

function OrderShowPage() {
  const params = useParams();
  const { data: order, loading } = useApiFetch({ url: `/orders/${params.id}` });

  const onPrint = () => {};

  if (loading) {
    return (
      <Wrapper>
        <CircularProgress />
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="flex-1 flex flex-row justify-between mt-2">
        <div className="flex-1">
          <Typography variant="h3">Order {order.orderNumber}</Typography>
        </div>
        <div className="flex-1 flex flex-row justify-end items-center">
          <div className="mr-1">
            <Button
              variant="contained"
              href={`https://dashboard.stripe.com/payments/${order.uid}`}
              color="secondary"
              el="noopener noreferrer"
              target="_blank"
            >
              <StoreIcon />
            </Button>
          </div>
          <div className="mr-1">
            <Button
              variant="contained"
              href={`${process.env.REACT_APP_API_HOST}/orders/${order.uid}/receipt?lang=en`}
              color="primary"
              el="noopener noreferrer"
              target="_blank"
            >
              <PrintIcon />
              EN
            </Button>
          </div>
          <div className="">
            <Button
              variant="contained"
              href={`${process.env.REACT_APP_API_HOST}/orders/${order.uid}/receipt?lang=es`}
              color="primary"
              el="noopener noreferrer"
              target="_blank"
            >
              <PrintIcon />
              ES
            </Button>
          </div>
        </div>
      </div>
      <Grouping title={"Customer"}>
        <ShowEditAttribute
          title={"Email"}
          attributeName={"email"}
          savedValue={order["customer"]["email"]}
          endpoint={`/customers/${order["customer"]["id"]}`}
        />
        <ShowEditAttribute
          title={"Full Name"}
          attributeName={"fullName"}
          savedValue={order["customer"]["fullName"]}
          endpoint={`/customers/${order["customer"]["id"]}`}
        />
        <ShowEditAttribute
          title={"Phone Number"}
          attributeName={"phoneNumber"}
          savedValue={order["customer"]["phoneNumber"]}
          endpoint={`/customers/${order["customer"]["id"]}`}
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
        {!isNil(order["refundAmountCents"]) &&
          order["refundAmountCents"] !== 0 && (
            <ShowAttribute
              title={"Refund"}
              value={formatPrice(
                order["refundAmountCents"],
                order["refundAmountCurrency"]
              )}
            />
          )}
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
        <ShowEditAttribute
          title={"Full Name"}
          attributeName={"fullName"}
          savedValue={order.shippingAddress.fullName}
          endpoint={`/addresses/${order["shippingAddress"]["id"]}`}
        />
        <ShowEditAttribute
          title={"Address Line 1"}
          attributeName={"addressLine1"}
          savedValue={order.shippingAddress.addressLine1}
          endpoint={`/addresses/${order["shippingAddress"]["id"]}`}
        />
        <ShowEditAttribute
          title={"Address Line 2"}
          attributeName={"addressLine2"}
          savedValue={order.shippingAddress.addressLine2}
          endpoint={`/addresses/${order["shippingAddress"]["id"]}`}
        />
        <ShowEditAttribute
          title={"City"}
          attributeName={"city"}
          savedValue={order.shippingAddress.city}
          endpoint={`/addresses/${order["shippingAddress"]["id"]}`}
        />
        <ShowEditAttribute
          title={"Postal Code"}
          attributeName={"postalCode"}
          savedValue={order.shippingAddress.postalCode}
          endpoint={`/addresses/${order["shippingAddress"]["id"]}`}
        />
        <ShowEditAttribute
          title={"State"}
          attributeName={"state"}
          savedValue={order.shippingAddress.state}
          endpoint={`/addresses/${order["shippingAddress"]["id"]}`}
        />
        <ShowEditCountryCodes
          title={"Country"}
          attributeName={"country"}
          savedValue={order.shippingAddress.country}
          endpoint={`/addresses/${order["shippingAddress"]["id"]}`}
        />
      </Grouping>
      <Grouping title={"Billing Address"}>
        <ShowEditAttribute
          title={"Full Name"}
          attributeName={"fullName"}
          savedValue={order.billingAddress.fullName}
          endpoint={`/addresses/${order["billingAddress"]["id"]}`}
        />
        <ShowEditAttribute
          title={"Address Line 1"}
          attributeName={"addressLine1"}
          savedValue={order.billingAddress.addressLine1}
          endpoint={`/addresses/${order["billingAddress"]["id"]}`}
        />
        <ShowEditAttribute
          title={"Address Line 2"}
          attributeName={"addressLine2"}
          savedValue={order.billingAddress.addressLine2}
          endpoint={`/addresses/${order["billingAddress"]["id"]}`}
        />
        <ShowEditAttribute
          title={"City"}
          attributeName={"city"}
          savedValue={order.billingAddress.city}
          endpoint={`/addresses/${order["billingAddress"]["id"]}`}
        />
        <ShowEditAttribute
          title={"Postal Code"}
          attributeName={"postalCode"}
          savedValue={order.billingAddress.postalCode}
          endpoint={`/addresses/${order["billingAddress"]["id"]}`}
        />
        <ShowEditAttribute
          title={"State"}
          attributeName={"state"}
          savedValue={order.billingAddress.state}
          endpoint={`/addresses/${order["billingAddress"]["id"]}`}
        />
        <ShowEditCountryCodes
          title={"Country"}
          attributeName={"country"}
          savedValue={order.billingAddress.country}
          endpoint={`/addresses/${order["billingAddress"]["id"]}`}
        />
      </Grouping>
      <Grouping title="Extra Details">
        <ShowAttribute title={"UID"} value={order.uid} />
        <ShowAttribute
          title={"Stripe Cost"}
          value={formatPrice(order.stripeFeeCents, order.stripeFeeCurrency)}
        />
        <ShowAttribute title={"Order Date"} value={order.orderDate} />
        <ShowAttribute title={"Status"} value={order.status} />
        <ShowAttribute title={"Tracking Number"} value={order.trackingNumber} />
        <ShowAttribute title={"Ship Date"} value={order.shipDate} />
        <ShowAttribute
          title={"Shipping Company"}
          value={order.shippingCompany}
        />
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
