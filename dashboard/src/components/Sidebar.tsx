import React from 'react';
import { Box } from "@chakra-ui/react";

const Sidebar: React.FC<{children?: any}> = ({ children }) => {
    return (
        <Box minH="100%" background="black" color="white" minW="150px">
            sidebar content
        </Box>
    );
};

export default Sidebar ;