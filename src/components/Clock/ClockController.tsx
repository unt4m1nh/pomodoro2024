import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonMode from "../Button/Mode/ButtonMode";
import { useState } from "react";

interface IClockControllerProps {
    didStart: boolean;
    isRunning: boolean;
    onStart: () => void;
    onPause: () => void;
    onResume: () => void;
    onReset: () => void
}

const ClockController = ({ didStart, isRunning, onPause, onReset, onResume, onStart }: IClockControllerProps) => {
    console.log('Is running', isRunning);
    const [rotationDeg, setRotationDeg] = useState(0);

    return (
        <div className='content-clock-buttons'>
          {!isRunning ? (
            <ButtonMode
              onClick={didStart ? onResume : onStart}
              color='#fff'
              size="small"
            >
              {didStart ? 'Resume' : 'Start'}
            </ButtonMode>
          ) : (
            <ButtonMode
              onClick={onPause}
              color='#fff'
              size="small"
            >
              Pause
            </ButtonMode>
          )}
          <FontAwesomeIcon
            className='icon'
            icon={faRotateRight}
            size='2xl'
            onClick={() => {
              onReset();
              setRotationDeg(rotationDeg + 360)
            }}
            style={{ transform: `rotate(${rotationDeg}deg)` }}
          />
        </div>
    )
}

export default ClockController;