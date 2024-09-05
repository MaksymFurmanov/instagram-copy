import styles from "./post.module.css";
import PostCard from "@/app/ui/home/posts/post-card";
import {Post} from "@/app/lib/definitions";
import {getContent, getUser} from "@/app/lib/data";

export default function PostsList({posts}:
                                      { posts: Post[] }) {
    return (
        <main className={styles.PostsList}>
            {posts.map(async post => {
                const content = await getContent(post.id);
                const postAuthor = await getUser(post.user_id);
                return <PostCard content={content} author={postAuthor}/>
            })}
        </main>
    );
}