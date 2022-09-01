import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

import StripeCard from "./StripeCard";
import Notification from "./Notification";

import { sendCharge } from "../../lib/api";
import { validateBillingAddress } from "../../lib/validateForm";

import useOrder from "../../contexts/order";
import useAuth from "../../contexts/auth";

import CreditCardIcon from "@mui/icons-material/CreditCard";

export default function StripeCreditCardCheckout({ products, children }) {
  const {
    contactDetails,
    shippingAddress,
    billingAddress,
    discountCode,
    generateStripeBaseParams,
    cart,
    setCart,
  } = useOrder();
  const { authToken } = useAuth();

  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const handleServerResponse = async (response) => {
    if (response.error) {
      // Show error from server on payment form
      return {
        error: response.error,
      };
    } else if (response.requires_action) {
      // Use Stripe.js to handle required card action
      return await handleAction(response);
    } else {
      // Show success message
      return response;
    }
  };

  const sendPaymentIdToServer = async (paymentMethod) => {
    const params = generateStripeBaseParams(cart);
    params["payment_method_type"] = "card";
    params["payment_method_id"] = paymentMethod.id;
    const data = await sendCharge({ params, authToken });
    return await handleServerResponse(data);
  };

  const handleAction = async (data) => {
    const { error: errorAction, paymentIntent } = await stripe.handleCardAction(
      data.payment_intent_client_secret
    );
    if (errorAction) {
      // Show error from Stripe.js in payment form
      return {
        error: errorAction,
      };
    }
    const params = generateStripeBaseParams(cart);
    params["payment_method_type"] = "card";
    params["payment_intent_id"] = paymentIntent.id;
    const result = await sendCharge({ params, authToken });
    return await handleServerResponse(result);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setProcessing(true);

      const billingAddressError = validateBillingAddress(billingAddress);
      if (billingAddressError) {
        setErrorMessage(billingAddressError);
        setProcessing(false);
        return;
      } else {
        setErrorMessage(null);
      }

      if (!stripe || !elements) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        return;
      }

      const params = generateBillingDetails(billingAddress);
      params["type"] = "card";
      params["card"] = elements.getElement(CardNumberElement);

      // PART 1
      const stripeResult = await stripe.createPaymentMethod(params);
      const { paymentMethod } = stripeResult;
      // PART 2
      let response = await sendPaymentIdToServer(paymentMethod);
      setProcessing(false);
      if (response.error) {
        setErrorMessage(response.error);
      } else {
        const orderId = response.orderId;
        setCart({});
        setErrorMessage(null);

        navigate(`/orders/${orderId}`);
      }
    } catch (err) {
      setProcessing(false);
      const message = typeof err === "string" ? err : err.message;
      setErrorMessage(message);
    }
  };

  return (
    <div className="">
      {errorMessage && (
        <div className="my-3">
          <Notification boldText={errorMessage} />
        </div>
      )}

      <div className="w-full py-4">
        <form onSubmit={handleSubmit}>
          <StripeCard errorMessage={errorMessage} />

          {children}

          <button
            type="submit"
            className="checkout__button"
            disabled={!stripe || processing}
          >
            <CreditCardIcon fontSize="large" color="primary" />
            <span className="ml-2 mt-5px">Charge Card</span>
          </button>
        </form>
      </div>
    </div>
  );
}

function generateBillingDetails(billingAddress) {
  return {
    billing_details: {
      name: billingAddress.name,
      email: billingAddress.email,
      phone: billingAddress.phone,
      address: {
        line1: billingAddress.addressLine1,
        line2: billingAddress.addressLine2,
        city: billingAddress.city,
        state: billingAddress.state,
        postal_code: billingAddress.postalCode,
        country: billingAddress.country.value, // TWO letter country code ISO 3166-1 alpha-2
      },
    },
  };
}
