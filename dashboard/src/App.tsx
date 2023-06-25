import * as React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import {IntlProvider} from "react-intl";

import Router from "./views/Router";
import overrides from "./theme/index";
import {AuthContextProvider} from './context/AuthContext';
import rus from './intl/ru.json';

const queryClient = new QueryClient();

export const App = () => {
    return <AuthContextProvider>
        {/*TODO: fix locale*/}
        <IntlProvider locale="ru" messages={rus}>
            <ChakraProvider theme={overrides}>
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                        <Router/>
                    </BrowserRouter>
                </QueryClientProvider>
            </ChakraProvider>
        </IntlProvider>
    </AuthContextProvider>;
};
