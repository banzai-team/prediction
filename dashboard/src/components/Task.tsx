export function Task(task: any) {
    const start = task.plannedStart.substring(0, 10);
    const end = task.plannedEnd.substring(0, 10);
    
    return {
        id: task?.id.toString(),
        name: task?.taskType?.name,
        start,
        end,
        progress: task?.history[0].progress,
    };
}

export default Task;