import {getCommentReplies, getUser} from "@/app/lib/data";
import {ReplyWithAuthor} from "@/app/ui/home/posts/comment";
import {PostCommentReply} from "@/app/lib/definitions";

export async function GET(request: Request, context: any) {
    const {params} = context;
    const replies: PostCommentReply[] = await getCommentReplies(params.comment_id);
    const repliesWithAuthor: ReplyWithAuthor[] = await Promise.all(
        replies.map(async (reply) => {
            const author = await getUser(reply.user_id);
            return {...reply, author} as ReplyWithAuthor;
        })
    );

    return Response.json(repliesWithAuthor);
}