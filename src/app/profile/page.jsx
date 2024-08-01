'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from './page.module.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        about: '',
        skills: ''
    });
    const [skillsList, setSkillsList] = useState([]);
    const [experienceData, setExperienceData] = useState({
        title: '',
        company: '',
        startDate: '',
        endDate: '',
        description: ''
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
        const { name, value } = e.target;
        setExperienceData({ ...experienceData, [name]: value });
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
                skills: ''
            });
            setSkillsList(updatedUser.skills ? updatedUser.skills.split(',') : []);
            setExperiences(updatedUser.experiences || []);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleSave = async () => {
        await handlePartialUpdate({
            about: formData.about,
            skills: skillsList.join(','),
            experiences
        });
        setEditMode(false);
    };

    const handleAddSkill = () => {
        if (formData.skills.trim()) {
            setSkillsList([...skillsList, formData.skills.trim()]);
            setFormData({ ...formData, skills: '' });
        }
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

    const handleAddProject = () => {
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
        handleCloseProjectModal();
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
                            {/* <h2>About</h2> */}
                            {editMode ? (
                                <textarea
                                    name="about"
                                    value={formData.about}
                                    onChange={handleInputChange}
                                    placeholder="Tell us about yourself"
                                    className={styles.textArea}
                                />
                            ) : (
                                <p className={styles.profileabout}>{user.about}</p>
                            )}
                        </div>
                            
                            </div>
                        )}
                    </div>
                    <section className={styles.section}>
                        
                        <div className={styles.skills}>
                            <h2>Top skills</h2>
                            {editMode ? (
                                <div>
                                    <ul>
                                        {skillsList.map((skill, index) => (
                                            <li key={index}>{skill}</li>
                                        ))}
                                    </ul>
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
                                </div>
                            ) : (
                                <p>{skillsList.join(', ')}</p>
                            )}
                        </div>
                        <div className={styles.experiences}>
                            <h2>Experiences</h2>
                            {editMode ? (
                                <div>
                                    {experiences.map(exp => (
                                        <div key={exp.id} className={styles.experienceItem}>
                                            <div>
                                                <p><strong>Title:</strong> {exp.title}</p>
                                                <p><strong>Company:</strong> {exp.company}</p>
                                                <p><strong>Start Date:</strong> {new Date(exp.startDate).toLocaleDateString()}</p>
                                                <p><strong>End Date:</strong> {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}</p>
                                                <p><strong>Description:</strong> {exp.description}</p>
                                                {exp.projects && exp.projects.map(project => (
                                                    <div key={project.id}>
                                                        <p><strong>Project Name:</strong> {project.name}</p>
                                                        <p><strong>Link:</strong> <a href={project.link}>{project.link}</a></p>
                                                        <p><strong>Responsibility:</strong> {project.responsibility}</p>
                                                        <p><strong>Skills:</strong> {project.skills}</p>
                                                        <p><strong>Stack:</strong> {project.stack}</p>
                                                    </div>
                                                ))}
                                            </div>
                                            <button onClick={() => handleDeleteExperience(exp.id)} className={styles.deleteButton}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
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
                                                    {exp.projects && exp.projects.map(project => (
                                                        <div key={project.id}>
                                                            <p><strong>Project Name:</strong> {project.name}</p>
                                                            <p><strong>Link:</strong> <a href={project.link}>{project.link}</a></p>
                                                            <p><strong>Responsibility:</strong> {project.responsibility}</p>
                                                            <p><strong>Skills:</strong> {project.skills}</p>
                                                            <p><strong>Stack:</strong> {project.stack}</p>
                                                        </div>
                                                    ))}
                                                </div>
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
                        <button onClick={() => setEditMode(!editMode)} className={styles.editButton}>
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                        {editMode && (
                            <div className={styles.editProfileButtons}>
                                <button onClick={handleSave} className={styles.saveButton}>Save</button>
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
                                            <p><strong>Job Title:</strong> {application.job.title}</p>
                                            <p><strong>Company:</strong> {application.job.company}</p>
                                            <p><strong>Status:</strong> pending</p>
                                            <p><strong>Location:</strong> {application.job.country}</p>
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
