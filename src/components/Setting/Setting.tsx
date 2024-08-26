import React from 'react';
import { SettingTypes } from '../../global/const';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import SettingNavigation from './SettingNavigation';
import SoundSetting from './SoundSetting';
import ThemeSetting from './ThemeSetting';
import TimeSetting from './TimeSetting';
import AccountSetting from './AccountSetting';

//@ts-ignore
import styles from './index.module.scss';

interface ISettingProps {
  x: number;
  y: number;
  hideSetting: () => void;
}

const Setting = ({ x, y, hideSetting }: ISettingProps) => {
  const [settingMode, setSettingMode] = React.useState(SettingTypes.THEME);

  return (
    <div
      style={{ position: 'fixed', top: y + 50, left: x - 500 }}
      className={styles['setting-container']}
    >
      <div className={styles['body']}>
        <SettingNavigation
          settingMode={settingMode}
          setSettingMode={setSettingMode}
        />
        <div className={styles['setting-content']}>
          <div className={styles[
            'setting-header'
          ]}>
            <h3 style={{visibility: 'hidden'}}>Settings</h3>
            <FontAwesomeIcon onClick={hideSetting} size='xl' icon={faXmark} className={styles['close-btn']} />
          </div>
          {settingMode === SettingTypes.THEME && <ThemeSetting />}
          {settingMode === SettingTypes.NOTIFICATION_SOUNDS && <SoundSetting />}
          {settingMode === SettingTypes.FOCUS_LEVEL && <TimeSetting />}
          {settingMode === SettingTypes.ACCOUNT && <AccountSetting />}
        </div>
      </div>
    </div>
  );
};

export default Setting;
