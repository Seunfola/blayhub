'use client';

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import styles from './JobList.module.css';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const categories = ['All', 'Software', 'Translation', 'Marketing', 'Design', 'Customer Support'];
const jobTypes = ['All', 'Hybrid', 'Remote', 'Onsite'];
const industries = ['All', 'Technology', 'Healthcare', 'Finance', 'Education', 'Retail'];  // Update these based on the industries listed in your job data

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filters, setFilters] = useState({
    jobType: 'All',
    industry: 'All',
    salaryRange: [1, 20],  
    title: ''
  });

  const router = useRouter();

  const fetchJobs = useCallback(async (reset = false) => {
    setLoading(true);
    try {
      const response = await axios.get('/api/jobs', {
        params: {
          page,
          category: selectedCategory !== 'All' ? selectedCategory : undefined,
          jobType: filters.jobType !== 'All' ? filters.jobType : undefined,
          industry: filters.industry !== 'All' ? filters.industry : undefined,
          minSalary: filters.salaryRange[0],
          maxSalary: filters.salaryRange[1],
          title: filters.title !== '' ? filters.title : undefined,
        }
      });
      setJobs(jobs => (reset ? response.data : [...jobs, ...response.data]));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setLoading(false);
    }
  }, [page, selectedCategory, filters]);

  useEffect(() => {
    fetchJobs(true);
  }, [fetchJobs]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('/api/auth/session', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data.user);
        } catch (error) {
          localStorage.removeItem('token');
          console.error('User fetch error:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const checkIfApplied = useCallback(async (jobId) => {
    try {
      const response = await axios.get(`/api/applications/check/${jobId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data.applied;
    } catch (error) {
      console.error('Error checking application status:', error);
      return false;
    }
  }, []);

  const handleApplyClick = useCallback(async (jobId) => {
    if (!user) {
      router.push('/dashboard/login');
      return;
    }

    const hasApplied = await checkIfApplied(jobId);

    if (hasApplied) {
      alert('You have already applied for this job.');
    } else {
      router.push(`/apply/${jobId}`);
    }
  }, [user, router, checkIfApplied]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;
    setPage((prevPage) => prevPage + 1);
  }, [loading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (loading && !jobs.length) {
    return (
      <div className={styles.loadingContainer}>
        <FontAwesomeIcon icon={faSpinner} spin />
      </div>
    );
  }

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
    setPage(1);
  };

  const handleSalaryChange = (e, index) => {
    const value = Number(e.target.value);
    setFilters((prevFilters) => {
      const newSalaryRange = [...prevFilters.salaryRange];
      newSalaryRange[index] = value;
      return {
        ...prevFilters,
        salaryRange: newSalaryRange,
      };
    });
    setPage(1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <div className={styles.filterInputs}>
          <input
            type="text"
            name="title"
            placeholder="Filter by title"
            value={filters.title}
            onChange={handleFilterChange}
          />
          <select name="jobType" value={filters.jobType} onChange={handleFilterChange}>
            {jobTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <select name="industry" value={filters.industry} onChange={handleFilterChange}>
            {industries.map((industry) => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
          <div className={styles.salaryRange}>
            <label>Salary($/hr): {filters.salaryRange[0]} - {filters.salaryRange[1]}</label>
            <input
              type="range"
              min="1"
              max="20"
              value={filters.salaryRange[0]}
              onChange={(e) => handleSalaryChange(e, 0)}
            />
            <input
              type="range"
              min="1"
              max="20"
              value={filters.salaryRange[1]}
              onChange={(e) => handleSalaryChange(e, 1)}
            />
          </div>
        </div>
      </div>
      <div className={styles.jobList}>
        {jobs.map((job) => (
          <div className={styles.jobItem} key={job.id}>
            <h2 className={styles.jobTitle}>{job.title}</h2>
            <p className={styles.jobDescription}>{job.description}</p>
            <p className={styles.jobDetails}><strong>Criteria:</strong> {job.criteria}</p>
            <p className={styles.jobDetails}><strong>Skills:</strong> {job.skills}</p>
            <p className={styles.jobDetails}><strong>Years of Experience:</strong> {job.yearsOfExperience}</p>
            <p className={styles.jobDetails}><strong>Level:</strong> {job.level}</p>
            <p className={styles.jobDetails}><strong>Job Responsibilities:</strong> {job.jobResponsibilities}</p>
            <p className={styles.jobDetails}><strong>Location:</strong> {job.location}</p>
            <p className={styles.jobDetails}><strong>Salary:</strong> {job.salary}</p>
            <p className={styles.jobDetails}><strong>Job Type:</strong> {job.jobType}</p>
            <p className={styles.jobDetails}><strong>Industry:</strong> {job.industry}</p>
            <p className={styles.jobDetails}><strong>Company:</strong> {job.company}</p>
            <button
              onClick={() => handleApplyClick(job.id)}
              className={styles.applyButton}
            >
              Apply
            </button>
          </div>
        ))}
      </div>
      {loading && <p>Loading more jobs...</p>}
    </div>
  );
};

export default JobList;
