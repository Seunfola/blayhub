'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styles from './page.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/login', { email, password });
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        router.push('/dashboard');
      }
    } catch (error) {
      setMessage('Login failed. Please check your email and password.');
      console.error(error);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/reset-password', { email: resetEmail });
      if (response.status === 200) {
        setResetMessage('Password reset link has been generated.');
        router.push('/dashboard/check-email');
      }
    } catch (error) {
      setResetMessage('Failed to send reset link. Please check your email.');
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      {!showResetForm ? (
        <>
          <h1 className={styles.title}>Login</h1>
          <form className={styles.form} onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className={styles.icon}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            <button type="submit" className={styles.button}>Login</button>
            {message && <p className={styles.message}>{message}</p>}
          </form>
          <p className={styles.or}>
            Don&apos;t have an account? <Link href="/dashboard/register" className={styles.link}>Register here</Link>
          </p>
          <p className={styles.or}>
            <button onClick={() => setShowResetForm(true)} className={styles.linkButton}>
              Forgot your password?
            </button>
          </p>
        </>
      ) : (
        <>
          <h1 className={styles.title}>Reset Password</h1>
          <form className={styles.form} onSubmit={handleResetPassword}>
            <input
              type="email"
              placeholder="Enter your email to reset password"
              className={styles.input}
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              required
            />
            <button type="submit" className={styles.button}>Reset Password</button>
            {resetMessage && <p className={styles.message}>{resetMessage}</p>}
          </form>
          <p className={styles.or}>
            <button onClick={() => setShowResetForm(false)} className={styles.linkButton}>
              Back to Login
            </button>
          </p>
        </>
      )}
    </div>
  );
};

export default Login;
