import { faGear, faListCheck, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { forwardRef } from 'react';

interface IHeaderProps {
  showTask: () => void;
  showSetting: () => void;
}

const Header = forwardRef(({ showTask, showSetting }: IHeaderProps, ref: React.Ref<HTMLDivElement>) => {
  return (
    <>
      <h1>Focusly</h1>
      <div ref={ref} className='btn-setting' onClick={showSetting}>
        <p>Settings</p>
        <FontAwesomeIcon icon={faGear} size='xl' />
      </div>
      <div className='btn-task' onClick={showTask}>
        <p>Task List</p>
        <FontAwesomeIcon icon={faListCheck} size='xl' />
      </div>
    </>
  );
});

export default Header;
