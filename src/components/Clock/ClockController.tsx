import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ButtonMode from '../Button/Mode/ButtonMode';
import { useRef, useState } from 'react';
import React from 'react';

//@ts-ignore
import mouseClickSound from '../../assets/audio/mouse-click-153941.mp3';
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
  const btnPlayAudioRef = useRef<HTMLAudioElement | null>(null);

  return (
    <div className={styles['btn-control']}>
      {!didStart ? (
        <ButtonMode
          onClick={() => {
            btnPlayAudioRef.current?.play();
            onStart();
          }}
          color='var(--green-400)'
          textColor='#fff'
          size='large'
        >
          Start
        </ButtonMode>
      ) : (
        <>
          <ButtonMode
            onClick={() => {
              btnPlayAudioRef.current?.play() 
              isRunning ? onPause() : onResume()
            }}
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
            style={{
              transitionDuration: '0.4s',
              transform: `rotate(${rotationDeg}deg)`,
            }}
          />
        </>
      )}
      <audio ref={btnPlayAudioRef} src={mouseClickSound}></audio>
    </div>
  );
};

export default ClockController;
