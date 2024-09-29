import styles from "./post.modal.module.css";
import {Post, PostComment, PostContent, User} from "@/app/lib/definitions";
import {
    getComments,
    getContent,
    getUser,
    getPost,
    checkFollowing
} from "@/app/lib/data";
import ContentGallery from "@/app/ui/home/posts/content-gallery";
import Header from "../autor-header";
import {user} from "@/app/lib/data-placeholders";
import PostButtons from "@/app/ui/home/posts/buttons";
import ModalPortal from "@/app/ui/modal-portal";
import CloseButton from "@/app/ui/close-button";
import React from "react";
import CommentInput from "@/app/ui/home/posts/modal/comment-input";
import CommentsWrapper from "@/app/ui/home/posts/modal/comments-wrapper";

export type CommentWithUser = PostComment & { author: User };

export default async function PostModal({id}: {
    id: string
}) {
    const [post, content, comments]: [Post, PostContent[], PostComment[]] =
        await Promise.all([
            getPost(id),
            getContent(id),
            getComments(id)
        ]);

    const [author, isFollowing]: [User, boolean] =
        await Promise.all([
            getUser(post.user_id),
            checkFollowing(user.id, post.user_id)
        ]);

    const commentsWithUsers: CommentWithUser[] =
        await Promise.all(comments.map(async comment => {
            const author = await getUser(comment.user_id);
            return {...comment, author};
        }));

    return (
        <ModalPortal wrapperId={"postPortalWrapper"}>
            <div className={"overlay"}>
                <main className={styles.modalWindow}>
                    <ContentGallery content={content}
                                    size={{
                                        width: post.content_width,
                                        height: post.content_height
                                    }}
                                    modal={true}
                    />

                    <div className={styles.commentsArea}>
                        <Header post={post}
                                author={author}
                                isFollowing={isFollowing}
                        />

                        <CommentsWrapper commentsWithUsers={commentsWithUsers}
                                         author={author}
                                         description={post.description}
                        />

                        <PostButtons id={id}
                                     likes={post.likes}
                                     time={post.created_time}
                        />

                        <CommentInput/>
                    </div>
                </main>

                <CloseButton/>
            </div>
        </ModalPortal>
    );
}