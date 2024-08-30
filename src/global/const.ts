import { TSetting } from "./types";

export const ThemeImages = [
  {
    id: 0,
    desktopUrl: 'https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    mobileUrl: 'https://images.pexels.com/photos/1834399/pexels-photo-1834399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 1,
    desktopUrl: 'https://images.pexels.com/photos/547114/pexels-photo-547114.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    mobileUrl: 'https://images.pexels.com/photos/6942667/pexels-photo-6942667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 2,
    desktopUrl: 'https://images.pexels.com/photos/2187456/pexels-photo-2187456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    mobileUrl: 'https://images.pexels.com/photos/13067863/pexels-photo-13067863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 3,
    desktopUrl: 'https://images.pexels.com/photos/2070047/pexels-photo-2070047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    mobileUrl: 'https://images.pexels.com/photos/1699024/pexels-photo-1699024.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export const AlarmSounds = [
  {
    id: 0,
    name: 'Alarm 1',
    path: 'alarm-clock-short-6402.mp3',
  },
  {
    id: 1,
    name: 'Alarm 2',
    path: 'clock-alarm-8761.mp3',
  },
  {
    id: 2,
    name: 'Alarm 3',
    path: 'simple-notification-152054.mp3',
  },
  {
    id: 3,
    name: 'Alarm 4',
    path: 'smartphone_vibrating_alarm_silent-7040.mp3',
  },
];

export enum SettingTypes {
    THEME = 'Theme',
    NOTIFICATION_SOUNDS = 'Notification Sounds',
    VOLUME = 'Volume',
    TIMER_LENGTH = 'Timer Length',
    POMO_TIME = 'Pomodoro Time',
    SHORT_BREAK_TIME = 'Short Break Time',
    LONG_BREAK_TIME = 'Long Break Time',
    FOCUS_LEVEL = 'Focus Level',
    ACCOUNT = 'Account',
    MODE = 'Mode',
}

export enum Modes {
  POMODORO = 'Pomodoro',
  SHORT_BREAK = 'Short break',
  LONG_BREAK = 'Long break',
}

export const defaultSetting: TSetting = {
    desktop_background: 'https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    mobile_background: 'https://images.pexels.com/photos/1834399/pexels-photo-1834399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    alarm: '',
    volume: 50,
    timer_length: 1500,
    pomo_time: 1500,
    short_break_time: 300,
    long_break_time: 600,
    mode: Modes.POMODORO,
    theme_index: 0,
}

export enum ClockTypes {
    DIGITAL = 'Digital',
    ANALOG = 'Analog'
}
