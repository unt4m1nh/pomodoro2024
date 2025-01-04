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
import { useTimerClock } from './hook/useTimerClock';

interface IClockProps {
  mode: 'Digital' | 'Analog';
  perTimeLeft: number;
  currentTask: TTask | null;
}

const Clock = ({ mode, perTimeLeft, currentTask }: IClockProps) => {
  const { currentSetting } = useAppState();
  const {
    isRunning,
    timerClock,
    hours,
    seconds,
    minutes,
    start,
    pause,
    restart,
    resume,
    setTimerClock,
  } = useTimerClock();
  const onChangeMode = (timerLength: number) => {
    const newTime = new Date();
    newTime.setSeconds(newTime.getSeconds() + timerLength);
    restart(newTime, false);
    setTimerClock({ ...timerClock, didStart: false });
  };

  return (
    <>
      <Mode didStart={timerClock.didStart} onChangeMode={onChangeMode} />
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
        didStart={timerClock.didStart}
        isRunning={isRunning}
        onPause={pause}
        onStart={() => {
          start();
          setTimerClock({ ...timerClock, didStart: true });
        }}
        onReset={() => {
          const newTime = new Date();
          newTime.setSeconds(
            newTime.getSeconds() + currentSetting.timer_length
          );
          restart(newTime, false);
          setTimerClock({ ...timerClock, didStart: false });
        }}
        onResume={resume}
      />
    </>
  );
};

export default Clock;
