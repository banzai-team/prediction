import React from 'react';
import {useNavigate} from 'react-router-dom';
import { useQuery } from "react-query";
import { AddIcon } from '@chakra-ui/icons'
import {FormattedMessage} from 'react-intl';

import {Button, Center, Flex, Link, Spinner} from "@chakra-ui/react";
import PageTitle from "../components/PageTitle";
import {ROUTES} from "./Router";
import {getObjects} from "../domain/api";
import DashboardTableView from "./DashboardTableView";
import EmptyPlaceholder from "../components/EmptyPlaceholder";

// TODO: types
const Dashboard: React.FC = () => {
   const navigate = useNavigate();

   const { data: obj, isLoading } = useQuery(["getObjects"], () => getObjects(), {
      refetchInterval: 5000,
   });

   const onCreate = () => navigate(ROUTES.CREATE);
   
   return (
       <>
          <Flex justifyContent="space-between">
             <PageTitle>
                <FormattedMessage id = "dashboard.title"/>
             </PageTitle>
             <Button
                 size={{ base: "sm", sm: "md" }}
                 leftIcon={<AddIcon />}
                 onClick={onCreate}
             >
                <FormattedMessage id = "dashboard.addFile"/>
             </Button>
          </Flex>
          {
             isLoading
                 ? <Center mt="40px"><Spinner/></Center>
                     : obj?.data && obj?.data?.content.length
                        ? <DashboardTableView objects={obj.data}/>
                        : (
                            <EmptyPlaceholder>
                               <>
                                  <FormattedMessage id = "dashboard.empty.text"/>
                                  <br/>
                                  <FormattedMessage id = "dashboard.empty.help"/>
                                  <Link href={ROUTES.CREATE} ml={1} color="gray.400">
                                     <FormattedMessage id = "dashboard.empty.link"/>
                                  </Link>
                               </>
                            </EmptyPlaceholder>
                        )
          }
       </>
   );
};

export default Dashboard;