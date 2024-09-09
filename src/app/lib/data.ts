import {followers, posts, postsContent, stories, users} from "@/app/lib/data-placeholders";
import {Post, PostContent, Story, User} from "@/app/lib/definitions";

export async function getUser(user_id: string):
    Promise<User | undefined> {
    return users.find(user => user.id === user_id);
}

export async function checkFollowing(user_id: string, check_id: string):
    Promise<boolean> {
    return !!followers
        .filter(user => user.user_id === user_id)
        .find(user => user.follower_id === check_id);
}

export async function getContent(post_id: string):
    Promise<PostContent[]> {
    return postsContent
        .filter(content => content.post_id === post_id)
        .sort((a, b) => {
            const queueA = a.queue ?? 0;
            const queueB = b.queue ?? 0;
            if (queueA === queueB) return 0;
            return queueA < queueB ? -1 : 1;
        });
}

export async function fetchFYPPosts():
    Promise<Post[]> {
    return posts.sort((a, b) => {
        if (a.created_time === b.created_time) return 0;
        return a.created_time < b.created_time ? -1 : 1;
    });
}

export async function fetchFollowingPosts(user_id: string):
    Promise<Post[]> {
    const filteredPosts = await Promise.all(
        posts.map(async post => {
            const isFollowing = await checkFollowing(user_id, post.user_id);
            return isFollowing ? post : null;
        })
    );

    return filteredPosts
        .filter((post): post is Post => post !== null)
        .sort((a, b) => {
            if (a.created_time === b.created_time) return 0;
            return a.created_time < b.created_time ? -1 : 1;
        });
}

export type StoriesGrouped = {
    user_id: string,
    profile_pic_url: any,
    stories: Story[]
}

export async function fetchStoriesGrouped(userId: string):
    Promise<StoriesGrouped[]> {
    const userFollowerIds = new Set(
        followers
            .filter(follower => follower.user_id === userId)
            .map(follower => follower.follower_id)
    );

    const storiesByUserId = new Map<string, Story[]>();

    stories.forEach(story => {
        if (!userFollowerIds.has(story.user_id)) return;
        if (!storiesByUserId.has(story.user_id)) {
            storiesByUserId.set(story.user_id, []);
        }
        storiesByUserId.get(story.user_id)!.push(story);
    });

    const userFollowers: User[] = Array
        .from(userFollowerIds)
        .map(followerId => users.find(user => user.id === followerId))
        .filter(user => user !== undefined);

    return userFollowers.map(follower => {
        const storiesSorted = (storiesByUserId.get(follower.id) || [])
            .sort((a, b) => {
                const dateA = new Date(a.created_time);
                const dateB = new Date(b.created_time);
                if (dateA === dateB) return 0;
                return dateA > dateB ? -1 : 1;
            });

        return {
            user_id: follower.id,
            profile_pic_url: follower.profile_pic_url,
            stories: storiesSorted
        }
    });
}