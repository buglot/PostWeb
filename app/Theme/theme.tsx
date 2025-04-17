"use client";

const { createTheme } = require("@mui/material");

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: '#757ce8',
      main: '#fff',
      dark: '#b5b1b1',
      contrastText: '#000',
    },
    secondary: {
      light: '#ff3b2e',
      main: '#ff1303',
      dark: '#8f0d04',
      contrastText: '#fff',
    },
  },
})
export default theme;