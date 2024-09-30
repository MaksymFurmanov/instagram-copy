import Image from 'next/image';
import {fetchStoriesGrouped} from "@/app/lib/data";
import styles from "./stories.module.css";
import {user} from "@/app/lib/data-placeholders";

export default async function StoriesList() {
    const storiesGrouped = await fetchStoriesGrouped(user.id);

    return (
        <main className={styles.StoriesList}>
            {storiesGrouped
                .sort((a, b) => {
                    const dateA = new Date(a.stories[0].created_time);
                    const dateB = new Date(b.stories[0].created_time);
                    if (dateA === dateB) return 0;
                    return dateA > dateB ? 1 : -1;
                })
                .map((stories, index) =>
                    <Image key={index}
                           src={stories.profile_pic_url}
                           className={styles.storiesCard}
                           alt={""}
                           width={50}
                           height={50}
                    />
                )
            }
        </main>
    );
}