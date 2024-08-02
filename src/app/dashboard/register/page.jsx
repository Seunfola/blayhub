'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Ndaform from '@/components/NDAForm/Ndaform';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    age: '',
    password: '',
    confirmPassword: '',
    country: '',
    state: '',
    city: '',
    language: '',
    specialization: '',
    ndaChecked: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d@$!%*?&^#_]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordMessage('Passwords do not match');
      return;
    }
    if (!validatePassword(formData.password)) {
      setPasswordMessage('Password must be at least 8 characters, contain an uppercase, a lowercase, a number, and a special character.');
      return;
    }

    try {
      const { name, email, password, country, state, city, language, specialization, ndaChecked, age } = formData;
      const postData = {
        name,
        email,
        password,
        country,
        state,
        city,
        language,
        specialization,
        ndaChecked,
        age,
      };

      await axios.post('/api/auth/signup', postData);
      setMessage('Registration successful!');
      router.push('/dashboard/login');
    } catch (error) {
      setMessage('Registration failed. Please check network and refresh the page.');
      console.error(error);
    }
  };

  const handleKeyPress = (event, toggleFunction) => {
    if (event.key === 'Enter' || event.key === ' ') {
      toggleFunction();
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign Up Here</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.gridContainer}>
          <div className={styles.inputContainer}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.input}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className={styles.input}
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <input
              type="number"
              name="age"
              placeholder="Age"
              className={styles.input}
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              className={styles.input}
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div
              className={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
              onKeyDown={(event) => handleKeyPress(event, () => setShowPassword(!showPassword))}
              role="button"
              tabIndex={0}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <div className={styles.passwordContainer}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              className={styles.input}
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <div
              className={styles.eyeIcon}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              onKeyDown={(event) => handleKeyPress(event, () => setShowConfirmPassword(!showConfirmPassword))}
              role="button"
              tabIndex={0}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <div className={styles.inputContainer}>
            <input
              type="text"
              name="country"
              placeholder="Country"
              className={styles.input}
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <input
              type="text"
              name="state"
              placeholder="State"
              className={styles.input}
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <input
              type="text"
              name="city"
              placeholder="City"
              className={styles.input}
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <input
              type="text"
              name="language"
              placeholder="Language"
              className={styles.input}
              value={formData.language}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <input
              type="text"
              name="specialization"
              placeholder="Specialization"
              className={styles.input}
              value={formData.specialization}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {passwordMessage && <p className={styles.passwordMessage}>{passwordMessage}</p>}
        
        <Ndaform onCheck={(checked) => setFormData({ ...formData, ndaChecked: checked })} />

        <button type="submit" className={styles.button}>Register</button>
        {message && <p className={styles.message}>{message}</p>}
      </form>
      <p className={styles.or}>Already have an account? <Link href="/dashboard/login" className={styles.link}>Login here</Link></p>
    </div>
  );
};

export default Signup;
