'use client';

import React, { useEffect, useState } from "react";
import axios from 'axios';
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/dashboard/login');
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        if (response.data.role !== 'admin') {
          router.push('/dashboard');
        }
      } catch (error) {
        localStorage.removeItem('token');
        router.push('/dashboard/login');
      }
    };

    fetchUser();
  }, [router]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const description = e.target[1].value;
    const location = e.target[2].value;
    const salary = e.target[3].value;
    const company = e.target[4].value;

    try {
      await axios.post("/api/jobs", {
        title,
        description,
        location,
        salary,
        company,
        username: user.email,
      });
      e.target.reset();
      // Refresh the jobs
      const response = await axios.get('/api/jobs');
      setJobs(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/jobs/${id}`);
      // Refresh the jobs
      const response = await axios.get('/api/jobs');
      setJobs(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleKeyDown = (event, id) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleDelete(id);
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.posts}>
        {jobs.map((job) => (
          <div className={styles.post} key={job.id}>
            <div className={styles.imgContainer}>
              <Image src={job.img || "/default-job.png"} alt="" width={200} height={100} />
            </div>
            <h2 className={styles.postTitle}>{job.title}</h2>
            <p>{job.description}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Salary:</strong> {job.salary}</p>
            <p><strong>Company:</strong> {job.company}</p>
            <span
              className={styles.delete}
              onClick={() => handleDelete(job.id)}
              onKeyDown={(event) => handleKeyDown(event, job.id)}
              role="button"
              tabIndex={0}
            >
              X
            </span>
          </div>
        ))}
      </div>
      <form className={styles.new} onSubmit={handleSubmit}>
        <h1>Add a Job</h1>
        <input type="text" placeholder="Title" className={styles.input} required />
        <input type="text" placeholder="Description" className={styles.input} required />
        <input type="text" placeholder="Location" className={styles.input} required />
        <input type="text" placeholder="Salary" className={styles.input} />
        <input type="text" placeholder="Company" className={styles.input} required />
        <button className={styles.button}>Create</button>
      </form>
    </div>
  );
};

export default AdminDashboard;
