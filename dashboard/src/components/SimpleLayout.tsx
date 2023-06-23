import React from 'react';
import {Center, Image, Box} from "@chakra-ui/react";

const SimpleLayout: React.FC<{children?: any}> = ({ children }) => {
    return (
        <Center minH="100vh" p={3} >
            <Box
                position="absolute"
                top="10px"
                left="20px"
            >
                <Image src='/logo-brand.svg' alt='Logo' h="25"/>
            </Box>
            {children}
        </Center>
    );
};

export default SimpleLayout;