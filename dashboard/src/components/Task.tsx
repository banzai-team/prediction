export function Task(task: any, id: string | undefined) {
    
    return {
        id: task?.id,
        name: task?.taskType?.name,
        start: '2016-12-28',
        end: '2016-12-31',
        progress: task?.history[0].progress,
        dependencies: ''
    };
}

export default Task;