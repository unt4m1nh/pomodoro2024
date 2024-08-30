import React from 'react';
import { SettingTypes, ThemeImages } from '../../global/const';
import ButtonMode from '../Button/Mode/ButtonMode';
import { useAppState } from '../../context/GeneralSettings';
//@ts-ignore
import styles from './index.module.scss';
interface ThemeSettingProps {
    // Define your component props here
}

const isMobile = window.innerWidth < 640;

const ThemeSetting: React.FC = () => {
    // Implement your component logic here
    const [theme, setTheme] = React.useState(0);
    const { currentSetting, changeBackground } = useAppState();

    return (
       
        // JSX code for your component's UI
        <div className={styles['setting-options']}>
              <h3>Chose theme</h3>
              <div className={styles['theme-list']}>
                {ThemeImages.map((element, index) => (
                  <div
                    key={element.id}
                    className={styles['image-container']}
                    onClick={() => {
                      setTheme(element.id);
                      changeBackground(isMobile, !isMobile ? element.desktopUrl : element.mobileUrl, element.id);
                    }}
                  >
                    <img alt='bg-image'  style={{
                      border:
                        currentSetting.theme_index === element.id ? '3px solid var(--green-400)' : 'none',
                    }} src={!isMobile ? element.desktopUrl : element.mobileUrl  }></img>
                  </div>
                ))}
              </div>
            </div>
    );
};

export default ThemeSetting;