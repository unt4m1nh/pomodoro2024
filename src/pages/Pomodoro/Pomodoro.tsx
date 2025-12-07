import Clock from "../../components/Clock/Clock";
import Tasks from "../../components/Tasks/Tasks";
import { useTasks } from "../../context/TasksContext";

const Pomodoro: React.FC = () => {
    // Get tasks from context if needed in the future
    const { currentTasks } = useTasks();

    return (
        <>
            <Clock mode="Digital" perTimeLeft={100} currentTask={currentTasks[0]} /> 
            <Tasks isShow={false} hideTasks={() => {}} />
        </>
    );
};

export default Pomodoro;