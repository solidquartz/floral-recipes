import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { store } from "./redux/store";
import { Provider } from "react-redux";

const e = document.getElementById("root");

if (e) {
  ReactDOM.createRoot(e).render(
    <React.StrictMode>
      <Provider store={store}>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </Provider>
    </React.StrictMode>
  );
}