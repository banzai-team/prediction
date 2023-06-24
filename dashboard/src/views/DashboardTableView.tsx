import React from 'react';
import {ColumnDef, Row} from '@tanstack/react-table';
import {useNavigate} from 'react-router-dom';
import {useIntl} from 'react-intl';

import {Text} from "@chakra-ui/react";
import MainTable from '../components/MainTable';

const DashboardTableView: React.FC<{objects: any}> = ({ objects }) => {
    const navigate = useNavigate();
    const intl = useIntl();

    const onRowClick = (row: Row<any>): void => {
        navigate(`/object/${row.original.objKey}`);
    };

    const columns = React.useMemo<ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'objKey',
                header: intl.formatMessage({id: 'dashboard.table.key'}),
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
                header: intl.formatMessage({id: 'dashboard.table.taskCount'}),
                cell: ({ getValue }: any) => getValue().length || 0,
                footer: props => props.column.id,
            },
            // {
            //     accessorKey: 'progress',
            //     header: 'Progress',
            //     cell: info => info.getValue(),
            //     footer: props => props.column.id,
            // },
        ], [intl]);

    return <MainTable columns={columns} data={objects.content} onRowClick={onRowClick}/>
};

export default DashboardTableView;