'use client';

import React, { useState } from 'react';
import axios from 'axios';
import styles from './PostJob.module.css';

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    criteria: '',
    skills: '',
    yearsOfExperience: '',
    level: '',
    jobResponsibilities: '',
    country: '',
    salary: '',
    company: '',
    workmode: '',
    category: '',
    jobType: '',
    industry: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      const response = await axios.post('/api/jobs', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage(response.data.message);
      setFormData({
        title: '',
        description: '',
        criteria: '',
        skills: '',
        yearsOfExperience: '',
        level: '',
        jobResponsibilities: '',
        country: '',
        salary: '',
        company: '',
        workmode: '',
        category: '',
        jobType: '',
        industry: '',
      });
    } catch (error) {
      setError('Failed to post job. Please try again later.');
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Post a Job</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          className={styles.input}
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Job Description"
          className={styles.textarea}
          value={formData.description}
          onChange={handleChange}
          required
        />
        <textarea
          name="criteria"
          placeholder="Criteria"
          className={styles.textarea}
          value={formData.criteria}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="skills"
          placeholder="Skills Required"
          className={styles.input}
          value={formData.skills}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="yearsOfExperience"
          placeholder="Years of Experience"
          className={styles.input}
          value={formData.yearsOfExperience}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="level"
          placeholder="Job Level"
          className={styles.input}
          value={formData.level}
          onChange={handleChange}
          required
        />
        <textarea
          name="jobResponsibilities"
          placeholder="Job Responsibilities"
          className={styles.textarea}
          value={formData.jobResponsibilities}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          className={styles.input}
          value={formData.country}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          className={styles.input}
          value={formData.salary}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          className={styles.input}
          value={formData.company}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="workmode"
          placeholder="Work Mode"
          className={styles.input}
          value={formData.workmode}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          className={styles.input}
          value={formData.category}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="jobType"
          placeholder="Job Type"
          className={styles.input}
          value={formData.jobType}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="industry"
          placeholder="Industry"
          className={styles.input}
          value={formData.industry}
          onChange={handleChange}
          required
        />
        <button type="submit" className={styles.button}>Post Job</button>
        {message && <p className={styles.message}>{message}</p>}
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default PostJob;
