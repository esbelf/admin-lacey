import React from "react";
import {
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

const ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "18px",
      color: "#1e4858",
      letterSpacing: "0.025em",
      "::placeholder": {
        color: "#828282",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const logEvent = (name) => (event) => {
  console.log(`[${name}]`, event);
};

export default function StripeCard({ errorMessage }) {
  return (
    <React.Fragment>
      <div className="w-full">
        <CardNumberElement
          id="cardNumber"
          onBlur={logEvent("blur")}
          onChange={logEvent("change")}
          onFocus={logEvent("focus")}
          onReady={logEvent("ready")}
          options={ELEMENT_OPTIONS}
        />
      </div>
      <div className="flex flex-wrap">
        <div className="w-full sm:w-1/2 sm:pr-2">
          <CardExpiryElement
            id="expiry"
            onBlur={logEvent("blur")}
            onChange={logEvent("change")}
            onFocus={logEvent("focus")}
            onReady={logEvent("ready")}
            options={ELEMENT_OPTIONS}
          />
        </div>
        <div className="w-full sm:w-1/2 sm:pl-2">
          <CardCvcElement
            id="cvc"
            onBlur={logEvent("blur")}
            onChange={logEvent("change")}
            onFocus={logEvent("focus")}
            onReady={logEvent("ready")}
            options={ELEMENT_OPTIONS}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
