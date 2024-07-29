import React, { useEffect, useState, useRef } from 'react';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand } from '@fortawesome/free-solid-svg-icons';

import alarm1 from '../assets/audio/alarm-clock-short-6402.mp3';
import { useAppState } from '../context/GeneralSettings';
import Clock from '../components/Clock/Clock';
import { ClockTypes } from '../global/const';
import Header from '../components/Header/Header';
import Tasks from '../components/Tasks/Tasks';
import { useTasks } from '../context/TasksContext';

const Home: typeof React.FC = () => {
  //const [time, setTime] = useState(1200);
  const { currentSetting } = useAppState();
  const { currentTasks } = useTasks();
  const [showTask, setShowTask] = useState(false);

  const [isFullScreen, setIsFullScreen] = useState(false);

  const [viewWidth, setViewWidth] = useState(window.innerWidth);
  const [viewHeight, setViewHeight] = useState(window.innerHeight);

  const btnPlayAudioRef = useRef(null);
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

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullScreen(!isFullScreen);
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
        <Header showTask={() => setShowTask(true)} />
      </div>
      <div className='content'>
        <Clock
          mode={ClockTypes.DIGITAL}
          perTimeLeft={100}
          currentTask={currentTasks ? currentTasks[0] : null}
        />
        <audio ref={btnPlayAudioRef} src={''}></audio>
      </div>
      <Tasks isShow={showTask} hideTasks={() => setShowTask(false)} />
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
