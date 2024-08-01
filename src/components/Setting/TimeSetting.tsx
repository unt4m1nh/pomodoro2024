import React from 'react';
import ButtonMode from '../Button/Mode/ButtonMode';
import { useAppState } from '../../context/GeneralSettings';
import { SettingTypes } from '../../global/const';

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

  const handleChangeFocusTime = () => {
    // Your logic here
    updateSettings(SettingTypes.POMO_TIME, focusTime * 60);
    updateSettings(SettingTypes.SHORT_BREAK_TIME, shortBreakTime * 60);
    updateSettings(SettingTypes.LONG_BREAK_TIME, longBreakTime * 60);
  };
  return (
    // Your JSX code here
    <div>
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
        size='small'
        color='red'
        textColor='#FFF'
        onClick={handleChangeFocusTime}
      >
        Apply
      </ButtonMode>
    </div>
  );
};

export default TimeSetting;
