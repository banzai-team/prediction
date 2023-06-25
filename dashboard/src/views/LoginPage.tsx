import React from 'react';
import {FormattedMessage, useIntl} from 'react-intl';
import {
    Icon,
    Flex,
    Text,
    Input,
    Button,
    InputGroup,
    InputLeftElement,
    FormControl,
    FormLabel,
} from "@chakra-ui/react";
import {BiLock} from "react-icons/bi";
import {AiOutlineUser} from "react-icons/ai";
import {RiLockPasswordLine} from "react-icons/ri";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "./Router";
import {useAuthContext} from '../context/AuthContext';

const validationSchema = Yup.object({
    login: Yup.string().required("required"),
    password: Yup.string().required("required"),
});

const LoginPage: React.FC<{}> = () => {
    const {setIsAuth} = useAuthContext();
    const intl = useIntl();

    const navigate = useNavigate();
    const formik = useFormik<{
        login: string,
        password: string
    }>({
        initialValues: {
            login: "",
            password: ""
        },
        // TODO: add endpoint
        onSubmit: async (values) => navigate(ROUTES.DASHBOARD),
        validationSchema
    });
    
    const onSubmit = () => {
        setIsAuth(true);
        localStorage.setItem("auth", "true");
    };

    return (
        <Flex maxW='md' w="100%" alignItems="center" direction="column">
            <Flex
                borderRadius="50%"
                background={"brand.900"}
                w="60px"
                h="60px"
                alignItems="center"
                justifyContent="center"
                color={"white"}
            >
                <Icon as={BiLock} fontSize="38px"/>
            </Flex>
            <Text fontWeight={600} fontSize={25} pt={3} pb={9}>
                <FormattedMessage id = "login.title"/>
            </Text>

            <form onSubmit={onSubmit} style={{ width: "100%" }}>
                <FormControl>
                    <FormLabel>
                        <FormattedMessage id = "login.username"/>
                    </FormLabel>
                    <InputGroup mb={5}>
                        <InputLeftElement pointerEvents='none'>
                            <Icon as={AiOutlineUser} color='gray.300'/>
                        </InputLeftElement>
                        <Input
                            placeholder={intl.formatMessage({id: 'login.username.placeholder'})}
                            focusBorderColor="gray.400"
                            errorBorderColor="brand.400"
                            {...formik.getFieldProps("login")}
                            isInvalid={!!formik.errors.login}
                        />
                    </InputGroup>
                </FormControl>
                <FormControl>
                    <FormLabel>
                        <FormattedMessage id = "login.password"/>
                    </FormLabel>
                    <InputGroup mb={5} w="100%">
                        <InputLeftElement pointerEvents='none'>
                            <Icon as={RiLockPasswordLine} color='gray.300'/>
                        </InputLeftElement>
                        <Input
                            type="password"
                            placeholder={intl.formatMessage({id: 'login.password.placeholder'})}
                            focusBorderColor="gray.400"
                            errorBorderColor="brand.400"
                            {...formik.getFieldProps("password")}
                            isInvalid={!!formik.errors.password}
                        />
                    </InputGroup>
                </FormControl>
                <Button
                    variant={"brand"}
                    isLoading={formik.isSubmitting}
                    type="submit"
                    size="lg"
                    w="100%"
                    mt={8}
                >
                    <FormattedMessage id = "login.submit"/>
                </Button>
            </form>

        </Flex>
    );
};

export default LoginPage;