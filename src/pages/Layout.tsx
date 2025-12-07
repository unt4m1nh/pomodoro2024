import React, { useEffect, useState, useRef } from 'react';
import './Layout.scss';
import { useAppState } from '../context/GeneralSettings';
import Header from '../components/Header/Header';
import { Coordinate } from '../global/types';
import Pomodoro from './Pomodoro/Pomodoro';


const Layout: React.FC = () => {
  const { currentSetting } = useAppState();
  console.log(currentSetting);
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

  // const toggleFullScreen = () => {
  //   if (!isFullScreen) {
  //     document.documentElement.requestFullscreen();
  //   } else {
  //     document.exitFullscreen();
  //   }
  //   setIsFullScreen(!isFullScreen);
  // };

  useEffect(() => {

    if (settingBtnRef.current) {
      const rect = settingBtnRef.current.getBoundingClientRect();
      setSettingPos({
        x: rect.x,
        y: rect.y,
      });
    }

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
    <div className='layout-container'>
      <Header
        isMobile={isMobile}
        showTask={() => setShowTask(!showTask)}
        showSetting={() => setShowSetting(!showSetting)}
        ref={settingBtnRef}
      />
      <Pomodoro />
    </div>
  );
};

export default Layout;
