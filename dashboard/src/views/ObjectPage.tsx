import React from 'react';
import {useParams} from "react-router-dom";
import {Flex, Text} from "@chakra-ui/react";

import PageTitle from "../components/PageTitle";
import BackButton from "../components/BackButton";
import {ROUTES} from "./Router";
import GanttChart from '../components/GanttChart';
import {getTasks} from '../domain/api';
import {useQuery} from 'react-query';
import Task from '../components/Task';
import {TaskViewDto} from '../objects/taskDto';

const ObjectPage: React.FC = () => {
    const { id } = useParams();
    const {data: tasks} = useQuery([id, "tasks"], () => getTasks(id));
    const tasksForMap: TaskViewDto[] = tasks?.data;

    const tasksData = tasksForMap && tasksForMap?.length > 0 ? tasksForMap?.map(task => {
        return Task(task, task.id.toString());
    }) : [];

    const criticalSum = tasks?.data.reduce( (a: number, b: any) => {
        return b.taskType.isCritical ? a + b.offset : a;
    }, 0);
    
    return (
        <>
            <PageTitle>
                Object #{id}
            </PageTitle>
            <BackButton backRoute={ROUTES.DASHBOARD}>Back to dashboard</BackButton>

            <Flex
                pt="20px"
                alignItems="center"
            >
                <Text>Sum of Critical Offsets:</Text>
               <Text pl="10px" fontSize="xl" fontWeight="bold">{criticalSum}</Text>
            </Flex>
            <GanttChart tasks={tasksData}/>
        </>
    )
};

export default ObjectPage;