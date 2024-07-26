'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

const ApplicationError = () => {
    const router = useRouter();

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Application Error</h1>
            <p className={styles.message}>Sorry, you have already applied for this job.</p>
            <button className={styles.button} onClick={() => router.push('/jobs')}>Back to Jobs</button>
        </div>
    );
};

export default ApplicationError;
