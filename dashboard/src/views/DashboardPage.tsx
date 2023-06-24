import React from 'react';
import {useNavigate} from 'react-router-dom';
import { useQuery } from "react-query";
import { AddIcon } from '@chakra-ui/icons'

import {Button, Center, Flex, Link, Spinner} from "@chakra-ui/react";
import PageTitle from "../components/PageTitle";
import {ROUTES} from "./Router";
import {getObjects} from "../domain/api";
import DashboardTableView from "./DashboardTableView";
import EmptyPlaceholder from "../components/EmptyPlaceholder";

// TODO: types
const Dashboard: React.FC = () => {
   const navigate = useNavigate();

   const obj = useQuery(["getObjects"], () => getObjects(), {
      refetchInterval: 5000,
   });


   const onCreate = () => navigate(ROUTES.CREATE);
   
   return (
       <>
          <Flex justifyContent="space-between">
             <PageTitle>
                Dashboard
             </PageTitle>
             <Button
                 size={{ base: "sm", sm: "md" }}
                 leftIcon={<AddIcon />}
                 onClick={onCreate}
             >
                Add file
             </Button>
          </Flex>
          {
             obj.isLoading
                 ? <Center mt="40px"><Spinner/></Center>
                     : obj.data
                        ? <DashboardTableView objects={obj.data}/>
                        : (
                            <EmptyPlaceholder>
                               <>
                                  Objects list is empty.
                                  <br/>
                                  You can add your first data on
                                  <Link href={ROUTES.CREATE} ml={1} color="gray.400">
                                     Create Page
                                  </Link>
                               </>
                            </EmptyPlaceholder>
                        )
          }
       </>
   );
};

export default Dashboard;