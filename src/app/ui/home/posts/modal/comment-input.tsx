'use client';

import styles from "./post.modal.module.css";
import Smile from "../../../../../../public/smile.svg";
import {useState} from "react";
import useScalingTextarea from "@/app/utils/useScalingTextarea";

export default function CommentInput({}: {}) {
    const [comment, setComment] = useState<string>("");
    const textareaRef = useScalingTextarea(4, [comment]);

    return (
        <main className={styles.CommentInput}>
            <Smile className={styles.smile}/>

            <textarea ref={textareaRef}
                      value={comment}
                      onChange={e =>
                          setComment(e.target.value)}
                      placeholder={"Add a comment"}
                      rows={1}
            />

            <button disabled={!comment}>
                <p>Post</p>
            </button>
        </main>
    );
}