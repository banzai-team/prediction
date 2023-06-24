import React from 'react';
import {useParams} from "react-router-dom";

import PageTitle from "../components/PageTitle";
import BackButton from "../components/BackButton";
import {ROUTES} from "./Router";
import GanttChart from '../components/GanttChart';

import {useQuery,} from 'react-query'
import {getTasks} from '../domain/api';

const ObjectPage: React.FC = () => {
    const { id } = useParams();

    const { data, isLoading } = useQuery([id, "tasks"], () => getTasks(id));
    console.log(data, isLoading);
    
    const tasks: any[] = [
        {
            id: 'Task 1',
            name: 'Task 1',
            start: '2016-12-28',
            end: '2016-12-31',
            progress: 60,
            dependencies: 'Task 2'
        },
        {
            id: 'Task 2',
            name: 'Task 2',
            start: '2016-11-28',
            end: '2017-03-03',
            progress: 90,
            dependencies: ''
        },
        {
            id: 'Task 3',
            name: 'Task 3',
            start: '2016-11-28',
            end: '2016-12-31',
            progress: 20,
            dependencies: 'Task 4'
        },
        {
            id: 'Task 4',
            name: 'Task 4',
            start: '2016-11-30',
            end: '2016-12-15',
            progress: 55,
            dependencies: ''
        },
    ];

    return (
        <>
            <PageTitle>
                Object #{id}
            </PageTitle>
            <BackButton backRoute={ROUTES.DASHBOARD}>Back to dashboard</BackButton>
            <GanttChart tasks={tasks}/>
        </>
    )
};

export default ObjectPage;