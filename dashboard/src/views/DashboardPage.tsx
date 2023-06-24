import React from 'react';
import {ColumnDef, Row} from '@tanstack/react-table';
import {useNavigate} from 'react-router-dom';
// import { CellProps } from 'react-table';

import {Button, Flex, Text} from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons'
import DashboardTable from '../components/DashboardTable';
import PageTitle from "../components/PageTitle";
import {ROUTES} from "./Router";

// TODO: types
const Dashboard: React.FC = () => {
   const navigate = useNavigate();

   const onRowClick = (row: Row<any>): void => {
      navigate(`/object/${row.original.objectId}`);
   };

   const onCreate = () => navigate(ROUTES.CREATE);

   const columns = React.useMemo<ColumnDef<any>[]>(
       () => [
          {
             accessorKey: 'objectId',
             header: 'Object Id',
             cell: ({ getValue }: any) => (
                 <Text
                     fontWeight="bold"
                 >
                    {getValue()}
                 </Text>
             ),
             footer: props => props.column.id,
          },
          {
             accessorKey: 'time',
             header: 'Time',
             cell: info => info.getValue(),
             footer: props => props.column.id,
          },
          {
             accessorKey: 'taskCount',
             header: 'Task Count',
             cell: info => info.getValue(),
             footer: props => props.column.id,
          },
          {
             accessorKey: 'progress',
             header: 'Progress',
             cell: info => info.getValue(),
             footer: props => props.column.id,
          },
       ], []);

   const data = [
      {
         objectId: "1",
         time: "21232134214",
         taskCount: 5,
         progress: 30,
      },
      {
         objectId: "1",
         time: "21232134214",
         taskCount: 5,
         progress: 30,
      },
      {
         objectId: "1",
         time: "21232134214",
         taskCount: 5,
         progress: 30,
      },
      {
         objectId: "1",
         time: "21232134214",
         taskCount: 5,
         progress: 30,
      },
      {
         objectId: "1",
         time: "21232134214",
         taskCount: 5,
         progress: 30,
      },
   ];
   
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
          <DashboardTable columns={columns} data={data} onRowClick={onRowClick}/>
       </>
   );
};

export default Dashboard;