import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { isNil } from "lodash";
import useAuth from "../../contexts/auth";
import useNotification from "../../contexts/notification";
import { updateCall } from "../../lib/api";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/de";
import utc from "dayjs/plugin/utc";

export default function ShowEditAttribute({
  title,
  attributeName,
  savedValue,
  endpoint,
  fieldType,
  onSuccess,
}) {
  const { authToken } = useAuth();
  const { setErrorMessage, setSuccessMessage } = useNotification();

  const [editAttribute, setEditAttribute] = useState(false);
  const [resetValue, setResetValue] = useState(
    setStateValue({ fieldType, value: savedValue })
  );
  const [value, setValue] = useState(
    setStateValue({ fieldType, value: savedValue })
  );

  const [loading, setLoading] = useState(false);

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await updateCall({
      endpoint,
      authToken,
      data: {
        [attributeName]: value.toString(),
      },
    });
    setLoading(false);
    if (res.status === 400) {
      setErrorMessage(res.data["error_messages"]);
    } else {
      setSuccessMessage("Saved!");
      setResetValue(res.data[attributeName]);
      setEditAttribute(false);
      if (onSuccess) {
        onSuccess();
      }
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
            <ShowField fieldType={fieldType} value={value} />
          </Typography>
        )}
      </div>
      {editAttribute && (
        <div className="pl-2 py-2 w-36 flex flex-col justify-center">
          <Button
            variant="contained"
            onClick={onSave}
            disabled={loading}
            color="primary"
          >
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

function setStateValue({ fieldType, value }) {
  if (fieldType === "date") {
    dayjs.extend(utc);
    return dayjs(value).utc();
  }
  return value;
}

function ShowField({ fieldType, value }) {
  if (isNil(value)) {
    return <span className="text-gray-500">Unkown</span>;
  } else if (fieldType === "date") {
    return dayjs(value, ["YYYY-MM-DD HH:mm:ss", "DD/MM/YYYY"]).format(
      "DD/MM/YYYY"
    );
  } else if (fieldType === "taxRate") {
    return `${value}%`;
  }
  return value;
}

function EditFieldByType({ fieldType, attributeName, title, setValue, value }) {
  if (fieldType === "date") {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
        <DatePicker
          label={title}
          inputFormat={"DD/MM/YYYY"}
          value={value}
          onChange={(e) => {
            setValue(e);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    );
  } else if (fieldType === "taxRate") {
    return (
      <FormControl fullWidth>
        <InputLabel id="ax-rate-select-label">Tax Rate</InputLabel>
        <Select
          labelId="tax-rate-select-label"
          id="tax-rate-select"
          value={value}
          label="Tax Rate"
          onChange={(e) => {
            setValue(e.target.value);
          }}
        >
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={17}>17</MenuItem>
          <MenuItem value={18}>18</MenuItem>
          <MenuItem value={19}>19</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={21}>21</MenuItem>
          <MenuItem value={22}>22</MenuItem>
          <MenuItem value={23}>23</MenuItem>
          <MenuItem value={24}>24</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={27}>27</MenuItem>
        </Select>
      </FormControl>
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
