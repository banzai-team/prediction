import React from 'react';
import {Center} from "@chakra-ui/react";

const SimpleLayout: React.FC<{children?: any}> = ({ children }) => {
    return (
        <Center minH="100vh" p={3} >{children}</Center>
    );
};

export default SimpleLayout;