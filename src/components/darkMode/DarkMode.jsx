'use client';
import React, { useContext } from 'react';
import styles from './DarkMode.module.css';
import { ThemeContext } from "../../context/ThemeContext";

const DarkMode = () => {
    const { toggle, mode } = useContext(ThemeContext);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            toggle();
        }
    };

    return (
        <div
            className={styles.container}
            onClick={toggle}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
        >
            <div className={styles.icon}>🌙</div>
            <div className={styles.icon}>🔆</div>
            <div className={styles.ball} style={mode === "dark" ? { left: "2px" } : { right: "2px" }} />
        </div>
    );
};

export default DarkMode;
