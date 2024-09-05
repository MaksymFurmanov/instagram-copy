import Image from 'next/image';
import {StoriesGrouped} from "@/app/lib/data";
import styles from "./stories.module.css";

export default function StoriesList(
    {storiesGrouped}: { storiesGrouped: StoriesGrouped[] }
) {
    return (
        <main className={styles.StoriesList}>
            {storiesGrouped
                .sort((a, b) => {
                    const a_ = new Date(a.stories[0].created_time);
                    const b_ = new Date(b.stories[0].created_time);
                    if (a_ === b_) return 0;
                    return a_ > b_ ? 1 : -1;
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