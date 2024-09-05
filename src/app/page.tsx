import {fetchPosts, fetchStoriesGrouped} from "@/app/lib/data";
import Header from "@/app/ui/home/header";
import StoriesList from "@/app/ui/home/stories/stories-list";
import PostsList from "@/app/ui/home/posts/posts-list";
import {user} from "@/app/lib/data-placeholders";
import Recommendations from "@/app/ui/home/recommendations";
import Footer from "@/app/ui/footer";
import styles from "./ui/home/home.module.css"

export type HomeVariant = "" | "home" | "following" | undefined;

export default async function Page({
                                       searchParams
                                   }: {
    searchParams?: {
        variant?: HomeVariant,
    }
}) {
    const variant = searchParams?.variant || "home";

    const posts = await fetchPosts(variant);
    const storiesGrouped = await fetchStoriesGrouped(user.id);

    return (
        <main className={styles.Home}>
            <div>
                <Header variant={variant}/>
                <StoriesList storiesGrouped={storiesGrouped}/>
                <PostsList variant={variant} posts={posts}/>
            </div>
            <Recommendations/>
            <Footer/>
        </main>
    );
}
