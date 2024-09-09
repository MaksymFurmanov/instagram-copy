import {Post, PostComment} from "@/app/lib/definitions";
import styles from "./post.module.css";
import ContentGallery from "@/app/ui/home/posts/content-gallery";
import PostButtons from "@/app/ui/home/posts/post-buttons";
import Header from "./post-card-header";
import {checkFollowing, getContent, getUser} from "@/app/lib/data";
import {user} from "@/app/lib/data-placeholders";
import CommentSection from "@/app/ui/home/posts/comment-section";

export default async function PostCard({post}: {
    post: Post
}) {
    const content = await getContent(post.id);
    const postAuthor = await getUser(post.user_id);
    const isFollowing = await checkFollowing(user.id, post.user_id);
    const commentExamples: PostComment[] = [];

    if(postAuthor === undefined) {
        throw new Error("Post author not found");
    }

    return (
        <main className={styles.PostCard}>
            <Header post={post}
                    author={postAuthor}
                    isFollowing={isFollowing}
            />

            <ContentGallery content={content}/>

            <PostButtons likes={post.likes}/>

            {post.description &&
                <div className={styles.description}>
                    <p>
                        <span>{postAuthor.nickname} </span>
                        {post.description}
                    </p>
                </div>
            }

            <CommentSection commentCount={post.comments}
                            commentExamples={commentExamples}
            />
        </main>
    );
}