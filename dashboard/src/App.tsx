import * as React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Router from "./views/Router";
import overrides from "./theme/index";
import {AuthContextProvider} from './context/AuthContext';

const queryClient = new QueryClient();

export const App = () => {
    return <AuthContextProvider>
        <ChakraProvider theme={overrides}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Router/>
                </BrowserRouter>
            </QueryClientProvider>
        </ChakraProvider>
    </AuthContextProvider>;
};
