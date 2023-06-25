export function Task(task: any) {
    const getOffset = () => {
        const offset = task.offset;
        if (offset === 0) {
            return 'Будет в срок';
        } else if (offset > 0) {
            return `Быстрее на ${offset} (дни)`
        } else if (offset < 0) {
            return `Задержка на ${Math.abs(offset)} (дни)`
        }
    };
    
    const className = `gantt ${task.offset === 0 ? 'gantt-normal' : (task.offset < 0 ? 'gantt-bad' : 'gantt-good')}`;
    
    return {
        id: task?.id.toString(),
        name: `${task?.taskType?.name}: ${getOffset()}`,
        start: new Date(task.plannedStart),
        end: new Date(task.plannedEnd),
        progress: task?.history[0].progress,
        custom_class: className
    };
}

export default Task;