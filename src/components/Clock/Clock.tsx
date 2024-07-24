import { TTask } from '../../global/types';
import { useTimer } from 'react-timer-hook';
import ClockController from './ClockController';
import { useAppState } from '../../context/GeneralSettings';
import { useState } from 'react';

interface IClockProps {
  mode: 'Digital' | 'Analog';
  perTimeLeft: number;
  currentTask: TTask | null;
}

const circleWidth = 400;
const strokeWidth = 10;
const radius = (circleWidth - strokeWidth) / 2;
const circumference = radius * 2 * Math.PI;

const Clock = ({ mode, perTimeLeft, currentTask }: IClockProps) => {
  const time = new Date();
  const { currentSetting } = useAppState();
  time.setSeconds(time.getSeconds() + currentSetting.pomo_time);
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

  const dashOffset = circumference - (circumference * perTimeLeft) / 100;

  return (
    <>
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
        <svg
          width={circleWidth}
          height={circleWidth}
          viewBox={`0 0 ${circleWidth} ${circleWidth}`}
          className='progess-container'
          style={{ display: 'none' }}
        >
          <circle
            cx={circleWidth / 2}
            cy={circleWidth / 2}
            strokeWidth={strokeWidth}
            r={radius}
            className='background-circle'
          ></circle>
          <circle
            cx={circleWidth / 2}
            cy={circleWidth / 2}
            strokeWidth={strokeWidth}
            r={radius}
            className='progress-circle'
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: dashOffset,
            }}
            transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
          ></circle>
          <text className='time' x='7%' y='55%'>{`${
            minutes >= 10 ? minutes : '0' + minutes
          } : ${seconds >= 10 ? seconds : '0' + seconds}`}</text>
        </svg>
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
          newTime.setSeconds(newTime.getSeconds() + currentSetting.pomo_time);
          restart(newTime, false);
        }}
        onResume={resume}
      />
    </>
  );
};

export default Clock;
