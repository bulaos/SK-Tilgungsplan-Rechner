"use client";

import {
  Box,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { FormValues } from "../RepaymentForm/RepaymentForm";

export interface Props {
  label?: string;
  startAdornment: "€" | "%";
  field: ControllerRenderProps<FormValues>;
  customErrorMessage?: string;
}

export const FormInput = ({
  label,
  field,
  startAdornment,
  customErrorMessage,
}: Props) => {
  const [displayValue, setDisplayValue] = useState(field.value.toString());
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;

    const numericRegex = /^[0-9]*[.,]?[0-9]*$/;
    if (numericRegex.test(value)) {
      const formattedValue = value.replace(".", ",");
      setDisplayValue(formattedValue);
      parseInt;

      // better solutions possible
      const savedValue = formattedValue.replace(",", ".");
      field.onChange(savedValue);

      setError(false);
      setHelperText("");
    } else {
      event.preventDefault();
    }

    if (value === "") {
      setError(true);
      setHelperText(customErrorMessage ?? "Dieses Feld darf nicht leer sein");
    }

    if (parseFloat(value) === 0) {
      setError(true);
      setHelperText("Dieser Wert muss größer als 0 sein");
    }
  };

  return (
    <Box sx={{ paddingY: 2 }}>
      <FormControl variant="outlined" fullWidth color="secondary" error={error}>
        <InputLabel htmlFor={label} shrink>
          {label}
        </InputLabel>
        <OutlinedInput
          id={label}
          label={label}
          fullWidth
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
          startAdornment={
            <InputAdornment position="start">{startAdornment}</InputAdornment>
          }
          onChange={handleChange}
          value={displayValue} 
        />
        {error && <FormHelperText error>{helperText}</FormHelperText>}
      </FormControl>
    </Box>
  );
};
