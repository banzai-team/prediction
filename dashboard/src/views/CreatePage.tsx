import React from 'react';
import { useFormik } from "formik";
import { useMutation } from "react-query";
import {Box, Button, Center, Flex, Text, IconButton} from "@chakra-ui/react";
import { AttachmentIcon, CloseIcon } from '@chakra-ui/icons'

import { sendModel } from "../domain/api";
import PageTitle from "../components/PageTitle";
import Dropzone from "../components/Dropzone";
import BackButton from "../components/BackButton";
import {ROUTES} from "./Router";

const CreatePage: React.FC = () => {
    const send = useMutation(sendModel, {
        // onSuccess: (data) => {
        //     navigate(`/jobs/${data.data}`);
        // }
    });

    const formik = useFormik<{
        files: {
            path: string;
            type: "file" | "folder";
            name: string;
            mimeType: string;
            data: string;
        }[]
    }>({
        initialValues: {
            files: [],
        },
        onSubmit: async (values) => send.mutate({ file: values.files[0] }),
        // onSubmit: async (values) => console.log(values),
    });

    const hasFile = !!formik.values.files.length;

    return (
        <>
            <PageTitle>
                Add file
            </PageTitle>
            <BackButton backRoute={ROUTES.DASHBOARD}>Back to dashboard</BackButton>
            <Center pt="20px">
                <form onSubmit={formik.handleSubmit}>
                    <Flex
                        maxW={{ base: "100%", sm: "2xl" }}
                        flexDirection={{ base: "column", sm: "row" }}

                    >
                        <Box
                            pr={{ base: "0", sm: "20px" }}
                            pb={{ base: "20px", sm: "0" }}
                            maxWidth={{ base: "100%", sm: "50%" }}
                            flex={1}
                        >
                            {hasFile
                                ? (
                                    <Flex
                                        align='center'
                                        pt="2"
                                        fontWeight="bold"
                                    >
                                        <AttachmentIcon w='30px' h='30px' mr="10px" color="brand.900" />
                                        <Text noOfLines={1} >{formik.values.files.map(file => file.name)}</Text>
                                        <IconButton
                                            ml="10px"
                                            aria-label='delete file'
                                            icon={<CloseIcon />}
                                            fontSize='14px'
                                            variant='outline'
                                            size="sm"
                                            onClick={() => formik.setFieldValue("files", [])}
                                        />
                                    </Flex>
                                ) :
                                <Dropzone
                                    onDrop={(acceptedFiles: any[]) => {
                                        acceptedFiles.forEach((file) => {
                                            const reader = new FileReader()

                                            reader.onabort = () => console.log('file reading was aborted')
                                            reader.onerror = () => console.log('file reading has failed')
                                            reader.onload = () => {
                                                // Do whatever you want with the file contents
                                                //const binaryStr = reader.result
                                                formik.setFieldValue("files", [file]);
                                            }
                                            reader.readAsArrayBuffer(file)
                                        })
                                    }}
                                />
                            }

                        </Box>
                        <Box flex={1} >
                            <Text>
                                {/*TODO: fix text*/}
                                Lorem ipsum dolor sit amet, at eos solum periculis, iusto aliquip complectitur est ad.
                            </Text>
                            <Button
                                isLoading={send.isLoading}
                                type="submit"
                                mt="20px"
                                variant="brand"
                                isDisabled={!hasFile}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Flex>
                </form>
            </Center>

        </>
    );
};

export default CreatePage;