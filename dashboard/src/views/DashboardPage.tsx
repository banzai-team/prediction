import React from 'react';
import {ColumnDef} from '@tanstack/react-table';

import {Button, Flex} from "@chakra-ui/react";
import DashboardTable from '../components/DashboardTable';
import PageTitle from "../components/PageTitle";

// TODO: types
const Dashboard: React.FC = () => {
   const columns = React.useMemo<ColumnDef<any>[]>(
       () => [
          {
             accessorKey: 'objectId',
             header: 'Object Id',
             cell: info => info.getValue(),
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
             <Button>add file</Button>
          </Flex>
          <DashboardTable columns={columns} data={data}/>
       </>
   );
};

export default Dashboard;