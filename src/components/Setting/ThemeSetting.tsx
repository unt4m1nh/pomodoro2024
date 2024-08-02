import React from 'react';
import { SettingTypes, ThemeImages } from '../../global/const';
import ButtonMode from '../Button/Mode/ButtonMode';
import { useAppState } from '../../context/GeneralSettings';
//@ts-ignore
import styles from './index.module.scss';
interface ThemeSettingProps {
    // Define your component props here
}

const ThemeSetting: React.FC = () => {
    // Implement your component logic here
    const [theme, setTheme] = React.useState(0);
    const { updateSettings } = useAppState();

    return (
       
        // JSX code for your component's UI
        <div className={styles['setting-content']}>
              <h3>Chose theme</h3>
              <div className={styles['theme-list']}>
                {ThemeImages.map((element, index) => (
                  <div
                    key={element.id}
                    className={styles['image-container']}
                    style={{
                      border:
                        theme === index ? '2px solid var(--neon-blue)' : 'none',
                    }}
                    onClick={() => {
                      setTheme(element.id);
                      updateSettings(SettingTypes.THEME, element.link);
                    }}
                  >
                    <img src={element.link}></img>
                  </div>
                ))}
              </div>
              <ButtonMode
                color='red'
                textColor='#FFF'
                onClick={() => {}}
                size='small'
              >
                Apply
              </ButtonMode>
            </div>
    );
};

export default ThemeSetting;