import React from 'react';
import {Flex, Box, Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Avatar,
    Link,
    Image
} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

import {ROUTES} from "../views/Router";

const Navbar: React.FC<{children?: any}> = ({ children }) => {
    // TODO: add endpoint
    const navigate = useNavigate();

    const Logout = () => navigate(ROUTES.LOGIN);
    return (
        <Flex
            position="fixed"
            top={0}
            left={0}
            height="45px"
            background="brand.900"
            color="white"
            minW="100%"
            py="10px"
            px="20px"
            justifyContent="space-between"
        >
            <Link href={ROUTES.DASHBOARD} isExternal>
                <Image src='/logo-light.svg' alt='Logo' h="100%"/>
            </Link>
            <Flex alignItems={'center'}>
                <Menu>
                    <MenuButton
                        as={Button}
                        rounded={'full'}
                        variant={'link'}
                        cursor={'pointer'}
                        minW={0}>
                        <Avatar
                            size={'sm'}
                        />
                    </MenuButton>
                    <MenuList>
                        <MenuItem
                            color="black"
                            onClick={Logout}
                        >
                            Logout
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Flex>
    );
};

export default Navbar ;