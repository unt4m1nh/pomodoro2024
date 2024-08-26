import React, { useEffect, useState, useRef } from 'react';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompress, faExpand } from '@fortawesome/free-solid-svg-icons';

//@ts-ignore
import { useAppState } from '../context/GeneralSettings';
import Clock from '../components/Clock/Clock';
import { ClockTypes } from '../global/const';
import Header from '../components/Header/Header';
import Tasks from '../components/Tasks/Tasks';
import { useTasks } from '../context/TasksContext';
import Setting from '../components/Setting/Setting';
import { Coordinate } from '../global/types';

const Home: React.FC = () => {
  const { currentSetting } = useAppState();
  const { currentTasks } = useTasks();
  const [showTask, setShowTask] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  const [settingPos, setSettingPos] = useState<Coordinate>({
    x: 0,
    y: 0,
  });

  const [isFullScreen, setIsFullScreen] = useState(false);

  const [viewWidth, setViewWidth] = useState(window.innerWidth);
  const [viewHeight, setViewHeight] = useState(window.innerHeight);

  const btnPlayAudioRef = useRef<HTMLAudioElement | null>(null);
  const settingBtnRef = useRef<HTMLDivElement | null>(null);
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600);

  useEffect(() => {
    console.log('Mounted');
    const handleResize = () => {
      setViewWidth(window.innerWidth);
      setViewHeight(window.innerHeight);
    };

    if (settingBtnRef.current) {
      const rect = settingBtnRef.current.getBoundingClientRect();
      setSettingPos({
        x: rect.x,
        y: rect.y,
      });
    }

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

  return (
    <div>
      <div
        className='bg-image'
        style={{
          backgroundImage: `url(${currentSetting.background_image})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          width: viewWidth,
          height: viewHeight,
          opacity: 0.8,
        }}
      ></div>
      <div className={!isFullScreen ? 'header' : 'hide'}>
        <Header
          showTask={() => setShowTask(!showTask)}
          showSetting={() => setShowSetting(!showSetting)}
          ref={settingBtnRef}
        />
      </div>
      <Clock
        mode={ClockTypes.DIGITAL}
        perTimeLeft={100}
        currentTask={currentTasks ? currentTasks[0] : null}
      />
      <audio ref={btnPlayAudioRef} src={''}></audio>
      <Tasks isShow={showTask} hideTasks={() => setShowTask(false)} />
      {
        !isFullScreen ? (

          <FontAwesomeIcon
            onClick={toggleFullScreen}
            className='btn-fullscreen icon'
            icon={faExpand}
            size='3x'
          />
        ) : (
          <FontAwesomeIcon
            onClick={toggleFullScreen}
            className='btn-fullscreen icon'
            icon={faCompress}
            size='3x'
           />
        )
      }
      {showSetting && <Setting x={settingPos.x} y={settingPos.y} hideSetting={() => setShowSetting(false)} />}
      <div className='footer'></div>
    </div>
  );
};

export default Home;
