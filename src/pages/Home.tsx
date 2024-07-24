import React, { useEffect, useState, useRef } from 'react';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

//Global import Font Awesoem Icons 5
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import alarm1 from '../assets/audio/alarm-clock-short-6402.mp3';
import { useAppState } from '../context/GeneralSettings';
import { TTask } from '../global/types';
import Clock from '../components/Clock/Clock';

const Home : typeof React.FC = () => {
  //const [time, setTime] = useState(1200);
  const { currentSetting } = useAppState();
  const [mode, setMode] = useState('Pomodoro');

  const [tasks, setTasks]  = useState(null); 
  const [taskValue, setTaskValue] = useState('');
  const [showTask, setShowTask] = useState(false);

  const [isFullScreen, setIsFullScreen] = useState(false);

  const [viewWidth, setViewWidth] = useState(window.innerWidth);
  const [viewHeight, setViewHeight] = useState(window.innerHeight);

  const settingBtnRef = useRef(null);
  const btnPlayAudioRef = useRef(null);

  const [showSetting, setShowSetting] = useState(false);
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600);


  console.log('Component Mounted');
  useEffect(() => {
    console.log('Mounted');
    const handleResize = () => {
      setViewWidth(window.innerWidth);
      setViewHeight(window.innerHeight);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

//   useEffect(() => {
//     if (settingBtnRef.current) {
//       const settingBtnRect = settingBtnRef.current.getBoundingClientRect();
//       console.log('Element position', {
//         top: settingBtnRect.top,
//         left: settingBtnRect.left,
//       });
//       const posX = settingBtnRect.top + settingBtnRect.height;
//       const posY = settingBtnRect.left - settingBtnRect.width * 3.5;
//       setSettingPos({ posX: posX, posY: posY });
//     }
//   }, [isFullScreen]);


  const handleChangeMode = (modeSelected: any) => {
    if (modeSelected === 'Pomodoro') {
      setMode('Pomodoro');
      document.title = modeSelected;
    } else if (modeSelected === 'Short Break') {
      setMode('Short Break');
      document.title = modeSelected;
    } else {
      setMode('Long Break');
      document.title = modeSelected;
    }
  };

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  const addTask = (taskName: string) => {
    if (taskName !== '') {
      const newTask: TTask = {
        id: tasks === null ? 1 : tasks.length + 1,
        name: taskName,
      };
      setTasks((prevState: any) => [...(prevState ?? []), newTask]);
      setTaskValue('');
    }
  };

  const deleteTask = (index: number) => {
    const deletedTask = [...(tasks ?? [])];
    if (tasks) {
      if (index === tasks.length - 1) {
        deletedTask.pop();
      } else {
        for (let i = index; i < deletedTask.length - 1; i++) {
          deletedTask[i] = deletedTask[i + 1];
        }
        deletedTask.pop();
      }
      return setTasks(deletedTask);
    } else {
      return;
    }
  };

  const clearTask = () => {
    setTasks([]);
  };

  const handleDragAndDrop = (results: any) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.draggableId &&
      source.index === destination.index
    )
      return;

    if (type === 'group') {
      const reorederTasks = [...(tasks ?? [])];

      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      //remove one task from start draggable position
      const [removedTask] = reorederTasks.splice(sourceIndex, 1);
      reorederTasks.splice(destinationIndex, 0, removedTask);

      return setTasks(reorederTasks);
    }
  };

  const playAlarm = () => {
    new Audio(alarm1).play();
  };

  const playButtonClicked = () => {
    if (btnPlayAudioRef.current) {
      btnPlayAudioRef.current.play();
    }
  };

  return (
    <div>
      <div
        className='bg-image'
        style={{
          backgroundImage: `url(${currentSetting.background_image})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: viewWidth,
          height: viewHeight,
          opacity: 0.8,
        }}
      ></div>
      <div className={!isFullScreen ? 'header' : 'hide'}>
        <h1>Focusly</h1>
        <div
          className='btn-setting'
          ref={settingBtnRef}
          onClick={() => {
            setShowSetting(!showSetting);
          }}
        >
          <p>Settings</p>
          <FontAwesomeIcon icon={faGear} size='xl' />
        </div>
        <div
          className='btn-task'
          onClick={() => {
            setShowTask(true);
          }}
        >
          <p>Task List</p>
          <FontAwesomeIcon icon={faListCheck} size='xl' />
        </div>
      </div>
      <div className='content'>
        <div className='content-mode-selection'>
          <div
            className={mode === 'Pomodoro' ? 'modeActive' : 'mode'}
            onClick={() => {
              handleChangeMode('Pomodoro');
            }}
          >
            Pomodoro
          </div>
          <div
            className={mode === 'Short Break' ? 'modeActive' : 'mode'}
            onClick={() => {
              handleChangeMode('Short Break');
            }}
          >
            Short Break
          </div>
          <div
            className={mode === 'Long Break' ? 'modeActive' : 'mode'}
            onClick={() => {
              handleChangeMode('Long Break');
            }}
          >
            Long Break
          </div>
        </div>
        <Clock mode='Digital' perTimeLeft={100} currentTask={null}/>
        <audio
          ref={btnPlayAudioRef}
          src={''}
        ></audio>
        <div className={showTask ? 'task-container-active' : 'task-container'}>
          <div className='task-content'>
            <div className='input-row'>
              <input
                type='text'
                placeholder='Add task here'
                value={taskValue}
                onChange={(e) => setTaskValue(e.target.value)}
              ></input>
              <FontAwesomeIcon
                className='btn-add'
                icon={faPlusCircle}
                size='3x'
                onClick={() => {
                  addTask(taskValue);
                }}
              ></FontAwesomeIcon>
            </div>
            <DragDropContext onDragEnd={handleDragAndDrop}>
              <div className='task-list'>
                <Droppable droppableId='ROOT' type='group'>
                  {(provided: any) => (
                    <div
                      className='task-list'
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {tasks?.map((task: TTask, index: number) => (
                        <Draggable
                          draggableId={task.id}
                          key={task.id}
                          index={index}
                        >
                          {(provided: any) => (
                            <div
                              className='task-item'
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                            >
                              <h3 className='task-title'>{task.name}</h3>
                              <FontAwesomeIcon
                                onClick={() => {
                                  deleteTask(index);
                                }}
                                icon={faTrashCan}
                                className='icon-delete'
                              ></FontAwesomeIcon>
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
          </div>
          <div className='control-btn'>
            <button onClick={clearTask}>Clear Task</button>
            <FontAwesomeIcon
              icon={faXmark}
              size='2xl'
              onClick={() => {
                setShowTask(false);
              }}
              className='icon'
            />
          </div>
        </div>
      </div>
      <FontAwesomeIcon
        onClick={toggleFullScreen}
        className='btn-fullscreen icon'
        icon={faExpand}
        size='3x'
      />
      {/* {showSetting && <Setting posX={settingPos.posX} posY={settingPos.posY} />} */}
      <div className='footer'></div>
    </div>
  );
};

export default Home;
