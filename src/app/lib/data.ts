import {
    Follower,
    Post,
    PostComment,
    PostCommentReply,
    PostContent, StoriesGrouped,
    Story,
    User
} from "@/app/lib/definitions";
import {sql} from "@vercel/postgres";
import {unstable_noStore} from 'next/cache';
import z from 'zod';

unstable_noStore();

export async function getUser(userId: string):
    Promise<User> {
    const data = await sql<User>`
        SELECT *
        FROM users
        WHERE id = ${userId};
    `;

    return data.rows[0];
}

export async function checkFollowing(userId: string, checkId: string):
    Promise<boolean> {
    const data = await sql<Follower>`
        SELECT *
        FROM followers
        WHERE (user_id, follower_id) = (${userId}, ${checkId});
    `;

    return !!data.rows[0];
}

export async function getPost(postId: string):
    Promise<Post> {
    const data = await sql<Post>`
        SELECT *
        FROM posts
        WHERE id = ${postId};
    `;

    return data.rows[0];
}

export async function getContent(postId: string):
    Promise<PostContent[]> {
    const data = await sql<PostContent>`
        SELECT *
        FROM posts_content
        WHERE post_id = ${postId}
        ORDER BY queue;
    `;

    return data.rows;
}

export async function getComments(postId: string):
    Promise<PostComment[]> {
    const data = await sql<PostComment>`
        SELECT *
        FROM posts_comments
        WHERE post_id = ${postId}
        ORDER BY created_time;
    `;

    return data.rows;
}

const CommentFormSchema = z.object({
    comment: z.string()
});

export async function postComment(prevState: unknown,
                                  formData: FormData) {
    const userId = formData.get("user_id") as string;
    const postId = formData.get("post_id") as string;
    const createdTime = new Date().toISOString().slice(0, 19);
    const comment = formData.get("comment") as string;

    if(!userId) throw new Error("Error uploading the comment. No user provided");
    if(!postId) throw new Error("Error uploading the comment. No post provided");
    if(!comment) throw new Error("Error uploading the comment. No comment provided");

    return await sql`
        INSERT INTO posts_comments (user_id,
                                    post_id,
                                    created_time,
                                    comment)
        VALUES (${userId},
                ${postId},
                ${createdTime},
                ${comment})
    `;
}

export async function getCommentReplies(commentId: string):
    Promise<PostCommentReply[]> {
    const data = await sql<PostCommentReply>`
        SELECT *
        FROM posts_comments_replies
        WHERE comment_id = ${commentId}
        ORDER BY created_time;
    `;

    return data.rows;
}

export async function postCommentReply() {

}

export async function fetchFYPPosts():
    Promise<Post[]> {
    const data = await sql<Post>`
        SELECT *
        FROM posts
        ORDER BY created_time;
    `;
    return data.rows;
}

export async function fetchFollowingPosts(userId: string):
    Promise<Post[]> {
    const data = await sql<Post>`
        SELECT *
        FROM posts
        WHERE user_id ===
              (SELECT follower_id
               FROM followers
               WHERE user_id === ${userId}).follower_id
        ORDER BY created_time;
    `;

    return data.rows;
}

export async function fetchFriendsSuggestions(user_id: string):
    Promise<User[]> {
    const data = await sql<User>`
        SELECT *
        FROM users
        WHERE id IN (SELECT f1.follower_id
                     FROM followers f1
                              INNER JOIN (SELECT follower_id
                                          FROM followers
                                          WHERE user_id = ${user_id}) f2
                                         ON f1.user_id = f2.follower_id)
          AND id != ${user_id};
    `;

    return data.rows;
}

export async function fetchMutualFollowersNames(userId1: string, userId2: string):
    Promise<string[]> {
    const data = await sql<{ nickname: string }>`
        SELECT u.nickname
        FROM users u
                 JOIN followers f1 ON u.id = f1.follower_id
                 JOIN followers f2 ON u.id = f2.follower_id
        WHERE f1.user_id = ${userId1}
          AND f2.user_id = ${userId2}
    `;

    return data.rows.map((obj) => obj.nickname);
}

export async function fetchStoriesGrouped(userId: string):
    Promise<StoriesGrouped[]> {
    const userFollowers = await sql<{
        user_id: string,
        profile_pic_url: string
    }>`
        SELECT F.follower_id as user_id,
               U.profile_pic_url
        FROM followers as F,
             users as U
        WHERE F.user_id = ${userId}
          AND U.id = F.follower_id;
    `;

    return await Promise.all(
        userFollowers.rows.map(async follower => {
            const stories = await sql<Story>`
                SELECT *
                FROM stories
                WHERE user_id = ${follower.user_id};
            `;

            return {
                user_id: follower.user_id,
                profile_pic_url: follower.profile_pic_url,
                stories: stories.rows
            }
        })
    );
}