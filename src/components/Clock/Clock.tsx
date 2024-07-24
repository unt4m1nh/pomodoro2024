import { TTask } from '../../global/types';
import { useTimer } from 'react-timer-hook';
import ClockController from './ClockController';
import { useAppState } from '../../context/GeneralSettings';
import { useState } from 'react';
import AnalogClock from './AnalogClock';

interface IClockProps {
  mode: 'Digital' | 'Analog';
  perTimeLeft: number;
  currentTask: TTask | null;
}

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
        <AnalogClock minutes={minutes} seconds={seconds} perTimeLeft={perTimeLeft} />
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
