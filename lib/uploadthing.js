'use client';

import React, { useState, useCallback, useRef } from 'react';
import styles from '@/app/styles/upload.module.css';

export const UploadDropzone = ({ endpoint, onClientUploadComplete, onUploadError }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);

    const handleDragOver = useCallback((event) => {
        event.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((event) => {
        event.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback(
        (event) => {
            event.preventDefault();
            setIsDragging(false);

            const uploadedFiles = Array.from(event.dataTransfer.files);
            setFiles(uploadedFiles);

            simulateUpload(uploadedFiles, endpoint)
                .then((res) => onClientUploadComplete(res))
                .catch((error) => onUploadError(error));
        },
        [endpoint, onClientUploadComplete, onUploadError]
    );

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setFiles(selectedFiles);
        simulateUpload(selectedFiles, endpoint)
            .then((res) => onClientUploadComplete(res))
            .catch((error) => onUploadError(error));
    };

    const simulateUpload = (files, endpoint) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (endpoint) {
                    resolve(files.map((file) => ({ url: URL.createObjectURL(file), name: file.name })));
                } else {
                    reject(new Error('Invalid endpoint'));
                }
            }, 1000);
        });
    };

    return (
        <div className={styles.uploadContainer}>
            <div
                className={`${styles.dropzone} ${isDragging ? styles.dragging : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()} 
            >
                <p>Drag and drop files here, or click to select files</p>
                <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }} 
                />
            </div>
            <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className={styles.uploadButton}
            >
                Choose Files
            </button>
            {files.length > 0 && (
                <div>
                    <h3>Selected Files:</h3>
                    <ul>
                        {files.map((file, index) => (
                            <li key={index}>{file.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
