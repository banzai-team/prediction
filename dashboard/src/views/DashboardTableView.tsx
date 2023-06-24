import React from 'react';
import {ColumnDef, Row} from '@tanstack/react-table';
import {useNavigate} from 'react-router-dom';

import {Text} from "@chakra-ui/react";
import MainTable from '../components/MainTable';

const DashboardTableView: React.FC<{objects: any}> = ({ objects }) => {
    const navigate = useNavigate();

    const onRowClick = (row: Row<any>): void => {
        navigate(`/object/${row.original.objKey}`);
    };

    const columns = React.useMemo<ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'objKey',
                header: 'Key',
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
                accessorKey: 'tasks',
                header: 'Task Count',
                cell: ({ getValue }: any) => getValue().length || 0,
                footer: props => props.column.id,
            },
            // {
            //     accessorKey: 'progress',
            //     header: 'Progress',
            //     cell: info => info.getValue(),
            //     footer: props => props.column.id,
            // },
        ], []);

    return <MainTable columns={columns} data={objects.content} onRowClick={onRowClick}/>
};

export default DashboardTableView;