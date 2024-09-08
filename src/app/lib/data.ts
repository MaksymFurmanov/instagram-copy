import {followers, posts, postsContent, stories, users} from "@/app/lib/data-placeholders";
import {Post, PostContent, Story, User} from "@/app/lib/definitions";

export async function getUser(user_id: string):
    Promise<User> {
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
            if (a.queue === b.queue) return 0;
            return a.queue < b.queue ? 1 : -1;
        });
}

export async function fetchFYPPosts():
    Promise<Post[]> {
    return posts.sort((a, b) => {
        if (a.created_time === b.created_time) return 0;
        return a.created_time < b.created_time ? 1 : -1;
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
            return a.created_time < b.created_time ? 1 : -1;
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
        storiesByUserId.get(story.user_id).push(story);
    });

    const userFollowers: User[] = Array
        .from(userFollowerIds)
        .map(followerId => users.find(user => user.id === followerId));

    return userFollowers.map(follower => {
        const storiesSorted = (storiesByUserId.get(follower.id) || [])
            .sort((a, b) => {
                const a_ = new Date(a.created_time);
                const b_ = new Date(b.created_time);
                if (a_ === b_) return 0;
                return a_ > b_ ? 1 : -1;
            });

        return {
            user_id: follower.id,
            profile_pic_url: follower.profile_pic_url,
            stories: storiesSorted
        }
    });
}