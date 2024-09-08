import styles from "./post.module.css";
import PostCard from "@/app/ui/home/posts/post-card";
import { Post } from "@/app/lib/definitions";

export default function PostsList({ posts }: { posts: Post[] }) {
    return (
        <main className={styles.PostsList}>
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </main>
    );
}
