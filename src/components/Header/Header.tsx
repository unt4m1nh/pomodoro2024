import { faGear, faListCheck, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { forwardRef } from 'react';

//@ts-ignore
import styles from './index.module.scss';

interface IHeaderProps {
  showTask: () => void;
  showSetting: () => void;
}

const Header = forwardRef(({ showTask, showSetting }: IHeaderProps, ref: React.Ref<HTMLDivElement>) => {
  return (
    <>
      <h1>Focusly</h1>
     <div className={styles['btn-container']}>
        <div ref={ref} onClick={showSetting} className={styles['icon-btn']}>
          <FontAwesomeIcon icon={faGear} size='2xl' />
        </div>
        <div onClick={showTask} className={styles['icon-btn']}>
          <FontAwesomeIcon icon={faListCheck} size='2xl' />
        </div>
     </div>
    </>
  );
});

export default Header;
