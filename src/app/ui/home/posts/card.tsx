import {Post, PostComment} from "@/app/lib/definitions";
import styles from "./post.module.css";
import ContentGallery from "@/app/ui/home/posts/content-gallery";
import PostButtons from "@/app/ui/home/posts/buttons";
import Header from "./autor-header";
import {checkFollowing, getContent, getUser} from "@/app/lib/data";
import {user} from "@/app/lib/data-placeholders";
import CommentsShort from "@/app/ui/home/posts/comments-short";
import Description from "@/app/ui/home/posts/description";

export default async function PostCard({post}: {
    post: Post
}) {
    const content = await getContent(post.id);
    const author = await getUser(post.user_id);
    const isFollowing = await checkFollowing(user.id, post.user_id);
    const commentExamples: PostComment[] = [];

    if (author === undefined) {
        throw new Error("Post author not found");
    }

    return (
        <main className={styles.PostCard}>
            <Header post={post}
                    author={author}
                    isFollowing={isFollowing}
                    showTimePassed={true}
            />

            <ContentGallery content={content}
                            size={{
                                width: post.content_width,
                                height: post.content_height
                            }}
            />

            <PostButtons id={post.id} likes={post.likes}/>

            {post.description &&
                <Description nickname={author.nickname}
                             description={post.description}
                />
            }

            <CommentsShort commentCount={post.comments}
                           commentExamples={commentExamples}
            />
        </main>
    );
}