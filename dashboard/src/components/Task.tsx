import {useQuery} from 'react-query';
import {getTaskHistory} from '../domain/api';

export function Task(task: any, id: string | undefined) {
    const {data: taskHistory} = useQuery([id, "taskHistory"], () => getTaskHistory(id));
    
    return {
        id: task?.id,
        name: task?.taskType?.name,
        start: '2016-12-28',
        end: '2016-12-31',
        progress: taskHistory?.data?.progress,
        dependencies: ''
    };
}

export default Task;