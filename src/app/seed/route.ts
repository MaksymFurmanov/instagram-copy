import {db} from "@vercel/postgres";
import bcrypt from "bcrypt";
import {
    followers,
    posts,
    postsComments,
    postsCommentsReplies,
    postsContent,
    stories,
    users
} from "@/app/lib/data-placeholders";
import {Follower, Post, PostCommentReply, PostContent, Story, User} from "@/app/lib/definitions";

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
            profile_pic_url TEXT         NOT NULL,
            password        TEXT         NOT NULL
        );
    `;

    return await Promise.all(
        users.map(async (user: User) => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            return client.sql`
                INSERT INTO users (id,
                                   nickname,
                                   date_of_birth,
                                   email,
                                   password,
                                   profile_pic_url)
                VALUES (${user.id},
                        ${user.nickname},
                        ${user.date_of_birth},
                        ${user.email},
                        ${hashedPassword},
                        ${user.profile_pic_url})
                ON CONFLICT (id) DO NOTHING;
            `;
        })
    );
}

async function seedFollowers() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
        CREATE TABLE IF NOT EXISTS followers
        (
            user_id     UUID NOT NULL,
            follower_id UUID NOT NULL,
            CONSTRAINT fk_user_follower UNIQUE (user_id, follower_id)
        )
    `;

    return await Promise.all(
        followers.map(async (follower: Follower) => {
            client.sql`
                INSERT INTO followers (user_id, follower_id)
                VALUES (${follower.user_id}, ${follower.follower_id})
                ON CONFLICT (user_id, follower_id) DO NOTHING;
            `;
        })
    );
}

async function seedStories() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
        CREATE TABLE IF NOT EXISTS stories
        (
            id           UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            user_id      UUID        NOT NULL,
            created_time VARCHAR(24) NOT NULL,
            content_url  TEXT        NOT NULL,
            content_type VARCHAR(5)  NOT NULL,
            CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
        )
    `;

    return await Promise.all(
        stories.map(async (story: Story) => {
            console.log(story);
            return client.sql`
                INSERT INTO stories (id,
                                     user_id,
                                     created_time,
                                     content_url,
                                     content_type)
                VALUES (${story.id},
                        ${story.user_id},
                        ${story.created_time},
                        ${story.content_url},
                        ${story.content_type})
                ON CONFLICT (id) DO NOTHING;
            `;
        })
    )
}

async function seedPosts() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
        CREATE TABLE IF NOT EXISTS posts
        (
            id            UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            user_id       UUID        NOT NULL,
            created_time  VARCHAR(24) NOT NULL,
            likes         NUMERIC     DEFAULT 0 NOT NULL,
            comments      NUMERIC     DEFAULT 0 NOT NULL,
            shares        NUMERIC     DEFAULT 0 NOT NULL,
            description   VARCHAR(255),
            audio_name    VARCHAR(255),
            audion_author VARCHAR(255),
            audio_url     TEXT,
            CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
        )
    `;

    return await Promise.all(
        posts.map(async (post: Post) => {
            const columns = [
                'id',
                'user_id',
                'created_time',
                'likes',
                'comments',
                'shares',
                post.description !== undefined ? 'description' : null,
                post.audio_name !== undefined ? 'audio_name' : null,
                post.audio_author !== undefined ? 'audio_author' : null,
                post.audio_url !== undefined ? 'audio_url' : null,
            ].filter(Boolean);

            const values = [
                post.id,
                post.user_id,
                post.created_time,
                post.likes,
                post.comments,
                post.shares,
                post.description,
                post.audio_name,
                post.audio_author,
                post.audio_url,
            ].filter(value => value !== undefined);

            const columnList = columns.join(', ');
            const valuePlaceholders = values
                .map((_, index) => `$${index + 1}`)
                .join(', ');

            const query = `
                INSERT INTO posts (${columnList})
                VALUES (${valuePlaceholders})
                ON CONFLICT (id) DO NOTHING;
            `;

            return client.query(query, values);
        })
    );
}

async function seedPostsContent() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
        CREATE TABLE IF NOT EXISTS posts_content
        (
            id           UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            post_id      UUID       NOT NULL,
            content_type VARCHAR(5) NOT NULL,
            url          TEXT       NOT NULL,
            queue        NUMERIC,
            CONSTRAINT fk_post FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE
        )
    `;

    return await Promise.all(
        postsContent.map(async (postContent: PostContent) => {
                const columns = [
                    'id',
                    'post_id',
                    'content_type',
                    'url',
                    postContent.queue !== undefined ? 'queue' : null
                ].filter(Boolean);

                const values = [
                    postContent.id,
                    postContent.post_id,
                    postContent.content_type,
                    postContent.url,
                    postContent.queue
                ].filter(value => value !== undefined);

                const columnList = columns.join(', ');
                const valuePlaceholders = values
                    .map((_, index) => `$${index + 1}`)
                    .join(', ');

                const query = `
                    INSERT INTO posts_content (${columnList})
                    VALUES (${valuePlaceholders})
                    ON CONFLICT (id) DO NOTHING;
                `;

                return client.query(query, values);
            }
        )
    );
}

async function seedPostsComments() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
        CREATE TABLE IF NOT EXISTS posts_comments
        (
            id           UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            post_id      UUID        NOT NULL,
            user_id      UUID        NOT NULL,
            comment      TEXT        NOT NULL,
            created_time VARCHAR(24) NOT NULL,
            likes        NUMERIC     DEFAULT 0 NOT NULL,
            replies      NUMERIC     DEFAULT 0 NOT NULL,
            CONSTRAINT fk_post FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE,
            CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
        )
    `;

    return await Promise.all(
        postsComments.map(async (postComment) => {
            return await client.sql`
                INSERT INTO posts_comments (id,
                                           post_id,
                                           user_id,
                                           comment,
                                           created_time,
                                           likes,
                                           replies)
                VALUES (${postComment.id},
                        ${postComment.post_id},
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

async function seedPostsCommentsReplies() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
        CREATE TABLE IF NOT EXISTS posts_comments_replies
        (
            id           UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            comment_id   UUID        NOT NULL,
            user_id      UUID        NOT NULL,
            created_time VARCHAR(24) NOT NULL,
            likes        NUMERIC     NOT NULL,
            comment      TEXT        NOT NULL,
            CONSTRAINT fk_comment FOREIGN KEY (comment_id) REFERENCES posts_comments (id) ON DELETE CASCADE,
            CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
        )
    `;

    return await Promise.all(
        postsCommentsReplies.map(async (postCommentReply: PostCommentReply) => {
            return await client.sql`
                INSERT INTO posts_comments_replies (comment_id,
                                                    user_id,
                                                    created_time,
                                                    likes,
                                                    comment)
                VALUES (${postCommentReply.comment_id},
                        ${postCommentReply.user_id},
                        ${postCommentReply.created_time},
                        ${postCommentReply.likes},
                        ${postCommentReply.comment})
                ON CONFLICT (id) DO NOTHING;
            `;
        })
    );
}

export async function GET() {
    try {
        await client.sql`BEGIN`;
/*        await seedUsers();
        await seedFollowers();
        await seedStories();
        await seedPosts();
        await seedPostsContent();
        await seedPostsComments();*/
        await seedPostsCommentsReplies();
        await client.sql`COMMIT`;

        return Response.json({message: 'Database seeded successfully'});
    } catch (error) {
        await client.sql`ROLLBACK`;

        return Response.json({error}, {status: 500});
    }
}