import { useState } from 'react';
import { useAppState } from '../../context/GeneralSettings';
import { Modes, SettingTypes } from '../../global/const';
import React from 'react';

//@ts-ignore
import styles from './index.module.scss';

interface IModeProps {
  onChangeMode: (timerLength: number) => void;
}

const Mode = ({ onChangeMode }: IModeProps) => {
  const [mode, setMode] = useState(Modes.POMODORO);
  const { currentSetting, changeMode } = useAppState();
  console.log(currentSetting.timer_length);
  const handleChangeMode = (targetMode: string) => {
    if (targetMode === Modes.POMODORO) {
      changeMode(Modes.POMODORO)
      setMode(Modes.POMODORO);
      onChangeMode(currentSetting.pomo_time);
    } else if (targetMode === Modes.SHORT_BREAK) {
      changeMode(Modes.SHORT_BREAK)
      setMode(Modes.SHORT_BREAK);
      onChangeMode(currentSetting.short_break_time);
    } else {
      changeMode(Modes.LONG_BREAK)
      setMode(Modes.LONG_BREAK);
      onChangeMode(currentSetting.long_break_time);
    }
  };

  return (
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
  );
};

export default Mode;
