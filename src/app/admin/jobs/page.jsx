'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './page.module.css';

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/api/jobs');
        setJobs(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/jobs/${id}`);
      setJobs(jobs.filter(job => job.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manage Jobs</h1>
      <div className={styles.jobsList}>
        {jobs.map((job) => (
          <div className={styles.jobItem} key={job.id}>
            <h2>{job.title}</h2>
            <p>{job.description}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Salary:</strong> {job.salary}</p>
            <p><strong>Company:</strong> {job.company}</p>
            <button onClick={() => handleDelete(job.id)} className={styles.deleteButton}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageJobs;
