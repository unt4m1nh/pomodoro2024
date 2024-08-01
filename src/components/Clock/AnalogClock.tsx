import React from "react";

interface IAnalogClockProps {
  minutes: number;
  seconds: number;
  perTimeLeft: number;
}

const circleWidth = 400;
const strokeWidth = 10;
const radius = (circleWidth - strokeWidth) / 2;
const circumference = radius * 2 * Math.PI;

const AnalogClock = ({ minutes, seconds, perTimeLeft }: IAnalogClockProps) => {
  const dashOffset = circumference - (circumference * perTimeLeft) / 100;
  console.log('Analog Clock mounted');
  return (
    <>
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
    </>
  );
};

export default AnalogClock;
