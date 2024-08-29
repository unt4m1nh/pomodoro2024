import {
  faGear,
  faListCheck,
  faLongArrowAltRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { forwardRef } from 'react';

//@ts-ignore
import styles from './index.module.scss';

interface IHeaderProps {
  isMobile: boolean;
  showTask: () => void;
  showSetting: () => void;
}

const Header = forwardRef(
  ({ isMobile, showTask, showSetting }: IHeaderProps, ref: React.Ref<HTMLDivElement>) => {
    return (
      <div className={styles['header']}>
        <div className={styles['btn-container']}>
          <div ref={ref} onClick={showSetting} className={styles['icon-btn']}>
            <FontAwesomeIcon icon={faGear} size='2xl' />
          </div>
          <div style={{display: !isMobile ? 'block' : 'none'}} onClick={showTask} className={styles['icon-btn']}>
            <FontAwesomeIcon icon={faListCheck} size='2xl' />
          </div>
        </div>
        <h1 className={styles['title']}>Focusly</h1>
        <div className={styles['debounce']}>
          <div style={{width: 32, height: 32}}></div>
        </div>
      </div>
    );
  }
);

export default Header;
