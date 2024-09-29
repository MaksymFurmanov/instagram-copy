import styles from "./post.modal.module.css";
import ProfilePic from "@/app/ui/profile-pic";
import Description from "@/app/ui/home/posts/description";
import Comment from "@/app/ui/home/posts/comment";
import React from "react";
import {CommentWithUser} from "@/app/ui/home/posts/modal/modal";
import {User} from "@/app/lib/definitions";

export default function CommentsWrapper({
                                            commentsWithUsers,
                                            author,
                                            description = undefined
                                        }: {
    commentsWithUsers: CommentWithUser[],
    author: User,
    description: string | undefined
}) {
    return (
        <main className={styles.CommentsWrapper}>

            {description &&
                <div style={{display: "flex"}}>
                    <ProfilePic profilePicUrl={author.profile_pic_url}/>
                    <Description nickname={author.nickname}
                                 description={description}
                    />
                </div>
            }

            {commentsWithUsers.map(commentatorWithComment =>
                <Comment key={commentatorWithComment.id}
                         comment={commentatorWithComment}
                         profilePicUrl={
                             commentatorWithComment
                                 .author
                                 .profile_pic_url
                         }
                         nickname={
                             commentatorWithComment
                                 .author
                                 .nickname
                         }
                />
            )}

        </main>
    );
}