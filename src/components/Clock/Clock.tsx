import { useTimer } from 'react-timer-hook';
import ClockController from './ClockController';
import { useRef, useEffect, useState } from 'react';
import AnalogClock from './AnalogClock';
import Mode from '../Mode/Mode';
import { TTask } from '../../global/types';
import { useAppState } from '../../context/GeneralSettings';
import React from 'react';

//@ts-ignore
import styles from './index.module.scss';
import { getAudio } from '../../utils/getAudio';

interface IClockProps {
  mode: 'Digital' | 'Analog';
  perTimeLeft: number;
  currentTask: TTask | null;
}

const Clock = ({ mode, perTimeLeft, currentTask }: IClockProps) => {
  const { currentSetting } = useAppState();
  console.log('Clock re-render', currentSetting.timer_length);
  const time = new Date();
  time.setSeconds(time.getSeconds() + currentSetting.timer_length);
  console.log(time);
  const autoStart = false;
  const alarmSoundRef = useRef<HTMLAudioElement | null>(null);
  const [didStart, setDidStart] = useState(false);
  const [expried, setExpired] = useState(false);
  const { hours, seconds, minutes, isRunning, start, pause, resume, restart } =
    useTimer({
      autoStart,
      expiryTimestamp: time,
      onExpire: () => {
        setExpired(true);
      },
    });

  const onChangeMode = (timerLength: number) => {
    const newTime = new Date();
    newTime.setSeconds(newTime.getSeconds() + timerLength);
    restart(newTime, false);
    setDidStart(false);
  };

  useEffect(() => {
    if (alarmSoundRef.current) {
      alarmSoundRef.current.volume = currentSetting.volume / 100;
    }
  }, []);

  // Update page title
  useEffect(() => {
    document.title =
      `${hours > 0 ? hours + ':' : ''}` +
      `${minutes >= 10 ? minutes : '0' + minutes}:${
        seconds >= 10 ? seconds : '0' + seconds
      }`;
  }, [hours, minutes, seconds]);

  // Listen to any changes in the timer length and update the timer accordingly
  useEffect(() => {
    const newTime = new Date();
    newTime.setSeconds(newTime.getSeconds() + currentSetting.timer_length);
    restart(newTime, false);
    setDidStart(false);
  }, [currentSetting.timer_length]);

  // Play alarm sound and restart if timer expried
  useEffect(() => {
    if (didStart) {
      const alarm = new Audio(getAudio(currentSetting.alarm));
      alarm.play();
      const newTime = new Date();
      newTime.setSeconds(newTime.getSeconds() + currentSetting.timer_length);
      restart(newTime, false);
      document.title = 'Pomodoro Clock';
      setDidStart(false);
      setExpired(false);
    }
  }, [expried]);

  return (
    <>
      <Mode didStart={didStart} onChangeMode={onChangeMode} />
      {mode === 'Digital' ? (
        <div className={styles['clock-container']}>
          <h1 className={styles['task-title']} style={{ margin: 20 }}>
            {currentTask ? currentTask.name : 'You are not on any tasks !'}
          </h1>
          <h1 className={styles['timer']}>
            {hours > 0 && hours + ':'}
            {`${minutes >= 10 ? minutes : '0' + minutes}:${
              seconds >= 10 ? seconds : '0' + seconds
            }`}
          </h1>
        </div>
      ) : (
        <AnalogClock
          minutes={minutes}
          seconds={seconds}
          perTimeLeft={perTimeLeft}
        />
      )}
      <ClockController
        didStart={didStart}
        isRunning={isRunning}
        onPause={pause}
        onStart={() => {
          start();
          setDidStart(true);
        }}
        onReset={() => {
          const newTime = new Date();
          newTime.setSeconds(
            newTime.getSeconds() + currentSetting.timer_length
          );
          restart(newTime, false);
          setDidStart(false);
        }}
        onResume={resume}
      />
    </>
  );
};

export default Clock;
