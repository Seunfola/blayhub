'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from './layout.module.css';

const AdminLayout = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/dashboard/login');
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.role !== 'admin') {
          router.push('/dashboard');
        } else {
          setUser(response.data);
        }
      } catch (error) {
        localStorage.removeItem('token');
        router.push('/dashboard/login');
      }
    };

    fetchUser();
  }, [router]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.adminContainer}>
      <header className={styles.header}>
        <h1>Admin Portal</h1>
        <nav>
          <ul className={styles.navLinks}>
            <li>
              <a href="/admin/jobs">Manage Jobs</a>
            </li>
            <li>
              <a href="/dashboard">Dashboard</a>
            </li>
            <li>
              <a href="/dashboard/logout">Logout</a>
            </li>
          </ul>
        </nav>
      </header>
      {children}
    </div>
  );
};

export default AdminLayout;
