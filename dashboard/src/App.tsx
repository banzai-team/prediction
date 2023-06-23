import * as React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter } from "react-router-dom";

import Router from "./views/Router";
import overrides from "./theme/index";

export const App = () => (
  <ChakraProvider theme={overrides}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
  </ChakraProvider>
)
