import React from 'react';

//@ts-ignore
import styles from './index.module.scss';

const AccountSetting: React.FC = () => {
    // Add your component logic here

    return (
        <div className={styles['setting-options']}>
            <h3>Account</h3>
            <div className={styles['content-center']}><p>Please login to try out more features</p></div>
        </div>
    );
};

export default AccountSetting;