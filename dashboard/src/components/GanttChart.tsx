import React from 'react';
import {FrappeGantt, ViewMode} from 'frappe-gantt-react';

import {Box} from '@chakra-ui/react';

const GanttChart: React.FC<{tasks: any[]}> = ({tasks}) => {
    return <Box mt="20px">
        <FrappeGantt
            tasks={tasks}
            viewMode={ViewMode.Month}
            onClick={(task) => console.log(task)}
            onDateChange={(task, start, end) => console.log(task, start, end)}
            onProgressChange={(task, progress) => console.log(task, progress)}
            onTasksChange={(tasks) => console.log(tasks)}
        />
    </Box>;
};

export default GanttChart;