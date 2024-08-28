import React, { ReactNode } from 'react';

//@ts-ignore
import styles from './button.module.scss';

interface IButtonProps {
  onClick: () => void;
  color?: string;
  textColor?: string;
  size: 'small' | 'large';
  children: ReactNode;
}

const ButtonMode = ({
  onClick,
  color,
  textColor,
  children,
  size,
}: IButtonProps) => {
  return (
    <button
      className={`${styles.btn} ${
        size === 'large' ? styles.large : styles.small
      }`}
      onClick={onClick}
      style={{ backgroundColor: `${color}`, color: `${textColor}` }}
    >
      {children}
    </button>
  );
};

export default ButtonMode;
