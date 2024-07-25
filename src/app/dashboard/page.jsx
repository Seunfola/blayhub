'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';
import styles from "./page.module.css";
import JobList from "@/components/JobList/jobList";


const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const fetchUser = async () => {
        try {
          const response = await axios.get('/api/auth/session', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data.user);
        } catch (error) {
          localStorage.removeItem('token');
          console.log('Failed to fetch user:', error);
        }
      };
      fetchUser();
    }
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/api/jobs');
        setJobs(response.data);
      } catch (error) {
        console.log('Failed to fetch jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Available Jobs</h1>
      <JobList jobs={jobs} />
    </div>
  );
};

export default UserDashboard;
