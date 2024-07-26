import React from 'react';
import styles from './page.module.css';

const CheckEmail = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Check Your Email</h1>
      <p className={styles.message}>
        A password reset link has been sent to your email. Please check your email to reset your password.
      </p>
    </div>
  );
};

export default CheckEmail;
