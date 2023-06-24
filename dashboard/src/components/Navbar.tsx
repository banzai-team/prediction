import React from 'react';
import { Avatar, Button, Flex, Image, Link, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import {FormattedMessage} from 'react-intl';

import { ROUTES } from "../views/Router";
import {useAuthContext} from '../context/AuthContext';

const Navbar: React.FC<{children?: any}> = ({ children }) => {
    // TODO: add endpoint
    const {setIsAuth} = useAuthContext();

    const Logout = () => setIsAuth(false);
    return (
        <Flex
            zIndex={10}
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
            <Link href={ROUTES.DASHBOARD}>
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
                            <FormattedMessage id = "logout"/>
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Flex>
    );
};

export default Navbar ;