import React, { useEffect } from 'react';
import ButtonMode from '../Button/Mode/ButtonMode';
import { useAppState } from '../../context/GeneralSettings';
import { SettingTypes } from '../../global/const';
import { Modes } from '../../global/const';

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

  useEffect(() => {
    updateSettings(SettingTypes.POMO_TIME, focusTime * 60);
    if (currentSetting.mode === Modes.POMODORO) {
      updateSettings(SettingTypes.POMO_TIME, focusTime * 60);
    }
  }, [focusTime]);

  useEffect(() => {
    updateSettings(SettingTypes.SHORT_BREAK_TIME, shortBreakTime * 60);
    if (currentSetting.mode === Modes.SHORT_BREAK) {
      updateSettings(SettingTypes.SHORT_BREAK_TIME, shortBreakTime * 60);
    }
  }, [shortBreakTime]);

  useEffect(() => {
    updateSettings(SettingTypes.LONG_BREAK_TIME, longBreakTime * 60);
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
        type='number'
        min={25}
        max={100}
        defaultValue={focusTime}
        onChange={(e) => setFocusTime(Number(e.target.value))}
      />
      <p>Short Break Time</p>
      <input
        type='number'
        min={1}
        max={10}
        defaultValue={shortBreakTime}
        onChange={(e) => setShortBreakTime(Number(e.target.value))}
      />
      <p>Long Break Time</p>
      <input
        type='number'
        min={5}
        max={100}
        defaultValue={longBreakTime}
        onChange={(e) => setLongBreakTime(Number(e.target.value))}
      />
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
