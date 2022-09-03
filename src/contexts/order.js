import React, { createContext, useContext, useEffect, useState } from "react";
import useAuth from "./auth";
import decamelize from "decamelize-keys";
import { isNil } from "lodash";

export const OrderContext = createContext({});

export const OrderProvider = ({ children }) => {
  const { jwtData } = useAuth();
  const [billingAddress, setBillingAddress] = useState({});
  const [contactDetails, setContactDetails] = useState({});
  const [discountCode, setDiscountCode] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({});
  const [billingAddressIsDifferent, setBillingAddressIsDifferent] =
    useState(false);
  const [cart, setCart] = useState({});

  useEffect(() => {
    async function loadCheckoutFromCookies() {
      // const saved = localStorage.getItem(process.env.REACT_APP_COOKIE_CHECKOUT);
      // const checkoutDetails = JSON.parse(saved);
      const checkoutDetails = null;

      if (checkoutDetails) {
        const data = checkoutDetails || {};
        setBillingAddress(data["billingAddress"] || {});
        setShippingAddress(data["shippingAddress"] || {});
        setContactDetails(data["contactDetails"] || {});
        setDiscountCode(data["discountCode"] || {});
        setBillingAddressIsDifferent(
          data["billingAddressIsDifferent"] || false
        );
        setCart(data["cart"] || {});
      }
    }
    loadCheckoutFromCookies();
  }, []);

  useEffect(() => {
    setCart({});
    setBillingAddress({});
    setShippingAddress({});
  }, [jwtData]);

  const saveCheckoutDetails = (data) => {
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
    } else if (field === "contactDetails") {
      setContactDetails(data);
    } else if (field === "discountCode") {
      setDiscountCode(data);
    } else if (field === "shippingAddress") {
      setShippingAddress(data);
    }

    const checkoutData = {
      billingAddress,
      billingAddressIsDifferent,
      discountCode,
      shippingAddress,
    };
    checkoutData[field] = data;
    saveCheckoutDetails(checkoutData);
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
  };

  const clearCart = () => {
    setCart({});
  };

  const generateStripeBaseParams = (cart) => {
    const tempBillingAddress = billingAddressIsDifferent
      ? billingAddress
      : shippingAddress;
    const billing_address = decamelize(tempBillingAddress, "_");
    const shipping_address = decamelize(shippingAddress, "_");
    const cartIds = {};
    Object.values(cart).forEach(({ product, quantity }) => {
      cartIds[product.sku] = quantity;
    });
    const params = {
      cart: cartIds,
      contact: contactDetails,
      billing_address: {
        ...billing_address,
        email: contactDetails["email"],
        phone: contactDetails["phone"],
        country: tempBillingAddress["country"],
      },
      shipping_address: {
        ...shipping_address,
        country: shippingAddress["country"],
      },
    };
    if (!isNil(discountCode) && !isNil(discountCode["uid"])) {
      params["discount"] = {
        uid: discountCode["uid"],
      };
    }

    return params;
  };

  return (
    <OrderContext.Provider
      value={{
        billingAddress: billingAddressIsDifferent
          ? billingAddress
          : shippingAddress,
        billingAddressIsDifferent,
        contactDetails,
        discountCode,
        shippingAddress,

        cart,
        clearCart,
        setCartProductQuantity,

        generateStripeBaseParams,

        setBillingAddress: setField("billingAddress"),
        setBillingAddressIsDifferent: setField("billingAddressIsDifferent"),
        setContactDetails: setField("contactDetails"),
        setDiscountCode: setField("discountCode"),
        setShippingAddress: setField("shippingAddress"),
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default function useOrder() {
  return useContext(OrderContext);
}
