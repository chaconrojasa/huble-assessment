import { createTheme } from "@mui/material";
import { darkSlate, yellow } from "../shared/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: yellow,
    },
    secondary: {
      main: darkSlate,
    },
  },
});
