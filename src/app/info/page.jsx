import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Button from "@/components/button/Button";
import Head from "next/head";

const Info = () => {
  return (
    <>
      <Head>
        <title>Our Services - Blayhub</title>
        <meta name="description" content="Explore the wide range of services offered by Blayhub, including translations, artificial intelligence, and search engine evaluator services." />
        <meta property="og:title" content="Our Services - Blayhub" />
        <meta property="og:description" content="Explore the wide range of services offered by Blayhub, including translations, artificial intelligence, and search engine evaluator services." />
        <meta property="og:url" content="https://www.blayhub.com/services" />
        <meta property="og:image" content="https://www.blayhub.com/images/services-og-image.jpg" />
        <link rel="canonical" href="https://www.blayhub.com/services" />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.selectTitle}>Our Services</h1>
        <div className={styles.items}>
          <Link href="/info/illustrations" className={styles.item}>
            <span className={styles.title}>Translations</span>
          </Link>
          <Link href="/info/websites" className={styles.item}>
            <span className={styles.title}>Artificial Intelligence</span>
          </Link>
          <Link href="/info/applications" className={styles.item}>
            <span className={styles.title}>Search Engine Evaluator</span>
          </Link>
        </div>
        <div className={styles.btnContainer}>
          <Button url="/faq" text="FAQ" />
        </div>
      </div>
    </>
  );
};

export default Info;
