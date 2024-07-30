'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faUserEdit, faBriefcase, faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from './page.module.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [applications, setApplications] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [editAboutMode, setEditAboutMode] = useState(false);
    const [editSkillsMode, setEditSkillsMode] = useState(false);
    const [editExperienceMode, setEditExperienceMode] = useState(false);
    const [showApplications, setShowApplications] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        country: '',
        state: '',
        city: '',
        language: '',
        specialization: '',
        about: '',
        skills: ''
    });
    const [experienceData, setExperienceData] = useState({
        title: '',
        company: '',
        startDate: '',
        endDate: '',
        description: ''
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
                const response = await axios.get('/api/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const userData = response.data;
                console.log('User data:', userData); // Log user data for debugging
                setUser(userData);
                setFormData({
                    name: userData.name,
                    age: userData.age,
                    country: userData.country,
                    state: userData.state,
                    city: userData.city,
                    language: userData.language,
                    specialization: userData.specialization,
                    about: userData.about || '',
                    skills: userData.skills || ''
                });
                setExperiences(userData.experiences || []);
                setApplications(userData.applications || []);
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

    const handleExperienceChange = (e) => {
        const { name, value } = e.target;
        setExperienceData({ ...experienceData, [name]: value });
    };

    const handlePartialUpdate = async (data) => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/dashboard/login');
            return;
        }

        try {
            const response = await axios.put('/api/profile', data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const updatedUser = response.data;
            setUser(updatedUser);
            setFormData({
                name: updatedUser.name,
                age: updatedUser.age,
                country: updatedUser.country,
                state: updatedUser.state,
                city: updatedUser.city,
                language: updatedUser.language,
                specialization: updatedUser.specialization,
                about: updatedUser.about || '',
                skills: updatedUser.skills || ''
            });
            setExperiences(updatedUser.experiences || []);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleProfileUpdate = async () => {
        await handlePartialUpdate(formData);
        setEditMode(false);
        setEditAboutMode(false);
        setEditSkillsMode(false);
        setEditExperienceMode(false);
    };

    const handleAboutUpdate = async () => {
        await handlePartialUpdate({ about: formData.about });
        setEditAboutMode(false);
    };

    const handleSkillsUpdate = async () => {
        await handlePartialUpdate({ skills: formData.skills });
        setEditSkillsMode(false);
    };

    const handleExperienceUpdate = async () => {
        await handlePartialUpdate({ experiences });
        setEditExperienceMode(false);
    };

    const handleCancelEdit = () => {
        setEditMode(false);
        setEditAboutMode(false);
        setEditSkillsMode(false);
        setEditExperienceMode(false);
        // Optionally reset form data to the original user data
        setFormData({
            name: user.name,
            age: user.age,
            country: user.country,
            state: user.state,
            city: user.city,
            language: user.language,
            specialization: user.specialization,
            about: user.about,
            skills: user.skills
        });
        setExperiences(user.experiences || []);
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

    const handleAddExperience = () => {
        setExperiences([...experiences, { ...experienceData, id: Date.now() }]);
        setExperienceData({
            title: '',
            company: '',
            startDate: '',
            endDate: '',
            description: ''
        });
    };

    const handleDeleteExperience = (id) => {
        setExperiences(experiences.filter(exp => exp.id !== id));
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
                            <button onClick={() => setShowApplications(!showApplications)} className={styles.showApplicationsButton}>
                                <FontAwesomeIcon icon={faBriefcase} /> {showApplications ? 'Hide Applications' : 'Show Applications'}
                            </button>
                        </div>
                    </div>
                    <h1 className={styles.title}>Profile</h1>
                    <div className={styles.userDetails}>
                        {user && (
                            <div>
                                <h2>{user.name}</h2>
                                <p>Specialization: {user.specialization}</p>
                                <p>Age: {user.age}</p>
                                <p>Location: {user.city}, {user.state}, {user.country}</p>
                                <p>Language: {user.language}</p>
                            </div>
                        )}
                    </div>
                    <section className={styles.section}>
                        <div className={styles.about}>
                            <h2>About</h2>
                            {editAboutMode ? (
                                <div>
                                    <textarea
                                        name="about"
                                        value={formData.about}
                                        onChange={handleInputChange}
                                        placeholder="Tell us about yourself"
                                        className={styles.textArea}
                                    />
                                    <div className={styles.editProfileButtons}>
                                        <button onClick={handleAboutUpdate} className={styles.saveButton}>Save</button>
                                        <button onClick={handleCancelEdit} className={styles.cancelButton}>Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <p>{user.about}</p>
                                    <button onClick={() => setEditAboutMode(true)} className={styles.editButton}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className={styles.skills}>
                            <h2>Top skills</h2>
                            {editSkillsMode ? (
                                <div>
                                    <textarea
                                        name="skills"
                                        value={formData.skills}
                                        onChange={handleInputChange}
                                        placeholder="List your top skills"
                                        className={styles.textArea}
                                    />
                                    <div className={styles.editProfileButtons}>
                                        <button onClick={handleSkillsUpdate} className={styles.saveButton}>Save</button>
                                        <button onClick={handleCancelEdit} className={styles.cancelButton}>Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <p>{user.skills}</p>
                                    <button onClick={() => setEditSkillsMode(true)} className={styles.editButton}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className={styles.experiences}>
                            <h2>Experiences</h2>
                            {editExperienceMode ? (
                                <div>
                                    {experiences.map(exp => (
                                        <div key={exp.id} className={styles.experienceItem}>
                                            <div>
                                                <p><strong>Title:</strong> {exp.title}</p>
                                                <p><strong>Company:</strong> {exp.company}</p>
                                                <p><strong>Start Date:</strong> {new Date(exp.startDate).toLocaleDateString()}</p>
                                                <p><strong>End Date:</strong> {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}</p>
                                                <p><strong>Description:</strong> {exp.description}</p>
                                            </div>
                                            <button onClick={() => handleDeleteExperience(exp.id)} className={styles.deleteButton}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </div>
                                    ))}
                                    <div className={styles.addExperience}>
                                        <h3>Add Experience</h3>
                                        <input
                                            type="text"
                                            name="title"
                                            value={experienceData.title}
                                            onChange={handleExperienceChange}
                                            placeholder="Title"
                                            className={styles.input}
                                        />
                                        <input
                                            type="text"
                                            name="company"
                                            value={experienceData.company}
                                            onChange={handleExperienceChange}
                                            placeholder="Company"
                                            className={styles.input}
                                        />
                                        <input
                                            type="date"
                                            name="startDate"
                                            value={experienceData.startDate}
                                            onChange={handleExperienceChange}
                                            className={styles.input}
                                        />
                                        <input
                                            type="date"
                                            name="endDate"
                                            value={experienceData.endDate}
                                            onChange={handleExperienceChange}
                                            className={styles.input}
                                        />
                                        <textarea
                                            name="description"
                                            value={experienceData.description}
                                            onChange={handleExperienceChange}
                                            placeholder="Description"
                                            className={styles.textArea}
                                        />
                                        <button onClick={handleAddExperience} className={styles.addButton}>
                                            <FontAwesomeIcon icon={faPlus} /> Add Experience
                                        </button>
                                    </div>
                                    <div className={styles.editProfileButtons}>
                                        <button onClick={handleExperienceUpdate} className={styles.saveButton}>Save</button>
                                        <button onClick={handleCancelEdit} className={styles.cancelButton}>Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    {experiences.length > 0 ? (
                                        experiences.map(exp => (
                                            <div key={exp.id} className={styles.experienceItem}>
                                                <div>
                                                    <p><strong>Title:</strong> {exp.title}</p>
                                                    <p><strong>Company:</strong> {exp.company}</p>
                                                    <p><strong>Start Date:</strong> {new Date(exp.startDate).toLocaleDateString()}</p>
                                                    <p><strong>End Date:</strong> {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}</p>
                                                    <p><strong>Description:</strong> {exp.description}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No experiences added yet.</p>
                                    )}
                                    <button onClick={() => setEditExperienceMode(true)} className={styles.editButton}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </section>
                    {showApplications && (
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
