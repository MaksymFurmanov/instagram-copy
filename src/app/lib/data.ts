import {
    Follower,
    Post,
    PostComment,
    PostCommentReply,
    PostContent,
    Story,
    User
} from "@/app/lib/definitions";
import {sql} from "@vercel/postgres";
import {unstable_noStore} from 'next/cache';

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

export type StoriesGrouped = {
    user_id: string,
    profile_pic_url: string,
    stories: Story[]
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