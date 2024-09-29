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
import {usePathname, useRouter} from "next/navigation";
import getTimePassed from "@/app/utils/getTimePassed";

export default function PostButtons({id, likes, time = null}: {
    id: string,
    likes: number,
    time?: string | null
}) {
    const pathname = usePathname();
    const {push} = useRouter();
    const [liked, setLiked] = useState<boolean>(false);
    const [saved, setSaved] = useState<boolean>(false);

    const params = new URLSearchParams();
    params.set("id", id);

    const handleLike = () => {

        setLiked(prevState => !prevState);
    }

    const openModalHandler = () => {
        push(`${pathname}?${params.toString()}`, {
            scroll: false
        });
    }

    const handleShare = () => {

    }

    const handleBookmark = () => {
        setSaved(prevState => !prevState);
    }

    const LikeStatus = liked ? LikeFilledIcon : LikeIcon;
    const SaveStatus = saved ? BookmarkFilledIcon : BookmarkIcon;
    const timePassed = time ? getTimePassed(time, true) : null;

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
                    <button onClick={openModalHandler}>
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
                <b>
                    {liked ? parseInt(likes.toString()) + 1 : likes} likes
                </b>
                {timePassed &&
                    <p className={styles.timePassed}>
                        {timePassed} ago
                    </p>
                }
            </div>
        </main>
    );
}