import {
  faImage,
  faMusic,
  faClock,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { SettingTypes } from '../../global/const';

//@ts-ignore
import styles from './index.module.scss';

interface ISettingNavtigationProps {
  // Define your component props here
  settingMode: SettingTypes;
  setSettingMode: (mode: SettingTypes) => void;
  // Define your component props here
}

const SettingNavigation = ({
  settingMode,
  setSettingMode,
}: ISettingNavtigationProps) => {
  // Add your component logic here

  return (
    // Add your JSX code here
    <div className={styles['setting-mode']}>
      <div className={styles['setting-header']}>
        <h2>Settings</h2>
      </div>
      <div
        className={
          settingMode === SettingTypes.THEME
            ? styles['item-active']
            : styles['item']
        }
        onClick={() => {
          setSettingMode(SettingTypes.THEME);
        }}
      >
        <FontAwesomeIcon icon={faImage} />
        Theme
      </div>
      <div
        className={
          settingMode === SettingTypes.NOTIFICATION_SOUNDS
            ? styles['item-active']
            : styles['item']
        }
        onClick={() => {
          setSettingMode(SettingTypes.NOTIFICATION_SOUNDS);
        }}
      >
        <FontAwesomeIcon icon={faMusic} />
        Sound
      </div>
      <div
        className={
          settingMode === SettingTypes.FOCUS_LEVEL
            ? styles['item-active']
            : styles['item']
        }
        onClick={() => {
          setSettingMode(SettingTypes.FOCUS_LEVEL);
        }}
      >
        <FontAwesomeIcon icon={faClock} />
        Focus Level
      </div>
      <div
        className={
          settingMode === SettingTypes.ACCOUNT
            ? styles['item-active']
            : styles['item']
        }
        onClick={() => {
          setSettingMode(SettingTypes.ACCOUNT);
        }}
      >
        <FontAwesomeIcon icon={faUser} />
        Account
      </div>
    </div>
  );
};

export default SettingNavigation;
