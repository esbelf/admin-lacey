import axios from "axios";
import { camelizeKeys, decamelizeKeys } from "humps";

export const sendCharge = async ({ params, authToken }) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_HOST}/orders`,
    {
      ...params,
    },
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    }
  );
  return res.data;
};

export const deleteCall = async ({ endpoint, authToken }) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_HOST}${endpoint}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    }
  );
  return res.data;
};

export const fetchCall = async ({ endpoint, authToken }) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_HOST}${endpoint}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      }
    );

    return camelizeKeys(res);
  } catch (error) {
    return error.response;
  }
};

export const saveCall = async ({ endpoint, authToken, data }) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_HOST}${endpoint}`,
      decamelizeKeys(data),
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      }
    );

    return camelizeKeys(res);
  } catch (error) {
    return error.response;
  }
};

export const updateCall = async ({ endpoint, authToken, data }) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API_HOST}${endpoint}`,
      decamelizeKeys(data),
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      }
    );

    return camelizeKeys(res);
  } catch (error) {
    return error.response;
  }
};

export const sendForgotPasswordEmail = async ({ email }) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_HOST}/password/forgot`,
      decamelizeKeys({ email }),
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      }
    );

    return camelizeKeys(res);
  } catch (error) {
    return error.response;
  }
};

export const sendResetPassword = async ({
  password,
  passwordConfirmation,
  token,
}) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_HOST}/password/reset`,
      decamelizeKeys({ password, passwordConfirmation, token }),
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      }
    );

    return camelizeKeys(res);
  } catch (error) {
    return error.response;
  }
};

export const fetchCurrencyRate = async ({ currency, token }) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_HOST}/meta_data/currency_rate?currency=${currency}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      }
    );

    return camelizeKeys(res);
  } catch (error) {
    return { error: error.response };
  }
};

export const validateVatNumber = async ({ vatNumber, token }) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_HOST}/meta_data/validate_vat`,
    {
      vat: vatNumber,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    }
  );
  const { valid, valid_format } = res.data;
  return { valid, validFormat: valid_format };
};

// export const validateDiscount = async (uid) => {
//   const res = await axios.get(
//     `${process.env.REACT_APP_API_HOST}/discounts/validate?uid=${uid}`,
//     headers
//   );
//   const { discount } = camelize(res.data);
//   return discount;
// };
