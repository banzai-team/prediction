import React from 'react';
import {Flex, Box, Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Avatar
} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

import {ROUTES} from "../views/Router";

const Navbar: React.FC<{children?: any}> = ({ children }) => {
    const navigate = useNavigate();

    const Logout = () => navigate(ROUTES.LOGIN);
    return (
        <Flex
            height="45px"
            background="brand.900"
            color="white"
            minW="100%"
            py="10px"
            px="20px"
            justifyContent="space-between"
        >
            <Box>Logo</Box>
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