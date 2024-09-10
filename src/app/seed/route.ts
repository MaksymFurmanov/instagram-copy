import {db} from "@vercel/postgres";
import bcrypt from "bcrypt";
import {
    followers,
    postCommentReplies,
    postComments,
    posts,
    postsContent,
    stories,
    users
} from "@/app/lib/data-placeholders";
import {Post, PostCommentReplies, Story, User} from "@/app/lib/definitions";

const client = await db.connect();

async function seedUsers() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
        CREATE TABLE IF NOT EXISTS users
        (
            id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            nickname        VARCHAR(255) NOT NULL,
            date_of_birth   VARCHAR(10)  NOT NULL,
            email           TEXT         NOT NULL,
            profile_pic_url TEXT         NOT NULL
        );
    `;

    return await Promise.all(
        users.map(async (user: User) => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            return client.sql`
                INSERT INTO users (nickname,
                                   date_of_birth,
                                   email,
                                   password,
                                   profile_pic_url)
                VALUES (${user.nickname},
                        ${user.date_of_birth},
                        ${user.email},
                        ${hashedPassword},
                        ${user.profile_pic_url})
                ON CONFLICT (id) DO NOTHING;
            `;
        })
    );
}

/*async function seedFollower() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
        CREATE TABLE IF NOT EXISTS followers
        (
            user_id  UUID NOT NULL,
            nickname UUID NOT NULL
        )
    `;

    return await Promise.all(
        followers.map(async (follower: Follower) => {
            client.sql`
                INSERT INTO followers (user_id, nickname)
                VALUES (${follower.user_id}, ${follower.follower_id})
                ON CONFLICT (user_id) DO NOTHING;
            `;
        })
    );
}*/

/*
async function seedStory() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
        CREATE TABLE IF NOT EXISTS stories
        (
            id           UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            user_id      UUID        NOT NULL,
            created_time VARCHAR(24) NOT NULL,
            content_url  TEXT        NOT NULL,
            content_type VARCHAR(5)  NOT NULL
        )
    `;

    return await Promise.all(
        stories.map(async (story: Story) => {
            return client.sql`
                INSERT INTO stories (user_id,
                                     created_time,
                                     content_url,
                                     content_type)
                VALUES (${story.user_id},
                        ${story.created_time},
                        ${story.content_url},
                        ${story.content_type})
                ON CONFLICT (id) DO NOTHING;
            `;
        })
    )
}

async function seedPost() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
        CREATE TABLE IF NOT EXISTS posts
        (
            id            UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            user_id       UUID        NOT NULL,
            created_time  VARCHAR(24) NOT NULL,
            likes         NUMERIC     NOT NULL,
            comments      NUMERIC     NOT NULL,
            shares        NUMERIC     NOT NULL,
            description   VARCHAR(255),
            audio_name    VARCHAR(255),
            audion_author VARCHAR(255),
            audio_url     TEXT
        )
    `;

    return await Promise.all(
        posts.map(async (post: Post) => {
            return client.sql`
                INSERT INTO posts (user_id,
                                   created_time,
                                   likes,
                                   comments,
                                   shares,
                                   description,
                                   audio_name,
                                   audio_author,
                                   audio_url)
                VALUES (${post.user_id},
                        ${post.created_time},
                        ${post.likes},
                        ${post.comments},
                        ${post.shares},
                        ${post.description},
                        ${post.audio_name},
                        ${post.audio_author},
                        ${post.audio_url})
                ON CONFLICT (id) DO NOTHING;
            `;
        })
    );
}

async function seedPostContent() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
        CREATE TABLE IF NOT EXISTS post_content
        (
            id           UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            post_id      UUID       NOT NULL,
            content_type VARCHAR(5) NOT NULL,
            url          TEXT       NOT NULL,
            queue        NUMERIC
        )
    `;

    return await Promise.all(
        postsContent.map(async (postContent) => {
                return client.sql`
                    INSERT INTO post_content (post_id,
                                              content_type,
                                              url,
                                              queue)
                    VALUES (${postContent.post_id},
                            ${postContent.content_type},
                            ${postContent.url},
                            ${postContent.queue})
                    ON CONFLICT (id) DO NOTHING;
                `;
            }
        ))
}

async function seedPostComment() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
        CREATE TABLE IF NOT EXISTS post_comments
        (
            id           UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            post_id      UUID        NOT NULL,
            user_id      UUID        NOT NULL,
            comment      TEXT        NOT NULL,
            created_time VARCHAR(24) NOT NULL,
            likes        NUMERIC     NOT NULL,
            replies      NUMERIC     NOT NULL
        )
    `;

    return await Promise.all(
        postComments.map(async (postComment) => {
            return await client.sql`
                INSERT INTO post_comments (post_id,
                                           user_id,
                                           comment,
                                           created_time,
                                           likes,
                                           replies)
                VALUES (${postComment.post_id},
                        ${postComment.user_id},
                        ${postComment.comment},
                        ${postComment.created_time},
                        ${postComment.likes},
                        ${postComment.replies})
                ON CONFLICT (id) DO NOTHING;
            `;
        })
    );
}

async function seedPostCommentReplies() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
        CREATE TABLE IF NOT EXISTS post_comment_replies
        (
            id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            post_comment_id UUID        NOT NULL,
            user_id         UUID        NOT NULL,
            answer          TEXT        NOT NULL,
            created_time    VARCHAR(24) NOT NULL,
            likes           NUMERIC     NOT NULL
        )
    `;

    return await Promise.all(
        postCommentReplies.map(async (postCommentReply) => {
            return await client.sql`
                INSERT INTO post_comment_replies (post_comment_id,
                                                  user_id,
                                                  answer,
                                                  created_time,
                                                  likes)
                VALUES (${postCommentReply.post_comment_id},
                        ${postCommentReply.user_id},
                        ${postCommentReply.answer},
                        ${postCommentReply.created_time},
                        ${postCommentReply.likes})
                ON CONFLICT (id) DO NOTHING;
            `;
        })
    );
}*/

export async function GET() {
    try {
        await client.sql`BEGIN`;
        await seedUsers();
        await client.sql`COMMIT`;

        return Response.json({message: 'Database seeded successfully'});
    } catch (error) {
        await client.sql`ROLLBACK`;
        return Response.json({error}, {status: 500});
    }
}
