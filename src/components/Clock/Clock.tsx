import { useTimer } from 'react-timer-hook';
import ClockController from './ClockController';
import { useState } from 'react';
import AnalogClock from './AnalogClock';
import Mode from '../Mode/Mode';
import { TTask } from '../../global/types';
import { useAppState } from '../../context/GeneralSettings';
import React from 'react';

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
  const autoStart = false;
  const [didStart, setDidStart] = useState(false);
  const { seconds, minutes, isRunning, start, pause, resume, restart } =
    useTimer({
      autoStart,
      expiryTimestamp: time,
      onExpire: () => {
        setDidStart(false);
        restart;
      },
    });

  const onChangeMode = (timerLength: number) => {
    console.log('Change mode', timerLength);
    const newTime = new Date();
    newTime.setSeconds(newTime.getSeconds() + timerLength);
    restart(newTime, false);
    setDidStart(false);
  };

  return (
    <>
      <Mode onChangeMode={onChangeMode} />
      {mode === 'Digital' ? (
        <>
          <h1 style={{ margin: 20 }}>
            {currentTask ? currentTask.name : 'You are not on any tasks !'}
          </h1>
          <h1 className='time'>
            {`${minutes >= 10 ? minutes : '0' + minutes}:${
              seconds >= 10 ? seconds : '0' + seconds
            }`}
          </h1>
        </>
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
        }}
        onResume={resume}
      />
    </>
  );
};

export default Clock;
