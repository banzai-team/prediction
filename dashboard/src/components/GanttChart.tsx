import React from 'react';
import {FrappeGantt, ViewMode} from 'frappe-gantt-react';

const GanttChart: React.FC<{tasks: any[]}> = ({tasks}) => {
    return <FrappeGantt
        tasks={tasks}
        viewMode={ViewMode.Month}
        onClick={(task) => console.log(task)}
        onDateChange={(task, start, end) => console.log(task, start, end)}
        onProgressChange={(task, progress) => console.log(task, progress)}
        onTasksChange={(tasks) => console.log(tasks)}
    />
};

export default GanttChart;