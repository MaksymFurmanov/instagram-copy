import useSWR from "swr";
import Comment from "./comment";
import {ReplyWithAuthor} from "@/app/ui/home/posts/comment";
import {Dispatch, SetStateAction} from "react";

const fetcher = (url: any) =>
    fetch(url).then((res) => res.json());

export default function PostCommentReplies({comment_id, setLoading}: {
    comment_id: string,
    setLoading: Dispatch<SetStateAction<boolean>>
}) {
    const {data, error, isLoading} = useSWR<ReplyWithAuthor[] | null>(
        `/api/comment-replies/${comment_id}`,
        fetcher
    );

    if (error) {
        console.error(error);
        return null;
    }

    if (!isLoading) {
        setLoading(false);
    }

    return data
        ? data.map((reply, index) =>
            <Comment key={index}
                     comment={reply}
                     profilePicUrl={
                         reply.author.profile_pic_url
                     }
                     nickname={
                         reply.author.nickname
                     }
            />
        )
        : <></>;
}