import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Wrapper, ShowAttribute, Grouping } from "../components/admin";
import { AddressForm } from "../components/order";
import { Notification } from "../components";
import { useApiFetch } from "../hooks/api";
import { saveCall } from "../lib/api";
import useAuth from "../contexts/auth";
import { Button, CircularProgress, Typography } from "@mui/material";
import { validateAddressHash } from "../lib/validateForm";

export default function DealerAddressesPage() {
  const { data, loading } = useApiFetch({ url: `/dealer/addresses` });

  if (loading) {
    return (
      <Wrapper>
        <CircularProgress />
      </Wrapper>
    );
  }
  console.log("data", data);
  return (
    <Wrapper>
      <div className="flex-1">
        <Typography variant="h2">Your Addresses</Typography>
      </div>

      <div className="flex flex-col md:flex-row gap-x-2">
        <AddressBlock
          title="Shipping"
          type="shipping"
          initialAddress={data["shippingAddress"]}
        />
        <AddressBlock
          title="Billing"
          type="billing"
          initialAddress={data["billingAddress"]}
        />
      </div>
    </Wrapper>
  );
}

function AddressBlock({ title, type, initialAddress }) {
  const { authToken } = useAuth();
  const [address, setAddress] = useState(initialAddress);
  const [errorMessage, setErrorMessage] = useState();
  const [processing, setProcessing] = useState(false);

  const onSave = async () => {
    setProcessing(true);
    const err = validateAddressHash(address);
    if (err) {
      setErrorMessage(err);
      setProcessing(false);
      return;
    } else {
      setErrorMessage();
    }
    const res = await saveCall({
      endpoint: `/dealer/addresses/${type}`,
      authToken,
      data: address,
    });
    setProcessing(false);
  };
  return (
    <FormBlock title={title}>
      {errorMessage && (
        <div className="flex-1 mb-6">
          <Notification boldText={errorMessage} />
        </div>
      )}
      <AddressForm type={type} setAddress={setAddress} address={address} />
      <div className="flex-1 mt-2">
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={onSave}
          disabled={processing}
        >
          Save {title} Address
        </Button>
      </div>
    </FormBlock>
  );
}

function FormBlock({ title, children }) {
  return (
    <div className="flex-1 flex flex-col my-5 min-w-fit">
      <div className="mb-1">
        <Typography variant="h5" className="text-blue-400">
          {title}
        </Typography>
      </div>
      <div className="border rounded border-blue-400 p-4">{children}</div>
    </div>
  );
}
