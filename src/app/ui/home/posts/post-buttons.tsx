'use client';

import styles from "./post.module.css";
import LikeIcon from "../../../../../public/like.svg";
import LikeFilledIcon from "../../../../../public/like-filled.svg";
import CommentIcon from "../../../../../public/post-card/comment.svg";
import ShareIcon from "../../../../../public/post-card/share.svg";
import BookmarkIcon from "../../../../../public/post-card/bookmark.svg";
import BookmarkFilledIcon from "../../../../../public/post-card/bookmark-filled.svg";
import React, {useState} from "react";
import clsx from "clsx";
import withOverlay from "@/app/hocs/withOverlay";
import CommentWindow from "@/app/ui/home/posts/comments/comment-window";

const CommentWindowWithOverlay = withOverlay(CommentWindow);

export default function PostButtons({likes, postId}: {
    likes: number,
    postId: string
}) {
    const [liked, setLiked] = useState<boolean>(false);
    const [openedComments, setOpenedComments] = useState<boolean>(false);
    const [saved, setSaved] = useState<boolean>(false);

    const handleLike = () => {

        setLiked(prevState => !prevState);
    }

    const handleComment = () => {
        setOpenedComments(prevState => !prevState);
    }

    const handleShare = () => {

    }

    const handleBookmark = () => {
        setSaved(prevState => !prevState);
    }

    const LikeStatus = liked ? LikeFilledIcon : LikeIcon;
    const SaveStatus = saved ? BookmarkFilledIcon : BookmarkIcon;

    return (
        <>
            <main>
                <div className={styles.BtnContainer}>
                    <div>
                        <button onClick={handleLike}>
                            <LikeStatus className={clsx(
                                styles.like,
                                liked && styles.liked
                            )}/>
                        </button>
                        <button onClick={handleComment}>
                            <CommentIcon/>
                        </button>
                        <button onClick={handleShare}>
                            <ShareIcon/>
                        </button>
                    </div>

                    <div>
                        <button onClick={handleBookmark}>
                            <SaveStatus/>
                        </button>
                    </div>
                </div>

                <div>
                    <b>{liked ? likes + 1 : likes} likes</b>
                </div>
            </main>

            {openedComments && (
                <CommentWindowWithOverlay
                    postId={postId}
                    onClose={handleComment}
                />
            )}
        </>
    );
}