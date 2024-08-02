import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { TTask } from '../global/types';

interface ITasksContext {
  currentTasks: TTask[];
  updateCurrentTasks: (newValue: TTask[]) => void;
}
export const TasksContext = React.createContext({} as ITasksContext);

interface ITasksListProps {
  children: React.ReactNode;
}
export const useTasks = () => {
  return useContext(TasksContext) as ITasksContext;
};

export const TasksList = ({ children }: ITasksListProps) => {
  const [currentTasks, setCurrentTasks] = useState<TTask[]>([]);
  const updateCurrentTasks = (newValue: TTask[]) => {
    setCurrentTasks(newValue);
  };
  return (
    <TasksContext.Provider value={{ currentTasks, updateCurrentTasks }} >
      {children}
    </TasksContext.Provider>
  );
};

export default TasksList;