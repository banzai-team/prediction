import React from 'react';

import {Heading} from "@chakra-ui/react";

const PageTitle: React.FC<{children?: any}> = ({children}) => (
        <Heading
            fontSize={{base: "2xl", sm: '3xl'}}
            as="h2"
        >
            {children}
        </Heading>
    )

export default PageTitle;