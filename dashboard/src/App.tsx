import * as React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Router from "./views/Router";
import overrides from "./theme/index";

const queryClient = new QueryClient();

export const App = () => (
  <ChakraProvider theme={overrides}>
      <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
      </QueryClientProvider>
  </ChakraProvider>
)
