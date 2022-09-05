import React, { useState } from "react";
import {
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  InputAdornment,
} from "@mui/material";
import useAuth from "../../contexts/auth";
import useOrder from "../../contexts/order";
import { formatPrice } from "../../lib/currency";
import { isNil, isEmpty } from "lodash";
import { saveCall } from "../../lib/api";
import { v4 as uuidv4 } from "uuid";
import { Notification } from "../../components";

export default function DiscountForm() {
  const { authToken, jwtData } = useAuth();
  const { discountCode, setDiscountCode } = useOrder();
  const [discountType, setDiscountType] = useState("amount");
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState();

  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);

  const handleAdd = async () => {
    if (
      (discountAmount === 0 && discountType !== "percentage") ||
      (discountPercentage === 0 && discountType === "percentage")
    ) {
      setErrorMessages(["Discount value needs to be greater than 0"]);
    } else {
      setLoading(true);
      const data = {
        uid: uuidv4(),
        discountType,
        discountAmount: discountAmount * 100,
        discountPercentage,
        minTotalAmountCents: 0,
        randomGenerated: true,
      };
      const res = await saveCall({ endpoint: "/discounts", authToken, data });
      setLoading(false);
      if (res.status === 400) {
        setErrorMessages(res.data["error_messages"]);
      } else {
        setDiscountCode(res.data);
        setDiscountAmount(0);
        setDiscountPercentage(0);
      }
    }
  };

  return (
    <React.Fragment>
      <div className="w-full flex flex-row gap-x-2">
        <div className="flex-grow flex flex-col gap-y-2">
          {!isNil(errorMessages) && (
            <div className="flex-1 my-2">
              <Notification smallText={errorMessages[0]} />
            </div>
          )}
          <div className="flex-1">
            <FormControl fullWidth>
              <InputLabel id="discountTypeLabel">Discount Type</InputLabel>
              <Select
                labelId="discountTypeLabel"
                id="discountType"
                value={discountType}
                label="Discount Type"
                onChange={(e) => setDiscountType(e.target.value)}
              >
                <MenuItem value={"percentage"}>Percentage</MenuItem>
                <MenuItem value={"amount"}>Total Amount</MenuItem>
                <MenuItem value={"per_product"}>Amount per Product</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="flex-1">
            {discountType !== "percentage" ? (
              <TextField
                label="Discount Amount"
                variant="outlined"
                value={discountAmount}
                onChange={(e) => {
                  const newValue = e.target.value;
                  if (newValue > 0) {
                    setDiscountAmount(e.target.value);
                  }
                }}
                fullWidth
                type="number"
                disabled={discountType === "percentage"}
                startAdornment={
                  <InputAdornment position="start">
                    {jwtData["euro"] ? "€" : "$"}
                  </InputAdornment>
                }
              />
            ) : (
              <TextField
                label="Discount Percentage"
                variant="outlined"
                defaultValue={discountPercentage}
                value={discountPercentage}
                onChange={(e) => {
                  const newValue = e.target.value;
                  if (newValue > 0) {
                    setDiscountPercentage(newValue);
                  }
                }}
                fullWidth
                type="number"
                disabled={discountType !== "percentage"}
              />
            )}
          </div>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAdd}
          disabled={loading}
        >
          Add
        </Button>
      </div>
      {!isNil(discountCode) && !isEmpty(discountCode) && (
        <div className="w-full flex flex-col mt-2 gap-y-2">
          <Notification
            boldText={"Successfully added discount to order"}
            smallText={displayDiscountType({
              currency: jwtData["euro"] ? "EUR" : "USD",
              type: discountCode["discountType"],
              percentage: discountCode["discountPercentage"],
              amount: discountCode["discountAmount"],
            })}
            success={true}
          />
          <Button
            fullWidth
            color="secondary"
            variant="contained"
            onClick={() => setDiscountCode({})}
          >
            Remove Discount
          </Button>
        </div>
      )}
    </React.Fragment>
  );
}

const displayDiscountType = ({ type, percentage, amount, currency }) => {
  if (type === "percentage") {
    return `${percentage}% discount will be applied to order`;
  } else if (type === "amount") {
    return `${formatPrice(amount, currency)} will be applied to order`;
  } else {
    return `${formatPrice(amount, currency)} will be applied to each mat`;
  }
};
