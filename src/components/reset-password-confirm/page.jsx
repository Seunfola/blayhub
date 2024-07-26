'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './page.module.css';

const ResetPasswordConfirm = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setMessage('Invalid or expired token.');
    }
  }, [searchParams]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('/api/auth/reset-password-confirm', { token, newPassword });
      if (response.status === 200) {
        setMessage('Password reset successfully.');
        router.push('/dashboard/login');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage('Failed to send reset confirmation email. Please try again later.');
      } else {
        setMessage('Failed to reset password. Please try again.');
      }
      console.error('Client-side error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Reset Password</h1>
      <form className={styles.form} onSubmit={handleResetPassword}>
        <input
          type="password"
          placeholder="Enter Your New Password"
          className={styles.input}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          className={styles.input}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className={styles.button}>Reset Password</button>
        {message && <p className={styles.message}>{message}</p>}
      </form>
    </div>
  );
};

export default ResetPasswordConfirm;
