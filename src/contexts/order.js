import React, { createContext, useContext, useEffect, useState } from "react";
import useAuth from "./auth";
import decamelize from "decamelize-keys";
import { isNil, isEmpty } from "lodash";
import { fetchCurrencyRate } from "../lib/api";
import {
  validateBillingAddress,
  validateShippingAddress,
} from "../lib/validateForm";
import useNotification from "./notification";

export const OrderContext = createContext({});

export const OrderProvider = ({ children }) => {
  const { jwtData, authToken } = useAuth();
  const { setErrorMessage } = useNotification();
  const [billingAddress, setBillingAddress] = useState({});
  const [billingAddressIsDifferent, setBillingAddressIsDifferent] =
    useState(false);
  const [cart, setCart] = useState({});
  const [contactDetails, setContactDetails] = useState({});
  const [currency, setCurrency] = useState("EUR");
  const [currencyRate, setCurrencyRate] = useState(1);
  const [discountCode, setDiscountCode] = useState(null);
  const [includeVat, setIncludeVat] = useState(true);
  const [shippingAddress, setShippingAddress] = useState({});
  const [shippingCost, setShippingCost] = useState(0);

  useEffect(() => {
    async function loadCheckoutFromCookies() {
      const saved = localStorage.getItem(process.env.REACT_APP_COOKIE_CHECKOUT);
      const checkoutDetails = JSON.parse(saved);
      // const checkoutDetails = null;

      if (checkoutDetails) {
        const data = checkoutDetails || {};
        setBillingAddress(data["billingAddress"] || {});
        setShippingAddress(data["shippingAddress"] || {});
        setContactDetails(data["contactDetails"] || {});
        setDiscountCode(data["discountCode"] || {});
        setBillingAddressIsDifferent(
          data["billingAddressIsDifferent"] || false
        );
        setShippingCost(data["shippingCost"] || 0);
        setIncludeVat(data["includeVat"] || true);
        setCart(data["cart"] || {});
        setCurrency(data["currency"] || "EUR");
      }
    }
    loadCheckoutFromCookies();
  }, []);

  useEffect(() => {
    // setCart({});
    // setBillingAddress({});
    // setShippingAddress({});
    setCurrency(!isEmpty(jwtData) && !jwtData["euro"] ? "USD" : "EUR");
    console.log("current currency", currency);
  }, [jwtData]);

  useEffect(() => {
    async function updateCurrencyRate() {
      if (isNil(authToken)) {
        return;
      }
      console.log("currency", currency, jwtData["euro"]);
      if (currency === "EUR" && jwtData["euro"]) {
        setCurrency("EUR");
        setCurrencyRate(1);
      } else if (currency === "USD" && !jwtData["euro"]) {
        setCurrency("USD");
        setCurrencyRate(1);
      }
      const { data } = await fetchCurrencyRate({
        currency: currency,
        token: authToken,
      });
      if (data["error"]) {
        setCurrency(jwtData["euro"] ? "EUR" : "USD");
        setCurrencyRate(1);
      } else {
        setCurrencyRate(data["rate"]);
      }
    }
    updateCurrencyRate();
  }, [currency]);

  const convertCurrency = (priceCents) => {
    if (currencyRate == 1) {
      return priceCents * currencyRate;
    }
    return 1.03 * priceCents * currencyRate;
  };

  const saveCheckoutDetails = (field, data) => {
    const checkoutData = {
      billingAddress,
      billingAddressIsDifferent,
      cart,
      contactDetails,
      currency,
      discountCode,
      includeVat,
      shippingAddress,
      shippingCost,
    };
    checkoutData[field] = data;

    localStorage.setItem(
      process.env.REACT_APP_COOKIE_CHECKOUT,
      JSON.stringify(data)
    );
  };

  const setField = (field) => (data) => {
    if (field === "billingAddress") {
      setBillingAddress(data);
    } else if (field === "billingAddressIsDifferent") {
      setBillingAddressIsDifferent(data);
    } else if (field == "includeVat") {
      setIncludeVat(data);
    } else if (field === "contactDetails") {
      setContactDetails(data);
    } else if (field === "currency") {
      setCurrency(data);
    } else if (field === "discountCode") {
      setDiscountCode(data);
    } else if (field === "shippingAddress") {
      setShippingAddress(data);
    } else if (field === "shippingCost") {
      setShippingCost(data);
    }

    saveCheckoutDetails(field, data);
  };

  const setCartProductQuantity = ({ product, quantity }) => {
    if (quantity >= 0) {
      cart[product.id] = { product, quantity };
      if (cart[product.id] && cart[product.id].quantity <= 0) {
        delete cart[product.id];
      }
    } else {
      delete cart[product.id];
    }
    setCart({ ...cart });
    saveCheckoutDetails("cart", cart);
  };

  const clearCart = () => {
    setCart({});
    saveCheckoutDetails("cart", {});
  };

  const generateStripeBaseParams = () => {
    const tempBillingAddress = billingAddressIsDifferent
      ? billingAddress
      : shippingAddress;
    const billing_address = decamelize(tempBillingAddress, "_");
    const shipping_address = decamelize(shippingAddress, "_");
    const cartIds = {};
    Object.values(cart).forEach(({ product, quantity }) => {
      cartIds[product.sku] = parseInt(quantity);
    });
    const params = {
      cart: cartIds,
      contact: contactDetails,
      currency: currency,
      billing_address: {
        ...billing_address,
        email: contactDetails["email"],
        phone_number: contactDetails["phone_number"],
        country: tempBillingAddress["country"],
      },
      include_vat: includeVat,
      shipping_address: {
        ...shipping_address,
        country: shippingAddress["country"],
      },
      shipping_cost: shippingCost,
    };
    if (!isNil(discountCode) && !isNil(discountCode["uid"])) {
      params["discount"] = {
        uid: discountCode["uid"],
      };
    }

    return params;
  };

  const validateOrderParams = () => {
    const tempBillingAddress = billingAddressIsDifferent
      ? billingAddress
      : shippingAddress;
    const billingAddressError = validateBillingAddress(tempBillingAddress);
    if (billingAddressError) {
      setErrorMessage(billingAddressError.message);
      return false;
    }
    const shippingAddressError = validateShippingAddress(shippingAddress);
    if (shippingAddressError) {
      setErrorMessage(shippingAddressError.message);
      return false;
    }
    // TODO validate shipping address
    if (isEmpty(cart)) {
      console.log("cart empty error");
      setErrorMessage("No products in cart");
      return false;
    }
    return true;
  };

  return (
    <OrderContext.Provider
      value={{
        billingAddress: billingAddressIsDifferent
          ? billingAddress
          : shippingAddress,
        billingAddressIsDifferent,
        contactDetails,
        currency,
        convertCurrency,
        discountCode,
        includeVat,
        shippingAddress,
        shippingCost,

        cart,
        clearCart,
        setCartProductQuantity,

        generateStripeBaseParams,
        validateOrderParams,

        setBillingAddress: setField("billingAddress"),
        setBillingAddressIsDifferent: setField("billingAddressIsDifferent"),
        setContactDetails: setField("contactDetails"),
        setCurrency: setField("currency"),
        setDiscountCode: setField("discountCode"),
        setIncludeVat: setField("includeVat"),
        setShippingAddress: setField("shippingAddress"),
        setShippingCost: setField("shippingCost"),
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default function useOrder() {
  return useContext(OrderContext);
}
