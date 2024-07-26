import React from 'react';
import styles from './page.module.css';

const categories = ['All', 'Software & Data', 'Translation', 'Transcription', 'AI Annotation', 'Data Collection', 'Customer Support', 'Content Creation', 'Marketing', 'Design', 'Administration'];

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className={styles.categoryFilter}>
      {categories.map(category => (
        <button
          key={category}
          className={`${styles.categoryButton} ${selectedCategory === category ? styles.active : ''}`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
