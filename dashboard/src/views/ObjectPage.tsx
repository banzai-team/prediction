import React from 'react';
import {useParams} from "react-router-dom";
import {Center, Flex, Spinner, Text} from "@chakra-ui/react";

import PageTitle from "../components/PageTitle";
import BackButton from "../components/BackButton";
import {ROUTES} from "./Router";
import GanttChart from '../components/GanttChart';
import {getFullTasks, getTasks} from '../domain/api';
import {useQuery} from 'react-query';
import Task from '../components/Task';
import {TaskViewDto} from '../objects/taskDto';
import EmptyPlaceholder from "../components/EmptyPlaceholder";
import {FormattedMessage} from "react-intl";

const ObjectPage: React.FC = () => {
    const { id } = useParams();
    const {data: tasks, isLoading, error} = useQuery([id, "tasks"], () => getTasks(id));

    const {data: fullTasks} = useQuery([id, "fullTasks"], () => getFullTasks(id));
    const tasksForMap: TaskViewDto[] = fullTasks?.data?.tasks;

    const tasksData = tasksForMap && tasksForMap?.length > 0 ? tasksForMap?.map(task => {
        return Task(task);
    }) : [];

    const criticalSum = tasks?.data.reduce( (a: number, b: any) => {
        return b.taskType.isCritical ? a + b.offset : a;
    }, 0);

    return (
        <>
            <PageTitle>
                <FormattedMessage id = "object.title" values={{id}}/>
            </PageTitle>
            <BackButton backRoute={ROUTES.DASHBOARD}>
                <FormattedMessage id = "object.back"/>
            </BackButton>
            {
                isLoading
                    ? <Center mt="40px"><Spinner/></Center>
                    : error
                        ? <EmptyPlaceholder>
                            <FormattedMessage id = "object.error"/>
                        </EmptyPlaceholder>
                        : !tasksData.length
                            ? <EmptyPlaceholder>
                                <FormattedMessage id = "object.empty"/>
                            </EmptyPlaceholder>
                            : (
                                <>
                                    <Flex
                                        pt="20px"
                                        alignItems="center"
                                    >
                                        <Text><FormattedMessage id = "object.offsets"/></Text>
                                        <Text pl="10px" fontSize="xl" fontWeight="bold">{criticalSum}</Text>
                                    </Flex>
                                    <GanttChart tasks={tasksData}/>
                                </>
                            )
            }
        </>
    )
};

export default ObjectPage;