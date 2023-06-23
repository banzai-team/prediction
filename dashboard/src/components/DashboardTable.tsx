import React from 'react';
import {
    ColumnDef, flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable
} from '@tanstack/react-table';

import {Table, TableContainer, Thead, Tr, Th, Td, Tbody, Box} from '@chakra-ui/react';

const DashboardTable: React.FC = () => {
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

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true,
    });

    return <Box w="90vw" margin="30px auto">
        <TableContainer>
            <Table variant='striped' colorScheme='gray'>
                <Thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                return (
                                    <Th key={header.id} colSpan={header.colSpan}>
                                        {header.isPlaceholder ? null : (
                                            <div>
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                            </div>
                                        )}
                                    </Th>
                                )
                            })}
                        </Tr>
                    ))}
                </Thead>
                <Tbody>
                    {table.getRowModel().rows.map(row => {
                        return (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map(cell => {
                                    return (
                                        <Td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </Td>
                                    )
                                })}
                            </Tr>
                        )
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    </Box>;
};

export default DashboardTable;