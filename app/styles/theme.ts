"use client";

import { createTheme, Theme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#ee0000",
    },
    secondary: {
      main: "#292929",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "input[type=number]": {
          "-moz-appearance": "textfield",
        },
        "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
          "-webkit-appearance": "none",
          margin: 0,
        },
      },
    },
  },
});
