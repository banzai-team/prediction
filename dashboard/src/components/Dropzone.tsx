import {Flex, Text} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import React from "react";
import {DownloadIcon} from "@chakra-ui/icons";

const Dropzone: React.FC<{ onDrop: any, acceptTypes?: any }> = props => {
    const { onDrop } = props;
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        // TODO: add files types
        // accept: {
        //     'video/mp4': [],
        //     'video/mov': [],
        // },
        accept: props.acceptTypes,
        onDrop: acceptedFiles => onDrop(acceptedFiles)
    });

    return (
        <Flex
            p="5"
            direction="column"
            align='center'
            justify='center'
            border='1px dashed'
            borderColor="gray.300"
            // borderRadius="md"
            w='100%'
            h='max-content'
            minH={{ base:"auto", sm: "300px" }}
            cursor='pointer'
            _hover={{ background: "gray.50"}}
            {...getRootProps({ className: "dropzone" })}
        >
            <input {...getInputProps()} />
            <DownloadIcon  w='60px' h='60px' color="brand.900"/>
            <Text fontSize='md' fontWeight='500' pt={{ base: "10px", sm: "40px"}} textAlign="center">
                {isDragActive ? (
                    "Drop the file here ..."
                ) : (
                    "Drag and drop or click here"
                )}
            </Text>
        </Flex>
    );
};
export default Dropzone;