import React, { ReactNode , useContext, useState } from 'react';
import { defaultSetting, SettingTypes } from '../global/const.ts';
import { TSetting } from '../global/types.ts';

/**
 * Interface for the application context.
 */
interface IAppContext {
  currentSetting: TSetting;
  updateSettings: (setting: SettingTypes, newValue: any) => void;
}

/**
 * Props interface for the GeneralSettings component.
 */
interface IGeneralSettingsProps {
    children: typeof ReactNode;
}

// Context type / interface
export const AppContext  = React.createContext({} as IAppContext);

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
export const GeneralSettings = ({ children } : IGeneralSettingsProps): JSX.Element => {
  const [currentSetting, setCurrentSetting] =
    useState(defaultSetting);

  /**
   * Updates the specified setting with the new value.
   * @param {SettingTypes} setting - The setting to update.
   * @param {any} newValue - The new value for the setting.
   */
  const updateSettings = (setting: SettingTypes, newValue: any) => {
    console.log(setting, newValue);
    switch (setting) {
      case SettingTypes.THEME:
        setCurrentSetting({ ...currentSetting, background_image: newValue });
        break;
      case SettingTypes.NOTIFICATION_SOUNDS:
        setCurrentSetting({ ...currentSetting, alarm: newValue });
        break;
      case SettingTypes.VOLUME:
        setCurrentSetting({ ...currentSetting, volume: newValue });
        break;
      case SettingTypes.TIMER_LENGTH: 
        setCurrentSetting({ ...currentSetting, timer_length: newValue});
        break;
      case SettingTypes.POMO_TIME:
        setCurrentSetting({ ...currentSetting, pomo_time: newValue });
        break;
      case SettingTypes.LONG_BREAK_TIME:
        console.log('long break set');
        setCurrentSetting({ ...currentSetting, long_break_time: newValue });
        break;
      case SettingTypes.SHORT_BREAK_TIME:
        setCurrentSetting({ ...currentSetting, short_break_time: newValue });
        break;
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentSetting,
        updateSettings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default GeneralSettings;
