import React, { useEffect } from 'react';
import ButtonMode from '../Button/Mode/ButtonMode';
import { useAppState } from '../../context/GeneralSettings';
import { SettingTypes } from '../../global/const';
import { Modes } from '../../global/const';
import { validateInputNumber } from '../../utils/validateInputNumber';

//@ts-ignore
import styles from './index.module.scss';

const TimeSetting: React.FC = () => {
  // Your component logic here
  const { currentSetting, updateSettings } = useAppState();
  const [focusTime, setFocusTime] = React.useState(
    currentSetting.pomo_time / 60
  );
  const [shortBreakTime, setShortBreakTime] = React.useState(
    currentSetting.short_break_time / 60
  );
  const [longBreakTime, setLongBreakTime] = React.useState(
    currentSetting.long_break_time / 60
  );


  const handleOutOfRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (focusTime < 25 || focusTime > 100) {
      const focusNoti = document.getElementById('pomo-noti');
      setFocusTime(25);
      if (focusNoti?.style) {
        focusNoti.style.display = 'block';
      }
    }
    if (shortBreakTime < 1 ||  shortBreakTime > 10) {
      const shortBreakNoti = document.getElementById('short-break-noti');
      setShortBreakTime(1);
      if (shortBreakNoti?.style) {
        shortBreakNoti.style.display = 'block';
      }
    }
    if (longBreakTime < 10 || longBreakTime > 30) {
      const longBreakNoti = document.getElementById('long-break-noti');
      setLongBreakTime(10);
      if (longBreakNoti?.style) {
        longBreakNoti.style.display = 'block';
      }
    }
  }
  
  useEffect(() => {
    //updateSettings(SettingTypes.POMO_TIME, focusTime * 60);
    if (currentSetting.mode === Modes.POMODORO) {
      updateSettings(SettingTypes.POMO_TIME, focusTime * 60);
    }
  }, [focusTime]);

  useEffect(() => {
    //updateSettings(SettingTypes.SHORT_BREAK_TIME, shortBreakTime * 60);
    if (currentSetting.mode === Modes.SHORT_BREAK) {
      updateSettings(SettingTypes.SHORT_BREAK_TIME, shortBreakTime * 60);
    }
  }, [shortBreakTime]);

  useEffect(() => {
    //updateSettings(SettingTypes.LONG_BREAK_TIME, longBreakTime * 60);
    if (currentSetting.mode === Modes.LONG_BREAK) {
      updateSettings(SettingTypes.LONG_BREAK_TIME, longBreakTime * 60);
    }
  }, [longBreakTime]);

  const handleChangeMode = () => {
    if (currentSetting.mode === Modes.POMODORO) {
      updateSettings(SettingTypes.TIMER_LENGTH, focusTime * 60);
    } else if (currentSetting.mode === Modes.SHORT_BREAK) {
      updateSettings(SettingTypes.TIMER_LENGTH, shortBreakTime * 60);
    } else {
      updateSettings(SettingTypes.TIMER_LENGTH, longBreakTime * 60);
    }
  };

  return (
    // Your JSX code here
    <div className={styles['setting-options']}>
      <h3>Focus Level</h3>
      <p>Pomodoro Time</p>
      <input
        id='pomo-input'
        type='number'
        min={25}
        max={100}
        defaultValue={focusTime}
        onChange={(e) => setFocusTime(validateInputNumber(e))}
        onBlur={(e) => handleOutOfRange(e)}
      />
      <p id='pomo-noti' className={styles['warning']}>
        Pomodoro time must be between 25 and 100 minutes
      </p>
      <p>Short Break Time</p>
      <input
        id='short-break-input'
        type='number'
        min={1}
        max={10}
        defaultValue={shortBreakTime}
        onChange={(e) => setShortBreakTime(validateInputNumber(e))}
        onBlur={(e) => handleOutOfRange(e)}
      />
      <p id='short-break-noti' className={styles['warning']}>
        Short break time must be between 1 and 10 minutes
      </p>
      <p>Long Break Time</p>
      <input
        id='long-break-input'
        type='number'
        min={5}
        max={30}
        defaultValue={longBreakTime}
        onChange={(e) => setLongBreakTime(validateInputNumber(e))}
        onBlur={(e) => handleOutOfRange(e)}
      />
      <p id='long-break-noti' className={styles['warning']}>
        Long break time must be between 5 and 30 minutes
      </p>
      <ButtonMode
        color='var(--green-400)'
        textColor='#FFF'
        onClick={handleChangeMode}
        size='small'
      >
        Apply
      </ButtonMode>
    </div>
  );
};

export default TimeSetting;
