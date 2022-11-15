import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, TextField, Typography } from "@mui/material";
import { isNil } from "lodash";
import useAuth from "../../contexts/auth";
import useNotification from "../../contexts/notification";
import { updateCall } from "../../lib/api";
import Notification from "../Notification";
import StripeCountryCodes from "../order/StripeCountryCodes";

export default function ShowEditAttribute({
  title,
  attributeName,
  savedValue,
  endpoint,
}) {
  const { jwtData, authToken } = useAuth();
  const { setErrorMessage, setSuccessMessage } = useNotification();

  const [editAttribute, setEditAttribute] = useState(false);
  const [resetValue, setResetValue] = useState(savedValue);
  const [value, setValue] = useState(savedValue);

  const [loading, setLoading] = useState(false);

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await updateCall({
      endpoint,
      authToken,
      data: {
        [attributeName]: value,
      },
    });
    setLoading(false);
    if (res.status === 400) {
      setErrorMessage(res.data["error_messages"]);
    } else {
      setSuccessMessage("Saved!");
      setResetValue(res.data[attributeName]);
      setEditAttribute(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex-1 flex flex-row my-1">
        <div className="px-3 py-2 w-48">
          <Typography>{title}</Typography>
        </div>
        <div
          className={`${
            !editAttribute && "bg-gray-100"
          } px-3 py-1 rounded flex flex-col justify-center w-full`}
        >
          {editAttribute ? (
            <StripeCountryCodes
              euro={jwtData["euro"]}
              id={attributeName}
              name={title}
              variant="outlined"
              fullWidth
              value={value}
              onChange={(obj) => {
                setValue(obj.value);
              }}
            />
          ) : (
            <Typography>
              {isNil(value) ? (
                <span className="text-gray-500">Unkown</span>
              ) : (
                value
              )}
            </Typography>
          )}
        </div>
        {editAttribute && (
          <div className="pl-2 py-2 w-24">
            <Button variant="contained" onClick={onSave} color="primary">
              Save
            </Button>
          </div>
        )}
        <div className="pl-2 py-2 w-24">
          <Button
            variant="contained"
            onClick={() => {
              setEditAttribute(!editAttribute);
              setValue(resetValue);
            }}
            color="secondary"
          >
            {editAttribute ? "Cancel" : "Edit"}
          </Button>
        </div>
      </div>
    </div>
  );
}
