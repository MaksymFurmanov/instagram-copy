'use client';

import styles from "./post.module.css";
import {PostComment} from "@/app/lib/definitions";
import {FormEvent, useState} from "react";
import SmileIcon from "../../../../../public/smile.svg";
import LikeIcon from "../../../../../public/like.svg";
import LikeFilledIcon from "../../../../../public/like-filled.svg";
import useScalingTextarea from "@/app/utils/hooks/useScalingTextarea";

export default function CommentsShort({commentCount, commentExamples}: {
    commentCount: number,
    commentExamples?: PostComment[]
}) {
    const [comment, setComment] = useState<string>("");
    const [liked, setLiked] = useState<boolean>(false);
    const textareaRef = useScalingTextarea(4, [comment]);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();


    }

    const LikeStatus = liked ? LikeFilledIcon : LikeIcon;

    return (
        <main>
            {commentExamples &&
                commentExamples.map((comment, index) => (
                    <div key={index}>
                        <LikeStatus
                            className={styles.commentLike}
                            key={`like-icon-${index}`}
                        />
                    </div>
                ))
            }

            {commentCount > 0 &&
                <a className={styles.commentsLink}>
                    <p>{commentCount === 1
                        ? "View 1 comment"
                        : `View all ${commentCount} comments`
                    }</p>
                </a>
            }

            <form className={styles.addComment}
                  onSubmit={onSubmit}
            >
                <textarea ref={textareaRef}
                          value={comment}
                          onChange={e =>
                              setComment(e.target.value)}
                          placeholder={"Add comment..."}
                          rows={1}
                />
                <div>
                    <button disabled={!comment}>
                        Post
                    </button>
                    <SmileIcon/>
                </div>
            </form>
        </main>
    );
}