'use client';

import styles from "./post.module.css";
import Image from "next/image";
import ProfilePic from "@/app/ui/profile-pic";
import {PostComment, PostCommentReply, User} from "@/app/lib/definitions";
import DotsMenuIcon from "../../../../../public/dots-menu.svg";
import LikeIcon from "../../../../../public/like.svg";
import LikeFilledIcon from "../../../../../public/like-filled.svg";
import LineHorizontal from "../../../../../public/line-horizontal.svg";
import LoadingSpinner from "./../../../../../public/loading-spinner.gif";
import getTimePassed from "@/app/utils/getTimePassed";
import {useState} from "react";
import PostCommentReplies from "@/app/ui/home/posts/replies";

export type ReplyWithAuthor = PostCommentReply & { author: User };

export default function Comment({
                                    comment,
                                    profilePicUrl,
                                    nickname
                                }: {
    comment: PostComment | PostCommentReply,
    profilePicUrl: string,
    nickname: string
}) {
    const [liked, setLiked] = useState<boolean>(false);
    const [showReplies, setShowReplies] = useState<boolean>(false);
    const [loadingReplies, setRepliesLoading] = useState<boolean>(false);

    const replyHandler = () => {

    }

    const menuToggle = () => {

    }

    const replyToggle = () => {
        setShowReplies(prevState => {
            if (!prevState) setRepliesLoading(true);
            return !prevState;
        });
    }

    const likeHandler = () => {
        setLiked(prevState => !prevState);
    }

    const timePassed = getTimePassed(comment.created_time);
    const likes: number = liked
        ? Number(comment.likes) + 1
        : comment.likes;
    const LikeStatus = liked ? LikeFilledIcon : LikeIcon;

    return (
        <main className={styles.Comment}>
            <ProfilePic profilePicUrl={profilePicUrl}/>

            <div style={{flexGrow: 1}}>
                <div className={styles.commentContainer}>
                    <div>
                        <div>
                            <p><b>{nickname}</b> {comment.comment}</p>
                        </div>

                        <div className={styles.commentActions}>
                            <p>{timePassed}</p>
                            {likes &&
                                <b>{`${likes} ${likes == 1 ? "like" : "likes"}`}</b>
                            }
                            <button onClick={replyHandler}>Reply</button>
                            <DotsMenuIcon className={styles.moreActions}
                                          onClick={menuToggle}
                            />
                        </div>

                        {(comment as PostComment).replies > 0 &&
                            <div className={styles.replyToggle}>
                                <LineHorizontal/>
                                <b onClick={replyToggle}>
                                    {showReplies
                                        ? "Hide replies"
                                        : `View all ${(comment as PostComment).replies} replies`
                                    }
                                </b>
                                {loadingReplies &&
                                    <Image src={LoadingSpinner}
                                           alt={"loading"}
                                    />
                                }
                            </div>
                        }
                    </div>

                    <LikeStatus onClick={likeHandler}
                                className={styles.commentLike}
                    />
                </div>

                {showReplies &&
                    <PostCommentReplies comment_id={comment.id}
                                        setLoading={setRepliesLoading}
                    />
                }
            </div>
        </main>
    );
}