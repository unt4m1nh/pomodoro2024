import { ReactNode } from 'react';
import styles from './button.module.scss'

interface IButtonProps {
    onClick: () => void;
    color?: string;
    textColor?: string;
    children: typeof ReactNode;
}

const ButtonMode = ({onClick, color, textColor, children}: IButtonProps) => {

    return (
        <div className={styles.btn} onClick={onClick} style={{backgroundColor: `${color}`,
        color: `${textColor}`}}>
            {children}
        </div>
    );
}

export default ButtonMode;
