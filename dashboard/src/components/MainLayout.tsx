import React from 'react';
import Navbar from "./Navbar";
import {Box} from "@chakra-ui/react";

const MainLayout: React.FC<{children?: any}> = ({ children }) => {
    return (
        <Box height="100vh" >
            <Navbar/>
            <Box pt="70px" px="40px" pb="30px" overflow="auto">
                {children}
            </Box>

        </Box>
    );
};

export default MainLayout ;