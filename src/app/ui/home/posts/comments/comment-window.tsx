import styles from "./post.comments.module.css";
import {PostComment, PostContent} from "@/app/lib/definitions";
import {getComments, getContent, getUser} from "@/app/lib/data";
import CloseIcon from "../../../../../../public/close.svg";
import {MouseEventHandler} from "react";
import Comment from "./comment";

export default async function CommentWindow({
                                                postId,
                                                onClose
                                            }: {
    postId: string,
    onClose: MouseEventHandler<HTMLButtonElement>
}) {
    const [content, comments]: [PostContent[], PostComment[]] =
        await Promise.all([
            getContent(postId),
            getComments(postId)
        ]);

    return (
        <>
            <main className={styles.CommentWindow}>
                <div className={styles.postContent}>

                </div>

                <div className={styles.commentsArea}>
                    {comments.map(async comment => {
                        const user = await getUser(comment.user_id);
                        if (user === undefined) throw new Error("No user");
                        return (
                            <Comment comment={comment}
                                     profilePicUrl={user.profile_pic_url}
                                     nickname={user.nickname}
                            />
                        )
                    })}
                </div>
            </main>

            <button onClick={onClose}>
                <CloseIcon/>
            </button>
        </>
    );
}