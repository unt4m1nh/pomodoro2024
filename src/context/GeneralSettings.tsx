import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { defaultSetting, Modes, SettingTypes } from '../global/const.ts';
import { TSetting } from '../global/types.ts';
import { createLocalStorage } from '../utils/localStorage.ts';

/**
 * Interface for the application context.
 */
interface IAppContext {
  currentSetting: TSetting;
  updateSettings: (setting: SettingTypes, newValue: any) => void;
  changeMode: (mode: string) => void;
  changeBackground: (isMobile: boolean, url: string, index: number) => void;
}

/**
 * Props interface for the GeneralSettings component.
 */
interface IGeneralSettingsProps {
  children: ReactNode;
}

// Context type / interface
export const AppContext = React.createContext({} as IAppContext);

/**
 * Custom hook to access the application state.
 */
export const useAppState = () => {
  return useContext(AppContext);
};

/**
 * Component for managing general settings.
 * @param {IGeneralSettingsProps} props - The component props.
 * @returns {JSX.Element} - The rendered component.
 */
export const GeneralSettings = ({
  children,
}: IGeneralSettingsProps): JSX.Element => {
  const settingStorage = createLocalStorage('general-setting');
  const [currentSetting, setCurrentSetting] = useState(
    settingStorage.get().desktop_background === undefined ? defaultSetting : settingStorage.get()
  );

  useEffect(() => {
    settingStorage.set(currentSetting);
  }, [currentSetting]);

  /**
   * Updates the specified setting with the new value.
   * @param {SettingTypes} setting - The setting to update.
   * @param {any} newValue - The new value for the setting.
   */
  const updateSettings = (setting: SettingTypes, newValue: any) => {
    switch (setting) {
      case SettingTypes.THEME:
        setCurrentSetting({ ...currentSetting, desktop_background: newValue });
        break;
      case SettingTypes.NOTIFICATION_SOUNDS:
        setCurrentSetting({ ...currentSetting, alarm: newValue });
        break;
      case SettingTypes.VOLUME:
        setCurrentSetting({ ...currentSetting, volume: newValue });
        break;
      case SettingTypes.TIMER_LENGTH:
        setCurrentSetting({ ...currentSetting, timer_length: newValue });
        break;
      case SettingTypes.POMO_TIME:
        setCurrentSetting({ ...currentSetting, pomo_time: newValue });
        break;
      case SettingTypes.LONG_BREAK_TIME:
        setCurrentSetting({ ...currentSetting, long_break_time: newValue });
        break;
      case SettingTypes.SHORT_BREAK_TIME:
        setCurrentSetting({ ...currentSetting, short_break_time: newValue });
        break;
    }
  };

  const changeBackground = (isMobile: boolean, url: string, index: number) => {
    setCurrentSetting(
      !isMobile
        ? {
            ...currentSetting,
            desktop_background: url,
            theme_index: index,
          }
        : {
            ...currentSetting,
            mobile_background: url,
            theme_index: index,
          }
    );
    settingStorage.set(currentSetting);
  };

  const changeMode = (mode: string) => {
    if (mode === Modes.POMODORO) {
      setCurrentSetting({
        ...currentSetting,
        mode: Modes.POMODORO,
        timer_length: currentSetting.pomo_time,
      });
    } else if (mode === Modes.SHORT_BREAK) {
      setCurrentSetting({
        ...currentSetting,
        mode: Modes.SHORT_BREAK,
        timer_length: currentSetting.short_break_time,
      });
    } else {
      setCurrentSetting({
        ...currentSetting,
        mode: Modes.LONG_BREAK,
        timer_length: currentSetting.long_break_time,
      });
    }
    settingStorage.set(currentSetting);
  };

  return (
    <AppContext.Provider
      value={{
        currentSetting,
        updateSettings,
        changeBackground,
        changeMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default GeneralSettings;
