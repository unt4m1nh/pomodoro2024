import { Modes } from "./const";

// export type TAppContext = 'Theme' | 'Notification Sounds' | 'Volume' | 'Time'
export type TSetting = TThemeSetting & TSoundSetting & TTimeSetting & TMode;

export type TThemeSetting = {
  desktop_background: string;
  mobile_background: string;
  theme_index: number;
};

export type TSoundSetting = {
  alarm: number;
  volume: number;
};

export type TTimeSetting = {
  timer_length: number;
  pomo_time: number;
  short_break_time: number;
  long_break_time: number;
};

export type TMode = {
  mode: Modes;
};

export type TTask = {
  id: number;
  name: string;
};


export type Coordinate = {
  x: number;
  y: number;
};