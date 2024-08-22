import React from 'react';
import { Coordinate } from '../../global/types';

//@ts-ignore
import styles from './index.module.scss';

interface IItemActionProps {
    // Define your component props here
    isShow: boolean;
    onEdit: () => void;
    onDelete: () => void;
}

const ItemAction = ({ isShow, onDelete, onEdit} : IItemActionProps) => {
    // Add your component logic here

    if (!isShow) return null;

    return (
        // Add your JSX code here
        <div style={{position: 'absolute', top: '100%', left: '80%'}} className={styles['task-options']}>
            <div onClick={onEdit}>Edit</div>
            <div style={{color: 'red'}} onClick={onDelete}>Delete</div>
        </div>
    );
};

export default ItemAction;