import React from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import Button from '@/components/button/Button';

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image 
          src="https://images.pexels.com/photos/3194521/pexels-photo-3194521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          fill={true} 
          alt='Job Search' 
          className={styles.img} 
        />
        <div className={styles.imgText}>
          <h1 className={styles.imgTitle}>Empowering Your Career Journey</h1>
          <h2 className={styles.imgDesc}>Connecting talent with opportunity through innovative job search solutions.</h2>
        </div>
      </div>
      <div className={styles.textContainer}>
        <div className={styles.item}>
          <h1 className={styles.itemTitle}>Our Mission</h1>
          <p className={styles.itemDesc}>
            At Blayhub, our mission is to revolutionize the job search experience. We understand the challenges job seekers face, and we are dedicated to providing comprehensive solutions that make the process easier and more efficient. Our platform leverages advanced technology to match candidates with the right opportunities, ensuring that both job seekers and employers achieve their goals.
            <br />
            <br />
            Our team of experts is committed to delivering exceptional service, from personalized job recommendations to insightful career advice. We believe in the power of connections and strive to build a community where talent meets opportunity.
          </p>
        </div>
        <div className={styles.item}>
          <h1 className={styles.itemTitle}>What We Offer</h1>
          <p className={styles.itemDesc}>
            Blayhub offers a suite of services designed to support your career journey:
            <br />
            <br />
            <strong>Job Listings:</strong> Browse thousands of job openings across various industries and locations. Our advanced search filters help you find the perfect match quickly.
            <br />
            <br />
            <strong>Resume Building:</strong> Create a professional resume using our easy-to-use tools. Showcase your skills and experience to stand out to potential employers.
            <br />
            <br />
            <strong>Career Resources:</strong> Access a wealth of resources including articles, webinars, and workshops to enhance your job search strategy and career development.
            <br />
            <br />
            <strong>Employer Connections:</strong> Connect directly with employers who are actively seeking candidates. Our platform facilitates meaningful interactions that lead to successful hires.
          </p>
          <Button url="/contact" text="Contact Us" />
        </div>
      </div>
    </div>
  );
}

export default About;
