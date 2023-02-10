import { createTheme } from "@mui/material/styles"; 

const Colors = {
  primary: "#006782",
  secondary: "#4c616b",
  success: "#4CAF50",
  info: "#2196f3",
  danger: "#ba1a1a",
  warning: "#ff9800",
  dark: "#0e1b20",
  light: "#aaa",
  muted: "#abafb3",
  border: "#DDDFE1",
  inverse: "#2F3D4A",
  shaft: "#333",
  dove_gray: "#D5D5D5",
  body_bg: "F3F6F9",
  white: "#fff",
  black: "#000",
};

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.primary
    },
    secondary: {
      main: Colors.secondary
    }
  }
});

export default theme;