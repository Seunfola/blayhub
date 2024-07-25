'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import styles from './page.module.css';

const ResetPasswordConfirm = () => {
  const [newPassword, setNewPassword] = useState('');
  const [resetConfirmMessage, setResetConfirmMessage] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get('token');

  const handleResetPasswordConfirm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/reset-password-confirm', { token, newPassword });
      if (response.status === 200) {
        setResetConfirmMessage('Password has been reset successfully.');
        router.push('/dashboard/login'); 
      }
    } catch (error) {
      setResetConfirmMessage('Failed to reset password. Please check your token and try again.');
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Reset Password</h1>
      <form className={styles.form} onSubmit={handleResetPasswordConfirm}>
        <input
          type="password"
          placeholder="New Password"
          className={styles.input}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit" className={styles.button}>Submit</button>
        {resetConfirmMessage && <p className={styles.message}>{resetConfirmMessage}</p>}
      </form>
    </div>
  );
};

export default ResetPasswordConfirm;
