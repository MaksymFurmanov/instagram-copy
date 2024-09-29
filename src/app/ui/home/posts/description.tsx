import styles from "@/app/ui/home/posts/post.module.css";

export default function Description({nickname, description}: {
    nickname: string,
    description: string
}) {
    return (
        <main className={styles.Description}>
            <p>
                <b>{nickname} </b>
                {description}
            </p>
        </main>
    );
}