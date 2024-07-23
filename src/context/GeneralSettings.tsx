import React, { ReactNode , useContext, useState } from 'react';
import { defaultSetting, SettingTypes } from '../global/const.ts';
import { TSetting } from '../global/types.ts';

interface IAppContext {
  currentSetting: TSetting;
  updateSettings: (setting: SettingTypes, newValue: any) => void;
}

interface IGeneralSettingsProps {
    children: typeof ReactNode;
}

// Context type / interface
export const AppContext  = React.createContext({} as IAppContext);

export const useAppState = () => {
  return useContext(AppContext);
};

export const GeneralSettings = ({ children } : IGeneralSettingsProps) => {
  const [currentSetting, setCurrentSetting] =
    useState(defaultSetting);

  const updateSettings = (setting: SettingTypes, newValue: any) => {
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
