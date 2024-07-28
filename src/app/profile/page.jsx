'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faUserEdit } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        country: '',
        state: '',
        city: '',
        language: '',
        specialization: '',
    });
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
                setFormData({
                    name: response.data.user.name,
                    age: response.data.user.age,
                    country: response.data.user.country,
                    state: response.data.user.state,
                    city: response.data.user.city,
                    language: response.data.user.language,
                    specialization: response.data.user.specialization,
                });
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleProfileUpdate = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/dashboard/login');
            return;
        }

        try {
            const response = await axios.put('/api/profile', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setUser(response.data);
            setEditMode(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleCancelEdit = () => {
        setEditMode(false);
        // Optionally reset form data to the original user data
        setFormData({
            name: user.name,
            age: user.age,
            country: user.country,
            state: user.state,
            city: user.city,
            language: user.language,
            specialization: user.specialization,
        });
    };

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
                            {user && <p>Welcome<br /> {user.name}</p>}
                        </div>
                        <div className={styles.navbuttons}>
                            <button onClick={handleApplyMore} className={styles.applyMoreButton}>Apply More</button>
                            <button onClick={() => setEditMode(!editMode)} className={styles.editProfileButton}>
                                <FontAwesomeIcon icon={faUserEdit} /> Edit Profile
                            </button>
                        </div>
                    </div>
                    <h1 className={styles.title}>Profile</h1>
                    {editMode ? (
                        <div className={styles.editProfileContainer}>
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" />
                            <input type="number" name="age" value={formData.age} onChange={handleInputChange} placeholder="Age" />
                            <input type="text" name="country" value={formData.country} onChange={handleInputChange} placeholder="Country" />
                            <input type="text" name="state" value={formData.state} onChange={handleInputChange} placeholder="State" />
                            <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="City" />
                            <input type="text" name="language" value={formData.language} onChange={handleInputChange} placeholder="Language" />
                            <input type="text" name="specialization" value={formData.specialization} onChange={handleInputChange} placeholder="Specialization" />
                            <div className={styles.editProfileButtons}>
                                <button onClick={handleProfileUpdate} className={styles.saveButton}>Save</button>
                                <button onClick={handleCancelEdit} className={styles.cancelButton}>Cancel</button>
                            </div>
                        </div>
                    ) : (
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
                                                <p className={styles.jobcont}><strong>Location:</strong> {application.job.country}</p>
                                            </div>
                                            <button onClick={() => handleDelete(application.id)} className={styles.deleteButton}>
                                                Delete Application
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Profile;
