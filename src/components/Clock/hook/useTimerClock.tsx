import { useEffect, useRef, useState } from 'react';
import { useAppState } from '../../../context/GeneralSettings';
import { time } from 'console';
import { useTimer } from 'react-timer-hook';
import { getAudio } from '../../../utils/getAudio';

type TTimerClock = {
  didStart: boolean;
  expired: boolean;
};

export const useTimerClock = () => {
  const [timerClock, setTimerClock] = useState<TTimerClock>({
    didStart: false,
    expired: false,
  });
  const time = new Date();
  const { hours, seconds, minutes, isRunning, start, pause, resume, restart } =
    useTimer({
      autoStart: false,
      expiryTimestamp: time,
      onExpire: () => {
        setTimerClock({ ...timerClock, expired: true });
      },
    });
  const { currentSetting } = useAppState();

  const alarmSoundRef = useRef<HTMLAudioElement | null>(null);
  if (alarmSoundRef.current) {
    alarmSoundRef.current.volume = currentSetting.volume / 100;
  }

  const handleTimerExpired = () => {
    const alarm = new Audio(getAudio(currentSetting.alarm));
    // alarm.play(); disable alarm sound for now
    const newTime = new Date();
    newTime.setSeconds(newTime.getSeconds() + currentSetting.timer_length);
    restart(newTime, false);
    document.title = 'Pomodoro Clock';
    setTimerClock({ ...timerClock, didStart: false, expired: false });
  };

  const updatePageTitle = () => {
    document.title =
      `${hours > 0 ? hours + ':' : ''}` +
      `${minutes >= 10 ? minutes : '0' + minutes}:${
        seconds >= 10 ? seconds : '0' + seconds
      }`;
  };

  const updateTimerLength = () => {
    const newTime = new Date();
    newTime.setSeconds(newTime.getSeconds() + currentSetting.timer_length);
    restart(newTime, false);
  };

  useEffect(() => {
    handleTimerExpired();
  }, [timerClock.expired]);

  useEffect(() => {
    updateTimerLength();
  }, [currentSetting.timer_length]);

  useEffect(() => {
    updatePageTitle();
  }, [hours, seconds, minutes]);

  return { timerClock, isRunning, hours, minutes, seconds, start, pause, restart, resume, setTimerClock };
};
