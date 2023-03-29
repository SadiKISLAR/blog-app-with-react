import { useAuthContext } from "./contexts/AuthProvider";
import AppRouter from "./router/AppRouter";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@mui/material/styles";
import { blueGrey, indigo } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

function App() {
  const { isDark } = useAuthContext();

  const theme = createTheme({
    palette: {
      mode: isDark ? "dark" : "light",
      primary: {
        main: blueGrey[500],
      },
      secondary: {
        main: indigo[400],
      },
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <AppRouter />
        <ToastContainer />
      </ThemeProvider>
    </div>
  );
}

export default App;