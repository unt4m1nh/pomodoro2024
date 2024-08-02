import alarmClockShort from '../assets/audio/alarm-clock-short-6402.mp3';
import clockAlarm from '../assets/audio/clock-alarm-8761.mp3';
import simpleNotification from '../assets/audio/simple-notification-152054.mp3';
import smartphoneVibratingAlarm from '../assets/audio/smartphone_vibrating_alarm_silent-7040.mp3';

export const getAudio = (alarm: number) => {
  switch (alarm) {
    case 0:
      return alarmClockShort;
    case 1:
      return clockAlarm;
    case 2:
      return simpleNotification;
    case 3:
      return smartphoneVibratingAlarm;
    default:
      return '';
  }
};
