import { useState } from 'react';
import styles from './index.module.scss';
import { useAppState } from '../../context/GeneralSettings';
import { SettingTypes } from '../../global/const';

enum Modes {
  POMODORO = 'Pomodoro',
  SHORT_BREAK = 'Short break',
  LONG_BREAK = 'Long break',
}

interface IModeProps {
  onChangeMode: (timerLength: number) => void;
}

const Mode = ({ onChangeMode }: IModeProps) => {
  const [mode, setMode] = useState(Modes.POMODORO);
  const { currentSetting, updateSettings } = useAppState();
  console.log(currentSetting.timer_length);
  const handleChangeMode = (targetMode: string) => {
    if (targetMode === Modes.POMODORO) {
      updateSettings(SettingTypes.TIMER_LENGTH, currentSetting.pomo_time);
      setMode(Modes.POMODORO);
      onChangeMode(currentSetting.pomo_time);
    } else if (targetMode === Modes.SHORT_BREAK) {
      updateSettings(
        SettingTypes.TIMER_LENGTH,
        currentSetting.short_break_time
      );
      setMode(Modes.SHORT_BREAK);
      onChangeMode(currentSetting.short_break_time);
    } else {
      updateSettings(SettingTypes.TIMER_LENGTH, currentSetting.long_break_time);
      setMode(Modes.LONG_BREAK);
      onChangeMode(currentSetting.long_break_time);
    }
  };

  return (
    <>
      <div className={styles.option}>
        <div
          className={
            mode === Modes.POMODORO
              ? `${styles.mode} ${styles.modeActive}`
              : styles.mode
          }
          onClick={() => {
            handleChangeMode(Modes.POMODORO);
          }}
        >
          Pomodoro
        </div>
        <div
          className={
            mode === Modes.SHORT_BREAK
              ? `${styles.mode} ${styles.modeActive}`
              : styles.mode
          }
          onClick={() => {
            handleChangeMode(Modes.SHORT_BREAK);
          }}
        >
          Short Break
        </div>
        <div
          className={
            mode === Modes.LONG_BREAK
              ? `${styles.mode} ${styles.modeActive}`
              : styles.mode
          }
          onClick={() => {
            handleChangeMode(Modes.LONG_BREAK);
          }}
        >
          Long Break
        </div>
      </div>
    </>
  );
};

export default Mode;
