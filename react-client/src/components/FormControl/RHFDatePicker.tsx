import dayjs, { Dayjs } from "dayjs";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import { useState } from "react";

import { formatToISOString } from "../../helper/Constant";

type RHFDatePickerProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  disabled?: boolean;
  minDate?: Dayjs | string;
  maxDate?: Dayjs | string;
  disablePast?: boolean;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
};

export function RHFDatePicker<T extends FieldValues>({
  name,
  control,
  label,
  disabled,
  minDate,
  maxDate,
  disablePast,
  placeholder = "Choose a Date",
  error = false,
  helperText,
}: RHFDatePickerProps<T>) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const hasError = error || !!fieldState.error;
        const errorMessage = fieldState.error?.message || helperText;
        const dateValue = field.value ? dayjs(field.value) : null;

        return (
          <DatePicker
            disabled={disabled}
            label={label}
            disablePast={disablePast}
            value={dateValue}
            onChange={(date) => {
              field.onChange(formatToISOString(date));
              setIsPickerOpen(false);
            }}
            open={isPickerOpen}
            onOpen={() => setIsPickerOpen(true)}
            onClose={() => setIsPickerOpen(false)}
            format='DD MMM YYYY'
            minDate={minDate ? dayjs(minDate) : undefined}
            maxDate={maxDate ? dayjs(maxDate) : undefined}
            enableAccessibleFieldDOMStructure={false}
            slotProps={{
              textField: {
                size: "small",
                fullWidth: true,
                placeholder,
                error: hasError,
                helperText: errorMessage,
                sx: {
                  "& .MuiInputBase-root": {
                    height: "30px",
                    fontSize: "15px",
                    padding: "0 25px",
                    backgroundColor: "#f5f5f5",
                    "&.Mui-disabled": {
                      backgroundColor: "#f5f5f5",
                      color: "#000",
                      "& fieldset": {
                        border: "1px solid #ccc !important",
                      },
                    },
                    "&.Mui-error fieldset": {
                      borderColor: "#D92E2C !important",
                      borderWidth: "2px !important",
                    },
                    "&.Mui-focused input::placeholder": { opacity: 0 },
                    "&:active input::placeholder": { opacity: 0 },
                  },
                  "& .MuiInputBase-input": {
                    padding: "0.5px 0",
                    "&:focus::placeholder": { opacity: 0 },
                    "&:active::placeholder": { opacity: 0 },
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      border: "1px solid #ccc !important",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#87CEEB !important",
                      borderWidth: "1px !important",
                    },
                    "&.Mui-error.Mui-focused fieldset": {
                      borderColor: "#D92E2C !important",
                      borderWidth: "2px !important",
                    },
                  },
                  "& input::placeholder": {
                    textTransform: "none",
                    transition: "opacity 0.1s ease",
                  },
                  "& .MuiFormHelperText-root": {
                    color: "#D92E2C",
                    fontSize: "0.75rem",
                    marginLeft: 0,
                  },
                },
                InputLabelProps: { shrink: true },
                onClick: () => setIsPickerOpen(true),
              },
            }}
            slots={{
              textField: (params) => (
                <TextField
                  {...params}
                  error={hasError}
                  helperText=''
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { border: "1px solid #ccc !important" },
                      "&.Mui-disabled": {
                        "& fieldset": {
                          border: "1px solid #ccc !important",
                        },
                        backgroundColor: disabled ? "#f5f5f5" : "",
                        color: "#000",
                      },
                      "& input::placeholder": { textTransform: "none" },
                      "&.Mui-error fieldset": {
                        borderColor: "#D92E2C !important",
                        borderWidth: "2px !important",
                      },
                    },
                    "& .MuiInputBase-input": {
                      "&:focus::placeholder": { opacity: 0 },
                      "&:active::placeholder": { opacity: 0 },
                    },
                  }}
                  InputLabelProps={{
                    shrink: isPickerOpen || !!field.value,
                  }}
                />
              ),
            }}
          />
        );
      }}
    />
  );
}
