import styles from './page.module.css';
import Image from 'next/image';
import Button from '@/components/button/Button';

const Contact = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Let&apos;s keep in Touch</h1>
      <div className={styles.content}>
        <div className={styles.imgContainer}>
          <Image 
            src="/contact.png" 
            className={styles.image}
            layout="fill"
            alt="contact pic"
          />
        </div>
        <div className={styles.form}>
          <input type="text" placeholder="name" className={styles.input} />
          <input type="text" placeholder="email" className={styles.input} />
          <textarea className={styles.textArea} placeholder="Message" cols="30" rows="10"></textarea>
          <Button text="send" url="#" />
        </div>
      </div>
    </div>
  );
}

export default Contact;
