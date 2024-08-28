import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ButtonMode from '../Button/Mode/ButtonMode';
import { useState } from 'react';
import React from 'react';

//@ts-ignore
import styles from './index.module.scss';
interface IClockControllerProps {
  didStart: boolean;
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
}

const ClockController = ({
  didStart,
  isRunning,
  onPause,
  onReset,
  onResume,
  onStart,
}: IClockControllerProps) => {
  console.log('Is running', isRunning);
  const [rotationDeg, setRotationDeg] = useState(0);

  return (
    <div className={styles['btn-control']}>
      {!didStart ? (
        <ButtonMode
          onClick={onStart}
          color='var(--green-400)'
          textColor='#fff'
          size='large'
        >
          Start
        </ButtonMode>
      ) : (
        <>
          <ButtonMode
            onClick={isRunning ? onPause : onResume}
            color='var(--green-400)'
            textColor='#fff'
            size='large'
          >
            {isRunning ? 'Pause' : 'Resume'}
          </ButtonMode>
          <FontAwesomeIcon
            className='icon'
            icon={faRotateRight}
            size='2xl'
            onClick={() => {
              setRotationDeg(rotationDeg + 360);
              setTimeout(onReset, 500);
            }}
            style={{transitionDuration: '0.4s', transform: `rotate(${rotationDeg}deg)` }}
          />
        </>
      )}
    </div>
  );
};

export default ClockController;
