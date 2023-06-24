import {Text, Box} from '@chakra-ui/react';
import React from "react";

const EmptyPlaceholder: React.FC<{children?: any}> = props => (
    <Box
        px="5"
        py={{ base: "20px", md: "40px" }}
        w='100%'
        minH='100%'
        my="auto"
        textAlign={"center"}
        mt="10px"
    >
        <Text fontSize='xl' color={"brand.400"} fontWeight={500}>
            {props.children}
        </Text>
    </Box>
);

export default EmptyPlaceholder;