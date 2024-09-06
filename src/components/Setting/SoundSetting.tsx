import React, { ChangeEvent, useEffect, useRef } from 'react';
import { AlarmSounds, SettingTypes } from '../../global/const';
import { useAppState } from '../../context/GeneralSettings';
import ButtonMode from '../Button/Mode/ButtonMode';
import { getAudio } from '../../utils/getAudio';

//@ts-ignore
import styles from './index.module.scss';

interface SoundSettingProps {
  // Define your component props here
}

const SoundSetting: React.FC = () => {
  // Add your component logic here
  const { currentSetting, updateSettings } = useAppState();
  const [alarm, setAlarm] = React.useState(currentSetting.alarm);
  const volume = currentSetting.volume;

  const alarmSoundRef = useRef(null as HTMLAudioElement | null);

  const playSelectedAlarm = () => {
    if (alarmSoundRef.current) {
      alarmSoundRef.current.play();
    }
  };

  useEffect(() => {
    if (alarmSoundRef.current !== null) {
      alarmSoundRef.current.volume = volume / 100;
      playSelectedAlarm();
    }
  }, [alarm, volume]);

  const handleChangeVolume = (e: ChangeEvent<HTMLInputElement>) => {
    updateSettings(SettingTypes.VOLUME, Number(e.target.value));
  };

  return (
    // Add your JSX code here
    <div className={styles['setting-options']}>
      <h3>Select alarm sound</h3>
      <div className={styles['sound-list']}>
        {AlarmSounds.map((element, index) => (
          <div className={styles['sound-list-selection']} key={element.id}>
            <div
              className={
                alarm === index ? styles['radio-active'] : styles['radio']
              }
              onClick={() => {
                setAlarm(element.id);
                updateSettings(SettingTypes.NOTIFICATION_SOUNDS, element.id);
              }}
            ></div>
            <p>{element.name}</p>
          </div>
        ))}
      </div>
      <h3>Volume</h3>

      <input
        type='range'
        min='0'
        max='100'
        value={volume}
        className={styles['slider']}
        id='myRange'
        onChange={handleChangeVolume}
      />
      <audio ref={alarmSoundRef} src={getAudio(alarm)}></audio>
    </div>
  );
};

export default SoundSetting;
