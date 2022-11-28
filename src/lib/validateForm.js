import { isNil, isEmpty } from "lodash";

export const validateBillingAddress = (billingAddress) => {
  try {
    validateAddress(billingAddress);
  } catch (err) {
    return err;
  }
  return null;
};

export const validateShippingAddress = (shippingAddress) => {
  try {
    validateAddress(shippingAddress);
  } catch (err) {
    return err;
  }
  return null;
};

export const validateAddressHash = (address) => {
  try {
    validateAddress(address);
  } catch (err) {
    return err;
  }
  return null;
};

const validateAddress = (address) => {
  if (validateString(address["fullName"])) {
    throw new Error("Please fill out your Full Name");
  }
  if (validateString(address["addressLine1"])) {
    throw new Error("Please fill out your Address");
  }
  if (validateString(address["city"])) {
    throw new Error("Please fill out your City");
  }
  if (validateString(address["postalCode"])) {
    throw new Error("Please fill out your Postal Code");
  }
  if (isNil(address["country"]) || isEmpty(address["country"])) {
    throw new Error("Please fill out your Country");
  }
  if (
    ["US", "CA"].includes(address["country"]) &&
    validateString(address["state"])
  ) {
    throw new Error("Please fill out your State or Providence");
  }
};

export const validateEmail = (str) => {
  if (!(isNil(str) || str.length === 0)) {
    const pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (pattern.test(str)) {
      return true;
    }
  }
  return false;
};

export const validatePhone = (str, countryCode) => {
  if (!isEmpty(countryCode) && countryCode !== "US") {
    if (validateString(str)) {
      return false;
    }
  }
  return true;
};

const validateString = (str) => {
  return isNil(str) || str.length === 0;
};
