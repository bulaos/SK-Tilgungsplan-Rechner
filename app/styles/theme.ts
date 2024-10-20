"use client";

import { createTheme } from "@mui/material";

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
          MozAppearance: "textfield",
        },
        "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
          WebkitAppearance: "none",
          margin: 0,
        },
      },
    },
  },
});
