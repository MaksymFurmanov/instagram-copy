'use client';

import styles from "./post.module.css";
import {PostComment} from "@/app/lib/definitions";
import {useEffect, useRef, useState} from "react";
import SmileIcon from "../../../../../public/post-card/smile.svg";
import LikeIcon from "../../../../../public/post-card/like.svg";
import LikeFilledIcon from "../../../../../public/post-card/like-filled.svg";

export default function CommentSection({commentCount, commentExamples}: {
    commentCount: number,
    commentExamples?: PostComment[]
}) {
    const [comment, setComment] = useState<string>("");
    //const [liked, setLiked] = useState<boolean>(false);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${Math.min(textarea.scrollHeight, 5 * 16)}px`;
        }
    }, [comment]);

    //const LikeStatus = liked ? LikeFilledIcon : LikeIcon;
    return (
        <main>
{/*            {commentExamples && commentExamples.map((comment, index) => (
                <div key={index}>
                    <LikeStatus
                        className={styles.commentLike}
                        key={`like-icon-${index}`}
                    />
                </div>
            ))}*/}
            {commentCount > 0 &&
                <a className={styles.commentsLink}>
                    <p>{commentCount === 1
                        ? "View 1 comment"
                        : `View all ${commentCount} comments`
                    }</p>
                </a>
            }
            <div className={styles.addComment}>
                <textarea ref={textareaRef}
                          value={comment}
                          onChange={e =>
                              setComment(e.target.value)}
                          placeholder={"Add comment..."}
                          rows={1}
                />
                <div>
                    {comment !== "" && <button>Post</button>}
                    <SmileIcon/>
                </div>
            </div>
        </main>
    );
}