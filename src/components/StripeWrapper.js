import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js/pure";
import { loadStripe } from "@stripe/stripe-js";

function StripeWrapper({ euro, children }) {
  const [stripeObject, setStripeObject] = useState(null);

  // This function will re-run if the accountId prop changes.
  useEffect(() => {
    const fetchStripeObject = async () => {
      const publicKey = euro
        ? process.env.REACT_APP_EU_STRIPE_PUBLIC_KEY
        : process.env.REACT_APP_NA_STRIPE_PUBLIC_KEY;

      const res = await loadStripe(publicKey);
      // When we have got the Stripe object, pass it into our useState.
      setStripeObject(res);
    };
    fetchStripeObject();
  }, [euro]);

  // If no Stripe object, do not render the Stripe Element.
  if (!stripeObject) {
    return <p>Loading...</p>;
  }

  // Once we have the Stripe object, load everything.
  return <Elements stripe={stripeObject}>{children}</Elements>;
}

export default StripeWrapper;
