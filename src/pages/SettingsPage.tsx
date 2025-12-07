import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import SettingNavigation from '../components/Setting/SettingNavigation';
import SoundSetting from '../components/Setting/SoundSetting';
import ThemeSetting from '../components/Setting/ThemeSetting';
import TimeSetting from '../components/Setting/TimeSetting';
import AccountSetting from '../components/Setting/AccountSetting';
import { SettingTypes } from '../global/const';
//@ts-ignore
import styles from '../components/Setting/index.module.scss';

const SettingsPage: React.FC = () => {
  const [settingMode, setSettingMode] = useState(SettingTypes.THEME);
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <button 
          onClick={() => navigate('/')}
          style={{ 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer',
            fontSize: '1.5rem',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Back</span>
        </button>
        
        <div className={styles['setting-container']} style={{ position: 'relative', top: 0, left: 0 }}>
          <div className={styles['body']}>
            <SettingNavigation
              settingMode={settingMode}
              setSettingMode={setSettingMode}
            />
            <div className={styles['setting-item']}>
              {settingMode === SettingTypes.THEME && <ThemeSetting />}
              {settingMode === SettingTypes.SOUND && <SoundSetting />}
              {settingMode === SettingTypes.TIME && <TimeSetting />}
              {settingMode === SettingTypes.ACCOUNT && <AccountSetting />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
