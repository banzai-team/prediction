import React from 'react';
import Sidebar from "./Sidebar";
import { Flex } from "@chakra-ui/react";

const SidebarLayout: React.FC<{children?: any}> = ({ children }) => {
    return (
        <Flex minH="100vh">
            <Sidebar/>
            {children}
        </Flex>
    );
};

export default SidebarLayout ;