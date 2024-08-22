import {
  faPlusCircle,
  faTrashCan,
  faXmark,
  faEllipsisV,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTasks } from '../../context/TasksContext';
import { TTask } from '../../global/types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useEffect, useRef, useState } from 'react';
import ButtonMode from '../Button/Mode/ButtonMode';
import React from 'react';

//@ts-ignore
import styles from './index.module.scss';
import ItemAction from './ItemAction';

interface ITasksProps {
  isShow: boolean;
  hideTasks: () => void;
}

const Tasks = ({ isShow, hideTasks }: ITasksProps) => {
  const { currentTasks, updateCurrentTasks } = useTasks();
  const [taskValue, setTaskValue] = useState('' as string);
  const [eddtingTask, setEdditingTask] = useState<number | null>(null);
  const [showItemAction, setShowItemAction] = useState(false);
  const taskRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log(taskRef.current?.getBoundingClientRect());
  }, []);

  console.log('currentTasks is Array', Array.isArray(currentTasks));

  const handleDragAndDrop = (results: any) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.draggableId &&
      source.index === destination.index
    )
      return;

    if (type === 'group') {
      const reorederTasks: TTask[] = [...(currentTasks ?? [])].map((task) => ({
        ...task,
      }));

      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      //remove one task from start draggable position
      const [removedTask] = reorederTasks.splice(sourceIndex, 1);
      reorederTasks.splice(destinationIndex, 0, removedTask);

      return updateCurrentTasks(reorederTasks);
    }
  };

  const addTask = (taskName: string) => {
    console.log('task name', taskName);
    console.log('task list', currentTasks);
    if (taskName !== '') {
      const newTask: TTask = {
        id: currentTasks === null ? 1 : currentTasks.length + 1,
        name: taskName,
      };
      const newTaskList = currentTasks ?? [];
      newTaskList.push(newTask);
      console.log('new task list', newTaskList);
      setTaskValue('');
      return updateCurrentTasks(newTaskList);
    }
  };

  const deleteTask = (index: number) => {
    console.log('delete task', index);
    const deletedTask = [...(currentTasks ?? [])];
    if (currentTasks) {
      if (index === currentTasks.length) {
        deletedTask.pop();
      } else {
        for (let i = index - 1; i < deletedTask.length - 1; i++) {
          deletedTask[i] = deletedTask[i + 1];
        }
        deletedTask.pop();
      }
      return updateCurrentTasks(deletedTask);
    } else {
      return;
    }
  };

  const clearTask = () => {
    updateCurrentTasks([]);
  };

  return (
    <div
      className={
        isShow ? styles['task-container-active'] : styles['task-container']
      }
    >
      <div className={styles['task-content']}>
        <div className={styles['input-row']}>
          <input
            type='text'
            placeholder='Add task here'
            value={taskValue}
            onChange={(e) => setTaskValue(e.target.value)}
          ></input>
          <ButtonMode
            onClick={() => {
              addTask(taskValue);
            }}
            color='var(--green-400)'
            textColor='#fff'
            size='large'
          >
            Add Task
            <FontAwesomeIcon
              className={styles['btn-add']}
              icon={faPlusCircle}
              size='lg'
              onClick={() => {
                addTask(taskValue);
              }}
            ></FontAwesomeIcon>
          </ButtonMode>
        </div>
        <DragDropContext onDragEnd={handleDragAndDrop}>
          <div className={styles['task-list']}>
            <Droppable droppableId='ROOT' type='group'>
              {(provided: any) => (
                <div
                  className={styles['task-list']}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {currentTasks?.map((task: TTask, index: number) => (
                    <Draggable
                      draggableId={task.id.toString()}
                      key={task.id}
                      index={index}
                    >
                      {(provided: any) => (
                        <div
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <div ref={taskRef} className={styles['task-item']}>
                            <p className={styles['task-title']}>{task.name}</p>
                            <FontAwesomeIcon
                              onClick={() => {
                                setEdditingTask(task.id);
                                setShowItemAction(!showItemAction);
                              }}
                              icon={faEllipsisV}
                              className={styles['icon-delete']}
                            ></FontAwesomeIcon>
                            <ItemAction
                              isShow={showItemAction && eddtingTask === task.id}
                              onDelete={() => {
                                deleteTask(index);
                              }}
                              onEdit={() => {
                                console.log('edit task');
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
        <div className={styles['control-btn']}>
          {/* <button onClick={clearTask}>Clear Task</button> */}
          <div className={styles['btn-clear']} onClick={clearTask}>
            Clear Task
            <FontAwesomeIcon icon={faTrashCan} size='lg'></FontAwesomeIcon>
          </div>
          <FontAwesomeIcon
            icon={faXmark}
            size='2xl'
            style={{color: 'var(--green-400)'}}
            onClick={hideTasks}
            className={styles['icon']}
          />
        </div>
      </div>
    </div>
  );
};

export default Tasks;
