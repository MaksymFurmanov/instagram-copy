import styles from "./post.module.css";
import PostCard from "@/app/ui/home/posts/card";
import {Post} from "@/app/lib/definitions";
import {fetchFollowingPosts, fetchFYPPosts} from "@/app/lib/data";
import {user} from "@/app/lib/data-placeholders";

export default async function PostsList({variant}: {
    variant: string,
}) {
    let posts: Post[];
    if (variant === "home") {
        posts = await fetchFYPPosts();
    } else {
        posts = await fetchFollowingPosts(user.id);
    }

    return (
        <main className={styles.PostsList}>
            {posts.map((post) => (
                <PostCard key={post.id} post={post}/>
            ))}
        </main>
    );
}
