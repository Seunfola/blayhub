'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import styles from './navbar.module.css';
import DarkMode from '../darkMode/DarkMode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faCogs, faUser, faBriefcase } from '@fortawesome/free-solid-svg-icons';

const userLinks = [
  { id: 1, title: "Home", url: "/", icon: faHome },
  { id: 2, title: "About", url: "/about", icon: faInfoCircle },
  { id: 3, title: "Services", url: "/info", icon: faCogs },
  { id: 4, title: "Jobs", url: "/jobs", icon: faBriefcase },
  { id: 5, title: "Profile", url: "/profile", icon: faUser },
];

const employerLinks = [
  { id: 1, title: "Home", url: "/", icon: faHome },
  { id: 2, title: "About", url: "/about", icon: faInfoCircle },
  { id: 3, title: "Services", url: "/info", icon: faCogs },
  { id: 4, title: "My Jobs", url: "/employer/Myjobs", icon: faBriefcase },
  { id: 5, title: "Post Job", url: "/employer/postjobs", icon: faUser },
];

const Navbar = () => {
  const { data: session } = useSession();
  const isEmployer = session?.user?.role === 'employer';

  const links = isEmployer ? employerLinks : userLinks;

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Image src="/logo.svg" alt="Blayhub Exchange Logo" className={styles.logoImage} width={50} height={50} />
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
