import React from 'react';
import { SettingTypes } from '../../global/const';
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
}

const Setting = ({ x, y }: ISettingProps) => {
  const [settingMode, setSettingMode] = React.useState(SettingTypes.THEME);

  return (
    <div
      style={{ position: 'fixed', top: y + 100, left: x - 400 }}
      className={styles['setting-container']}
    >
      <div className={styles['body']}>
        <SettingNavigation
          settingMode={settingMode}
          setSettingMode={setSettingMode}
        />
        <div className={styles['setting-content']}>
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
