import React from 'react';
import Navbar from "./Navbar";
import {Box} from "@chakra-ui/react";

const MainLayout: React.FC<{children?: any}> = ({ children }) => {
    return (
        <Box minH="100vh">
            <Navbar/>
            {children}
        </Box>
    );
};

export default MainLayout ;