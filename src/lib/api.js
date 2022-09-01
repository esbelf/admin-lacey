import { useState, useEffect } from "react";
import axios from "axios";
import camelize from "camelize";

const headers = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
};

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

// export const validateDiscount = async (uid) => {
//   const res = await axios.get(
//     `${process.env.REACT_APP_API_HOST}/discounts/validate?uid=${uid}`,
//     headers
//   );
//   const { discount } = camelize(res.data);
//   return discount;
// };
