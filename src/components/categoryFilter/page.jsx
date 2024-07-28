import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLaptopCode,
  faLanguage,
  faKeyboard,
  faRobot,
  faDatabase,
  faHeadset,
  faPenNib,
  faBullhorn,
  faPaintBrush,
  faClipboard,
  faListAlt
} from '@fortawesome/free-solid-svg-icons';
import styles from './page.module.css';

const categories = [
  { name: 'Software & Data', icon: faLaptopCode },
  { name: 'Translation', icon: faLanguage },
  { name: 'Transcription', icon: faKeyboard },
  { name: 'AI Annotation', icon: faRobot },
  { name: 'Data Collection', icon: faDatabase },
  { name: 'Customer Support', icon: faHeadset },
  { name: 'Content Creation', icon: faPenNib },
  { name: 'Marketing', icon: faBullhorn },
  { name: 'Design', icon: faPaintBrush },
  { name: 'Administration', icon: faClipboard }
];

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className={styles.categoryFilter}>
      {categories.map(category => (
        <button
          key={category.name}
          className={`${styles.categoryButton} ${selectedCategory === category.name ? styles.active : ''}`}
          onClick={() => onCategoryChange(category.name)}
        >
          <FontAwesomeIcon icon={category.icon} className={styles.categoryIcon} />
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
