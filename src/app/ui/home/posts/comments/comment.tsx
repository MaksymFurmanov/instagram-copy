'use client';

import styles from "./post.comments.module.css";
import ProfilePic from "@/app/ui/profile-pic";
import {PostComment, PostCommentReply} from "@/app/lib/definitions";
import DotsMenuIcon from "./../../../../../../public/dots-menu.svg";
import LikeIcon from "./../../../../../../public/like.svg";
import LikeFilledIcon from "./../../../../../../public/like-filled.svg";
import getTimePassed from "@/app/utils/getTimePassed";
import {useState} from "react";
import withOverlay from "@/app/hocs/withOverlay";
import ReportWindow from "@/app/ui/home/posts/comments/report-window";

const ReportWindowOverlay = withOverlay(ReportWindow);

export default async function Comment({
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

    const replyHandler = () => {

    }

    const menuToggle = () => {
        setShowReplies(prevState => !prevState);
    }

    const replyToggle = () => {
        setShowReplies(prevState => !prevState);
    }

    const likeHandler = () => {
        setLiked(prevState => !prevState);
    }

    const timePassed = getTimePassed(comment.created_time);
    const LikeStatus = liked ? LikeIcon : LikeFilledIcon;

    return (
        <>
            <main className={styles.Comment}>
                <div>
                    <ProfilePic profilePicUrl={profilePicUrl}/>
                </div>

                <div>
                    <div>
                        <p><span>{nickname}</span>{comment.comment}</p>
                    </div>
                    <div className={styles.commentActions}>
                        <p>{timePassed}</p>
                        {comment.likes && <b>{comment.likes}</b>}
                        <b onClick={replyHandler}>Reply</b>
                        <DotsMenuIcon onClick={menuToggle}/>
                    </div>
                    <div>
                        <p onClick={replyToggle}>
                            {showReplies
                                ? "Show replies"
                                : "Hide replies"}
                        </p>
                    </div>
                </div>

                <div className={styles.commentLike}>
                    <LikeStatus onClick={likeHandler}/>
                </div>
            </main>

            {menuToggle && (
                <ReportWindowOverlay
                    onClose={menuToggle}
                />
            )}
        </>
    );
}