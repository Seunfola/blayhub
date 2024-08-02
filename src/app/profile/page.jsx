'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faEdit, faPlus, faTrash, faSave } from '@fortawesome/free-solid-svg-icons';
import styles from './page.module.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        about: '',
        company: '',
        address: '',
        skills: ''
    });
    const [skillsList, setSkillsList] = useState([]);
    const [experienceData, setExperienceData] = useState({
        title: '',
        company: '',
        startDate: '',
        endDate: '',
        description: '',
        location: '',
        workMode: '',
        currentlyWorking: false
    });
    const [experiences, setExperiences] = useState([]);
    const [projectModalOpen, setProjectModalOpen] = useState(false);
    const [projectData, setProjectData] = useState({
        name: '',
        link: '',
        responsibility: '',
        skills: '',
        stack: ''
    });
    const [selectedExperienceId, setSelectedExperienceId] = useState(null);
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
                setUser(userData);
                setFormData({
                    about: userData.about || '',
                    company: userData.company || '',
                    address: userData.address || '',
                    skills: ''
                });
                setSkillsList(userData.skills ? userData.skills.split(',') : []);
                setExperiences(userData.experiences || []);
                setApplications(userData.jobApplications || []);
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
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setExperienceData({ ...experienceData, [name]: checked });
        } else {
            setExperienceData({ ...experienceData, [name]: value });
        }
    };

    const handleProjectChange = (e) => {
        const { name, value } = e.target;
        setProjectData({ ...projectData, [name]: value });
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
                about: updatedUser.about || '',
                company: updatedUser.company || '',
                address: updatedUser.address || '',
                skills: ''
            });
            setSkillsList(updatedUser.skills ? updatedUser.skills.split(',') : []);
            setExperiences(updatedUser.experiences || []);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleSaveAbout = async () => {
        await handlePartialUpdate({
            about: formData.about,
            company: formData.company,
            address: formData.address,
        });
        setEditMode(false);
    };

    const handleSaveSkills = async () => {
        await handlePartialUpdate({
            skills: skillsList.join(','),
        });
        setEditMode(false);
    };

    const handleAddSkill = () => {
        if (formData.skills.trim()) {
            setSkillsList([...skillsList, formData.skills.trim()]);
            setFormData({ ...formData, skills: '' });
        }
    };

    const handleAddExperience = async () => {
        const newExperience = { ...experienceData, id: Date.now(), endDate: experienceData.currentlyWorking ? null : experienceData.endDate };
        const updatedExperiences = [...experiences, newExperience];
        setExperiences(updatedExperiences);
        setExperienceData({
            title: '',
            company: '',
            startDate: '',
            endDate: '',
            description: '',
            location: '',
            workMode: '',
            currentlyWorking: false
        });

        await handlePartialUpdate({ experiences: updatedExperiences });
    };

    const handleSaveExperience = async () => {
        await handlePartialUpdate({ experiences });
        setEditMode(false);
    };

    const handleDeleteExperience = async (id) => {
        const updatedExperiences = experiences.filter(exp => exp.id !== id);
        setExperiences(updatedExperiences);
        await handlePartialUpdate({ experiences: updatedExperiences });
    };

    const handleEditExperience = (id) => {
        const experienceToEdit = experiences.find(exp => exp.id === id);
        setExperienceData(experienceToEdit);
        setEditMode(true);
    };

    const handleOpenProjectModal = (experienceId) => {
        setSelectedExperienceId(experienceId);
        setProjectModalOpen(true);
    };

    const handleCloseProjectModal = () => {
        setProjectModalOpen(false);
        setProjectData({
            name: '',
            link: '',
            responsibility: '',
            skills: '',
            stack: ''
        });
    };

    const handleAddProject = async () => {
        const updatedExperiences = experiences.map(exp => {
            if (exp.id === selectedExperienceId) {
                return {
                    ...exp,
                    projects: [...(exp.projects || []), { ...projectData, id: Date.now() }]
                };
            }
            return exp;
        });
        setExperiences(updatedExperiences);
        await handlePartialUpdate({ experiences: updatedExperiences });
        handleCloseProjectModal();
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short' }; // Format: Mar 2021
        return date.toLocaleDateString('en-US', options);
    };

    const calculateDuration = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = endDate ? new Date(endDate) : new Date();
        const durationInMonths = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();
        const years = Math.floor(durationInMonths / 12);
        const months = durationInMonths % 12;
        return `${years > 0 ? years + ' yrs ' : ''}${months > 0 ? months + ' mos' : ''}`;
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Profile</h1>
            {loading ? (
                <div className={styles.loadingContainer}>
                    <FontAwesomeIcon icon={faSpinner} spin />
                </div>
            ) : (
                <div>
                    <div className={styles.navcontainer}>
                        {/* Add navigation if necessary */}
                    </div>
                    <div className={styles.userDetails}>
                        {user && (
                            <div>
                                <h2>{user.name}</h2>
                                <div className={styles.about}>
                                    {editMode ? (
                                        <div>
                                            <textarea
                                                name="about"
                                                value={formData.about}
                                                onChange={handleInputChange}
                                                placeholder="Tell us about yourself"
                                                className={styles.textArea}
                                            />
                                            <input
                                                type="text"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleInputChange}
                                                placeholder="Company"
                                                className={styles.input}
                                            />
                                            <input
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                placeholder="Address"
                                                className={styles.input}
                                            />
                                            <button onClick={handleSaveAbout} className={styles.saveButton}>
                                                <FontAwesomeIcon icon={faSave} /> Save About
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            <p className={styles.profileabout}>{user.about}</p>
                                            <p>{user.company}</p>
                                            <p>{user.address}</p>
                                        </div>
                                    )}
                                </div>
                                <div className={styles.topSkills}>
                                    <h2>Top skills</h2>
                                    {editMode ? (
                                        <div>
                                            <textarea
                                                name="skills"
                                                value={formData.skills}
                                                onChange={handleInputChange}
                                                placeholder="Add a skill"
                                                className={styles.textArea}
                                            />
                                            <button onClick={handleAddSkill} className={styles.addButton}>
                                                <FontAwesomeIcon icon={faPlus} /> Add Skill
                                            </button>
                                            <button onClick={handleSaveSkills} className={styles.saveButton}>
                                                <FontAwesomeIcon icon={faSave} /> Save Skills
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            {skillsList.map((skill, index) => (
                                                <span key={index} className={styles.skillBadge}>{skill}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <section className={styles.section}>
                        <div className={styles.experiences}>
                            <h2>Experiences</h2>
                            {editMode ? (
                                <div>
                                    {experiences.map(exp => (
                                        <div key={exp.id} className={styles.experienceItem}>
                                            <div className={styles.experienceHeader}>
                                                <div>
                                                    <p className={styles.experienceTitle}>{exp.title}</p>
                                                    <p className={styles.experienceCompany}>{exp.company}</p>
                                                    <p className={styles.experienceDuration}>{calculateDuration(exp.startDate, exp.endDate)}</p>
                                                    <p className={styles.experienceDuration}>{exp.location}</p>
                                                    <p className={styles.experienceDuration}>{exp.workMode}</p>
                                                </div>
                                                <button onClick={() => handleEditExperience(exp.id)} className={styles.editButton}>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </button>
                                                <button onClick={() => handleDeleteExperience(exp.id)} className={styles.deleteButton}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </div>
                                            <div className={styles.experienceDetails}>
                                                <p className={styles.experienceDescription}>{exp.description}</p>
                                                {exp.projects && exp.projects.map(project => (
                                                    <div key={project.id}>
                                                        <p>{project.name}</p>
                                                        <p><a href={project.link}>{project.link}</a></p>
                                                        <p>{project.responsibility}</p>
                                                        <p>{project.skills}</p>
                                                        <p>{project.stack}</p>
                                                    </div>
                                                ))}
                                            </div>
                                            <button onClick={() => handleOpenProjectModal(exp.id)} className={styles.addButton}>
                                                <FontAwesomeIcon icon={faPlus} /> Add Project
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
                                            disabled={experienceData.currentlyWorking}
                                        />
                                        <label className={styles.currentlyWorkingLabel}>
                                            <input
                                                type="checkbox"
                                                name="currentlyWorking"
                                                checked={experienceData.currentlyWorking}
                                                onChange={handleExperienceChange}
                                            />
                                            Currently working
                                        </label>
                                        <textarea
                                            name="description"
                                            value={experienceData.description}
                                            onChange={handleExperienceChange}
                                            placeholder="Description"
                                            className={styles.textArea}
                                        />
                                        <input
                                            type="text"
                                            name="location"
                                            value={experienceData.location}
                                            onChange={handleExperienceChange}
                                            placeholder="Location"
                                            className={styles.input}
                                        />
                                        <input
                                            type="text"
                                            name="workMode"
                                            value={experienceData.workMode}
                                            onChange={handleExperienceChange}
                                            placeholder="Work Mode"
                                            className={styles.input}
                                        />
                                        <button onClick={handleAddExperience} className={styles.addButton}>
                                            <FontAwesomeIcon icon={faPlus} /> Add Experience
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    {experiences.length > 0 ? (
                                        experiences.map(exp => (
                                        <div key={exp.id} className={styles.experienceItem}>
   <div className={styles.experienceHeader}>
                                                    <div>
                                                        <p className={styles.experienceTitle}>{exp.title}</p>
                                                        <p className={styles.experienceCompany}>{exp.company} <span>{calculateDuration(exp.startDate, exp.endDate)}</span></p>
                                                        <p className={styles.experienceDates}>{formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'} . {calculateDuration(exp.startDate, exp.endDate)}</p>
                                                        <p className={styles.experienceLocation}>{exp.location}</p>
                                                        <p className={styles.experienceWorkMode}>{exp.workMode}</p>
                                                    </div>
                                                    <button onClick={() => handleEditExperience(exp.id)} className={styles.editButton}>
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </button>
                                                    <button onClick={() => handleDeleteExperience(exp.id)} className={styles.deleteButton}>
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                </div>
    <div className={styles.experienceDetails}>
        <p className={styles.experienceDescription}>{exp.description}</p>
        {exp.projects && exp.projects.map(project => (
            <div key={project.id}>
                <p>{project.name}</p>
                <p><a href={project.link}>{project.link}</a></p>
                <p>{project.responsibility}</p>
                <p>{project.skills}</p>
                <p>{project.stack}</p>
            </div>
        ))}
    </div>
    <button onClick={() => handleOpenProjectModal(exp.id)} className={styles.addButton}>
        <FontAwesomeIcon icon={faPlus} /> Add Project
    </button>
</div>

                                        ))
                                    ) : (
                                        <p>No experiences added yet.</p>
                                    )}
                                </div>
                            )}
                            {projectModalOpen && (
                                <div className={styles.projectModal}>
                                    <div className={styles.projectModalContent}>
                                        <h3>Add Project</h3>
                                        <input
                                            type="text"
                                            name="name"
                                            value={projectData.name}
                                            onChange={handleProjectChange}
                                            placeholder="Project Name"
                                            className={styles.input}
                                        />
                                        <input
                                            type="text"
                                            name="link"
                                            value={projectData.link}
                                            onChange={handleProjectChange}
                                            placeholder="Project Link"
                                            className={styles.input}
                                        />
                                        <textarea
                                            name="responsibility"
                                            value={projectData.responsibility}
                                            onChange={handleProjectChange}
                                            placeholder="Responsibility"
                                            className={styles.textArea}
                                        />
                                        <textarea
                                            name="skills"
                                            value={projectData.skills}
                                            onChange={handleProjectChange}
                                            placeholder="Skills"
                                            className={styles.textArea}
                                        />
                                        <textarea
                                            name="stack"
                                            value={projectData.stack}
                                            onChange={handleProjectChange}
                                            placeholder="Tech Stack"
                                            className={styles.textArea}
                                        />
                                        <div className={styles.modalButtons}>
                                            <button onClick={handleAddProject} className={styles.saveButton}>
                                                <FontAwesomeIcon icon={faPlus} /> Add Project
                                            </button>
                                            <button onClick={handleCloseProjectModal} className={styles.cancelButton}>
                                                <FontAwesomeIcon icon={faTrash} /> Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <button onClick={() => setEditMode(!editMode)} className={styles.editButton2}>
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                        {editMode && (
                            <div className={styles.editProfileButtons}>
                                <button onClick={handleSaveExperience} className={styles.saveButton}>Save Experience</button>
                                <button onClick={() => setEditMode(false)} className={styles.cancelButton}>Cancel</button>
                            </div>
                        )}
                    </section>
                    <section className={styles.section}>
                        <h2>Applications</h2>
                        {applications.length === 0 ? (
                            <p>No applications found.</p>
                        ) : (
                            applications.map(application => (
                                <div key={application.id} className={styles.applicationItem}>
                                    <div className={styles.applicationHeader}>
                                        <div>
                                            <p>{application.job.title}</p>
                                            <p>{application.job.company}</p>
                                            <p>{application.job.status}</p>
                                            <p>{application.job.country}</p>
                                        </div>
                                        <button onClick={() => handleDelete(application.id)} className={styles.deleteButton}>
                                            Delete Application
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </section>
                </div>
            )}
        </div>
    );
};

export default Profile;
