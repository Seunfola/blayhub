'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './navbar.module.css';
import DarkMode from '../darkMode/DarkMode';
import { useState, useEffect } from 'react';

const links = [
  { id: 1, title: "Home", url: "/" },
  { id: 2, title: "About", url: "/about" },
  { id: 3, title: "Services", url: "/info" },
  { id: 4, title: "Profile", url: "/profile" },
  { id: 5, title: "Jobs", url: "/dashboard" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('click', closeMenu);
    } else {
      document.removeEventListener('click', closeMenu);
    }

    return () => {
      document.removeEventListener('click', closeMenu);
    };
  }, [menuOpen]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      toggleMenu(event);
    }
  };

  return (
    <div
      className={styles.container}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className={styles.logoContainer}>
        <Image src="/logo.svg" alt="Blay-hub Exchange Logo" className={styles.logoImage} width={50} height={50} />
        <Link href="/" className={styles.logoText}>BLAYHUB</Link>
      </div>
      <div className={`${styles.links} ${menuOpen ? styles.active : ''}`}>
        <DarkMode />
        {links.map(link => (
          <Link key={link.id} href={link.url} className={styles.link}>{link.title}</Link>
        ))}
      </div>
      <div
        className={styles.menuIcon}
        onClick={toggleMenu}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
      >
        &#9776;
      </div>
    </div>
  );
}

export default Navbar;
