'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true); 
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/dashboard/login');
            return;
        }

        const fetchProfileData = async () => {
            try {
                const response = await axios.get('/api/jobs/applications', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                console.log('Profile data:', response.data); 
                setUser(response.data.user);
                setApplications(response.data.applications || []);
            } catch (error) {
                console.error('Error fetching profile data:', error);
                router.push('/dashboard/login');
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [router]);

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this application?')) {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.delete(`/api/applications/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.status === 200) {
                    setApplications(applications.filter(app => app.id !== id));
                }
            } catch (error) {
                console.error('Error deleting application:', error);
            }
        }
    };

    const handleApplyMore = () => {
        router.push('/dashboard');
    };

    return (
        <div className={styles.container}>
            {loading ? (
                <div className={styles.loadingContainer}>
                    <FontAwesomeIcon icon={faSpinner} spin />
                </div>
            ) : (
                <div>
                    <div className={styles.navcontainer}>
                        <div className={styles.userInfo}>
                            {user && <p>Welcome<br/> {user.name}</p>}
                        </div>
                        <button onClick={handleApplyMore} className={styles.applyMoreButton}>Apply More</button>
                    </div>
                    <h1 className={styles.title}>Profile</h1>
                    <div className={styles.applicationsList}>
                        {applications.length === 0 ? (
                            <p className={styles.noApplications}>No applications found.</p>
                        ) : (
                            applications.map((application) => (
                                <div key={application.id} className={styles.applicationItem}>
                                    <div className={styles.applicationHeader}>
                                        <div>
                                            <p className={styles.jobcont}><strong>Job Title:</strong> {application.job.title}</p>
                                            <p className={styles.jobcont}><strong>Company:</strong> {application.job.company}</p>
                                            <p className={styles.jobcont}><strong>Status:</strong> pending</p>
                                            <p className={styles.jobcont}><strong>Location:</strong> {application.job.location}</p>
                                        </div>
                                        <button onClick={() => handleDelete(application.id)} className={styles.deleteButton}>
                                            Delete Application
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
