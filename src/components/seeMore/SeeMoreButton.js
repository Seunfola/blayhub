import React from 'react';
import styles from './seeMoreButton.module.css';

const SeeMoreButton = ({ text, onClick }) => {
    return (
        <button className={styles.button} onClick={onClick}>
            {text}
        </button>
    );
};

export default SeeMoreButton;
