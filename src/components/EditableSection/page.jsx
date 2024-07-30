import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import styles from './page.module.css';

const EditableSection = ({ title, content, editMode, setEditMode, handleChange, handleSave, handleCancel }) => {
    return (
        <div className={styles.section}>
            <h2>{title}</h2>
            {editMode ? (
                <div>
                    <textarea
                        value={content}
                        onChange={(e) => handleChange(e.target.value)}
                        className={styles.textArea}
                    />
                    <div className={styles.buttons}>
                        <button onClick={handleSave} className={styles.saveButton}>Save</button>
                        <button onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
                    </div>
                </div>
            ) : (
                <div>
                    <p>{content}</p>
                    <button onClick={() => setEditMode(true)} className={styles.editButton}>
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default EditableSection;
