'use client';

import styles from "./post.module.css";
import LikeIcon from "../../../../../public/post-card/like.svg";
import LikeFilledIcon from "../../../../../public/post-card/like-filled.svg";
import CommentIcon from "../../../../../public/post-card/comment.svg";
import ShareIcon from "../../../../../public/post-card/share.svg";
import BookmarkIcon from "../../../../../public/post-card/bookmark.svg";
import BookmarkFilledIcon from "../../../../../public/post-card/bookmark-filled.svg";
import {useState} from "react";
import clsx from "clsx";

export default function PostButtons({
                                        likes
                                    }: {
    likes: number,

}) {
    const [liked, setLiked] = useState<boolean>(false);
    const [saved, setSaved] = useState<boolean>(false);

    const handleLike = () => {

        setLiked(prevState => !prevState);
    }

    const handleComment = () => {

    }

    const handleShare = () => {

    }

    const handleBookmark = () => {
        setSaved(prevState => !prevState);
    }

    const LikeStatus = liked ? LikeFilledIcon : LikeIcon;
    const SaveStatus = saved ? BookmarkFilledIcon : BookmarkIcon;

    return (
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
    );
}