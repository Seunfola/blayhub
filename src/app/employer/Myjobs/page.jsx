'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './MyJobs.module.css';

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        const response = await axios.get('/api/jobs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setJobs(response.data);
      } catch (error) {
        setError('Failed to fetch jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Jobs</h1>
      <ul className={styles.jobList}>
        {jobs.map((job) => (
          <li key={job.id} className={styles.jobItem}>
            <h2>{job.title}</h2>
            <p>{job.description}</p>
            <p>{job.skills}</p>
            <p>{job.country}</p>
            <p>{job.workmode}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyJobs;
