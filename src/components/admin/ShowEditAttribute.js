import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, TextField, Typography } from "@mui/material";
import { isNil } from "lodash";
import useAuth from "../../contexts/auth";
import useNotification from "../../contexts/notification";
import { updateCall } from "../../lib/api";
import Notification from "../Notification";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function ShowEditAttribute({
  title,
  attributeName,
  savedValue,
  endpoint,
  fieldType,
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
    <div className="w-full flex flex-row my-1">
      <div className="px-3 py-2 w-60">
        <Typography>{title}</Typography>
      </div>
      <div
        className={`${
          !editAttribute && "bg-gray-100"
        } px-3 py-1 rounded flex flex-col justify-center w-full`}
      >
        {editAttribute ? (
          <EditFieldByType
            fieldType={fieldType}
            attributeName={attributeName}
            title={title}
            value={value}
            setValue={setValue}
          />
        ) : (
          <Typography>
            <React.Fragment>
              {isNil(value) ? (
                <span className="text-gray-500">Unkown</span>
              ) : (
                value
              )}
            </React.Fragment>
          </Typography>
        )}
      </div>
      {editAttribute && (
        <div className="pl-2 py-2 w-36 flex flex-col justify-center">
          <Button variant="contained" onClick={onSave} color="primary">
            Save
          </Button>
        </div>
      )}
      <div className="pl-2 py-2 w-36 flex flex-col justify-center">
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
  );
}

function EditFieldByType({ fieldType, attributeName, title, setValue, value }) {
  if (fieldType === "date") {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label={title}
          inputFormat={"DD/MM/YYYY"}
          value={value}
          onChange={(e) => {
            setValue(e.toJSON());
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    );
  } else if (fieldType === "number") {
    return (
      <TextField
        id={attributeName}
        label={title}
        variant="outlined"
        fullWidth
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={"number"}
      />
    );
  }
  return (
    <TextField
      id={attributeName}
      label={title}
      variant="outlined"
      fullWidth
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
