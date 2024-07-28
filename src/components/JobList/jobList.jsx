'use client';

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import styles from './JobList.module.css';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faSearch,
  faSortAmountUp,
  faSortAmountDown,
  faBuilding
} from '@fortawesome/free-solid-svg-icons';
import CategoryFilter from '../categoryFilter/page';

const jobTypes = ['All', 'Hybrid', 'Remote', 'Onsite'];
const sortOptions = [
  { value: 'newest', label: 'Date Descending' },
  { value: 'oldest', label: 'Date Ascending' },
];

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');
  const [filters, setFilters] = useState({
    jobType: 'All',
    salaryRange: [1, 20],
    title: '',
    workmode: 'All'
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
          workmode: filters.workmode !== 'All' ? filters.workmode : undefined,
          minSalary: filters.salaryRange[0],
          maxSalary: filters.salaryRange[1],
          title: filters.title !== '' ? filters.title : undefined,
          sort: sortOrder,
        }
      });
      setJobs(jobs => (reset ? response.data : [...jobs, ...response.data]));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setLoading(false);
    }
  }, [page, selectedCategory, filters, sortOrder]);

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

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(1);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setPage(1);
    fetchJobs(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
        <div className={styles.filterInputs}>
          <div className={styles.filterInput}>
            <FontAwesomeIcon icon={faSearch} />
            <input
              type="text"
              name="title"
              placeholder="Filter by title"
              value={filters.title}
              onChange={handleFilterChange}
            />
          </div>
          <div className={styles.filterInput}>
            <FontAwesomeIcon icon={faBuilding} />
            <select name="workmode" value={filters.workmode} onChange={handleFilterChange}>
              {jobTypes.map((mode) => (
                <option key={mode} value={mode}>{mode}</option>
              ))}
            </select>
          </div>
          <div className={styles.filterInput}>
            <FontAwesomeIcon icon={sortOrder === 'asc' ? faSortAmountUp : faSortAmountDown} />
            <select name="sortOrder" value={sortOrder} onChange={handleSortChange}>
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
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
            <p className={styles.jobDetails}><strong>Country:</strong> {job.country}</p>
            <p className={styles.jobDetails}><strong>Salary:</strong> {job.salary}</p>
            <p className={styles.jobDetails}><strong>Job Type:</strong> {job.jobType}</p>
            <p className={styles.jobDetails}><strong>Industry:</strong> {job.industry}</p>
            <p className={styles.jobDetails}><strong>Workmode:</strong> {job.workmode}</p>
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
