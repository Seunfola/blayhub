'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { FileUpload } from '@/components/FileUpload';

const Apply = ({ params }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        linkedin: '',
        github: '',
        coverLetter: '',
        resumeUrl: '', 
    });
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = {
            ...formData,
            jobId: params.id,
        };

        try {
            const response = await fetch('/api/jobs/apply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(form),
            });
            if (response.ok) {
                setMessage('Application submitted successfully');
                router.push('/profile');
            } else if (response.status === 409) {
                router.push(`/apply/${params.id}/error-application`);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to submit application');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setMessage(error.message);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Apply for Job Role</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className={styles.input}
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className={styles.input}
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    className={styles.input}
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    className={styles.input}
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
                <input
                    type="url"
                    name="linkedin"
                    placeholder="LinkedIn Profile"
                    className={styles.input}
                    value={formData.linkedin}
                    onChange={handleChange}
                />
                <input
                    type="url"
                    name="github"
                    placeholder="GitHub Profile"
                    className={styles.input}
                    value={formData.github}
                    onChange={handleChange}
                />
                <textarea
                    name="coverLetter"
                    placeholder="Cover Letter"
                    className={styles.textarea}
                    value={formData.coverLetter}
                    onChange={handleChange}
                    rows="5"
                ></textarea>
                
                <FileUpload
                    endpoint="documentUpload"
                    onChange={(url) => {
                        if (url) {
                            setFormData({ ...formData, resumeUrl: url });
                        }
                    }}
                />
                <button type="submit" className={styles.button}>
                    Submit Application
                </button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default Apply;
