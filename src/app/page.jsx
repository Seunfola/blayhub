import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.item}>
          <h1 className={styles.title}>Bridging Talent and Tech.</h1>
          <p className={styles.desc}>
            Experience tailored solutions and exceptional talent that elevate your AI journey.
            <br />
            <br/>
            Delve into a new dimension of Artificial Intelligence. Our platform connects you with top-notch AI professionals who are ready to tackle your unique challenges and drive your projects to success.
          </p>
          <p className={styles.desc}>
            Whether you need data scientists, machine learning experts, or AI consultants, we have the right talent for you. Our rigorous selection process ensures you work with only the best in the field.
          </p>
        </div>
        <div className={styles.item}>
          <Image src='/hero.png' width={500} height={500} alt='hero image' className={styles.img} />
        </div>
      </div>
    </div>
  )
}
