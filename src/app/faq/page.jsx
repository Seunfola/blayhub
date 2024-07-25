'use client';

import React from 'react';
import styles from './page.module.css';

const Faq = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1 className={styles.text}>Frequently Asked Questions</h1>
      </div>
      <div className={styles.desc}>
        <p className={styles.secondaryText}>Updated: 2023</p>
      </div>

      <div className={styles.stats}>
        <div>
          <h2>1. How do I create an account?</h2>
          <p className={styles.statText}>
            To create an account, click on the &quot;Sign Up&quot; button at the top right corner of the homepage. Fill in your personal details and follow the prompts to complete your registration.
          </p>
        </div>

        <div>
          <h2>2. How do I search for jobs?</h2>
          <p className={styles.statText}>
            You can search for jobs by entering keywords, job titles, or company names into the search bar on the homepage. You can also filter results by location, job type, and other criteria.
          </p>
        </div>

        <div>
          <h2>3. How do I apply for a job?</h2>
          <p className={styles.statText}>
            Once you find a job you&apos;re interested in, click on the job listing to view more details. If the job is a good fit, click the &quot;Apply&quot; button and follow the application instructions provided by the employer.
          </p>
        </div>

        <div>
          <h2>4. How can I update my profile?</h2>
          <p className={styles.statText}>
            To update your profile, log in to your account and go to the &quot;Profile&quot; section. Here, you can update your personal information, upload a new resume, and add skills or experience.
          </p>
        </div>

        <div>
          <h2>5. How do I save job listings?</h2>
          <p className={styles.statText}>
            To save a job listing, click the &quot;Save&quot; button on the job details page. You can view your saved jobs by going to the &quot;Saved Jobs&quot; section in your account.
          </p>
        </div>

        <div>
          <h2>6. How do I receive job alerts?</h2>
          <p className={styles.statText}>
            To receive job alerts, go to the &quot;Job Alerts&quot; section in your account and set up alerts based on your preferences. You will receive email notifications when new jobs that match your criteria are posted.
          </p>
        </div>

        <div>
          <h2>7. How do I contact customer support?</h2>
          <p className={styles.statText}>
            If you need assistance, you can contact our customer support team by clicking on the &quot;Contact Us&quot; link at the bottom of the page. Fill out the contact form and our support team will get back to you as soon as possible.
          </p>
        </div>

        <div>
          <h2>8. What should I do if I forget my password?</h2>
          <p className={styles.statText}>
            If you forget your password, click on the &quot;Forgot Password&quot; link on the login page. Follow the instructions to reset your password and regain access to your account.
          </p>
        </div>

        <div>
          <h2>9. How do I delete my account?</h2>
          <p className={styles.statText}>
            If you wish to delete your account, please contact our customer support team. They will guide you through the process of deleting your account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Faq;
