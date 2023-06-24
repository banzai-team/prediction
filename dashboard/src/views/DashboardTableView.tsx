import React from 'react';
import {ColumnDef, Row} from '@tanstack/react-table';
import {useNavigate} from 'react-router-dom';

import {Text} from "@chakra-ui/react";
import MainTable from '../components/MainTable';

const DashboardTableView: React.FC<{objects: any}> = ({ objects }) => {
    const navigate = useNavigate();

    const onRowClick = (row: Row<any>): void => {
        navigate(`/object/${row.original.objectId}`);
    };

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

    return <MainTable columns={columns} data={data} onRowClick={onRowClick}/>
};

export default DashboardTableView;