import React from 'react';
import {
    ColumnDef, flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable
} from '@tanstack/react-table';

const DashboardTable: React.FC = () => {
    const columns = React.useMemo<ColumnDef<any>[]>(
        () => [
            {
                header: 'Table',
                footer: props => props.column.id,
                columns: [
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
                ],
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

    return (
        <div className="p-2">
            <div className="h-2"/>
            <table>
                <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => {
                            return (
                                <th key={header.id} colSpan={header.colSpan}>
                                    {header.isPlaceholder ? null : (
                                        <div>
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </div>
                                    )}
                                </th>
                            )
                        })}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map(row => {
                    return (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => {
                                return (
                                    <td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
};

export default DashboardTable;