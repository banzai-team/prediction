import React from 'react';

import {Button} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {ArrowBackIcon} from "@chakra-ui/icons";

type BackButtonProps = {
    children?: any;
    backRoute: string;
}
const BackButton: React.FC<BackButtonProps> = ({children, backRoute}) => {
    const navigate = useNavigate();
    const onBack = () => {
        if (window.history.length <= 2) {
            navigate(backRoute);
        } else {
            navigate(-1);
        }
    }

    console.log(window.history, window.history.length);
    return (
        <Button
            onClick={onBack}
            variant='link'
            color="brand.400"
            fontWeight="400"
            size="sm"
            leftIcon={<ArrowBackIcon />}
        >
            {children || "back"}
        </Button>
    );
};

export default BackButton;