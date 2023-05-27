import Image from "next/image";
import styles from './header.module.css';

export default function Header() {
    return <header className={styles.header}>
        <div className={styles.left}>
            <Image
            src="/logos/logo_yellow_header.png"
            alt="Logo Frustration"
            width="980"
            height="108"
            className={styles.logo}
            >

            </Image>
        </div>
        <div className={styles.right}>
                <button className={styles.button}>Acheter notre numéro</button>
        </div>
    </header>
}