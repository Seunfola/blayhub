'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './navbar.module.css';
import DarkMode from '../darkMode/DarkMode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faCogs, faUser, faBriefcase, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const links = [
  { id: 1, title: "Home", url: "/", icon: faHome },
  { id: 2, title: "About", url: "/about", icon: faInfoCircle },
  { id: 3, title: "Services", url: "/info", icon: faCogs },
  { id: 4, title: "Profile", url: "/profile", icon: faUser },
  { id: 5, title: "Jobs", url: "/dashboard", icon: faBriefcase },
];

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Image src="/logo.svg" alt="Blay-hub Exchange Logo" className={styles.logoImage} width={50} height={50} />
        <Link href="/" className={styles.logoText}>BLAYHUB</Link>
      </div>
      <div className={styles.links}>
        {links.map(link => (
          <Link key={link.id} href={link.url} className={styles.link}>
            <FontAwesomeIcon icon={link.icon} className="fa-icon" />
            <span className={styles.linkText}>{link.title}</span>
          </Link>
        ))}
        <DarkMode />
      </div>
    </div>
  );
}

export default Navbar;
