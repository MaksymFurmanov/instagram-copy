import styles from "./right-side-bar.module.css";
import Image from "next/image";

export default function Suggestion() {
    return (
        <main>
            <Image src={""}
                   alt={""}
            />
            <button className={styles.actionBtn}>
                Follow
            </button>
        </main>
    );
}