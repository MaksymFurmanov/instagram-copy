'use client';

import styles from "./post.modal.module.css";
import Smile from "../../../../../../public/smile.svg";
import {postComment} from "@/app/lib/data";
import {useState} from "react";
import {useActionState} from "react";
import useScalingTextarea from "@/app/utils/hooks/useScalingTextarea";

export default function CommentForm({postId}: { postId: string }) {
    const [comment, setComment] = useState<string>("");

    const textareaRef = useScalingTextarea(4, [comment]);

    const [data, formAction, isPending] = useActionState(postComment, undefined);

    return (
        <form className={styles.CommentInput}
              action={formAction}
        >
            <Smile className={styles.smile}/>

            <textarea ref={textareaRef}
                      value={comment}
                      name={"comment"}
                      onChange={e =>
                          setComment(e.target.value)}
                      placeholder={"Add a comment"}
                      rows={1}
            />

            <button disabled={!comment || isPending} type={"submit"}>
                <p>Post</p>
            </button>
        </form>
    );
}