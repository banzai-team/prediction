import React from 'react';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    // getPaginationRowModel,
    Row,
    useReactTable
} from '@tanstack/react-table';

import {Table, TableContainer, Thead, Tr, Th, Td, Tbody, Box} from '@chakra-ui/react';

interface Props {
    columns: ColumnDef<any>[];
    data: any;
    onRowClick?: (row: Row<any>) => void;
}

// TODO: types
const MainTable: React.FC<Props> = ({columns, data, onRowClick}) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        // getPaginationRowModel: getPaginationRowModel(),
        debugTable: true,
    });

    return <Box mt="20px">
        <TableContainer>
            <Table
                // variant='striped'
                colorScheme='gray'
                size={{ base: "sm", sm: "md" }}
            >
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
                            <Tr
                                key={row.id}
                                onClick={() => onRowClick && onRowClick(row)}
                                _hover={{
                                    cursor: onRowClick ? "pointer" : "auto",
                                    background: onRowClick ? "gray.100" : "none",
                                }}
                            >
                                {row.getVisibleCells().map(cell => {
                                    return (
                                        <Td
                                            key={cell.id}
                                        >
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

export default MainTable;