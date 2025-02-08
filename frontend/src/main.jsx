import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App.jsx";
import "./index.scss";

createRoot(document.getElementById("root")).render(
  <ChakraProvider
    toastOptions={{
      defaultOptions: {
        position: "bottom-right",
        containerStyle: {
          padding: "0 15px 15px 0"
        }
      }
    }}
  >
    <App />
  </ChakraProvider>
);
