import React, { useEffect, useState, useRef } from 'react';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompress, faExpand } from '@fortawesome/free-solid-svg-icons';
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

  const isMobile = window.innerWidth < 640;
  const settingBtnRef = useRef<HTMLDivElement | null>(null);
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600);

  useEffect(() => {
    console.log('Mounted');

    if (settingBtnRef.current) {
      const rect = settingBtnRef.current.getBoundingClientRect();
      setSettingPos({
        x: rect.x,
        y: rect.y,
      });
    }
  }, []);

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    const handleResize = () => {
      setViewWidth(window.innerWidth);
      setViewHeight(window.innerHeight);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [viewWidth, viewHeight]);

  return (
    <>
      <div
        className='bg-image'
        style={{
          backgroundImage: !isMobile ? `url(${currentSetting. desktop_background})` : `url(${currentSetting.mobile_background})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          width: viewWidth,
          height: viewHeight,
          opacity: 0.8,
        }}
      ></div>
      <div className={!isFullScreen ? '' : 'hide'}>
        <Header
          isMobile={isMobile}
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
      {showSetting && <Setting isMobile={isMobile} x={settingPos.x} y={settingPos.y} hideSetting={() => setShowSetting(false)} />}
      <div className='footer'></div>
    </>
  );
};

export default Home;
