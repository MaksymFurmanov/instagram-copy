import {followers, posts, postsContent, stories, users} from "@/app/lib/data-placeholders";
import {Post, PostContent, Story, User} from "@/app/lib/definitions";
import {HomeVariant} from "@/app/page";

export async function getUser(user_id: string) {
    return users.find(user => user.id === user_id);
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

export async function fetchPosts(variant: HomeVariant):
    Promise<Post[]> {
    if (variant !== 'following') {
        return posts.sort((a, b) => {
            if (a.created_time === b.created_time) return 0;
            return a.created_time < b.created_time ? 1 : -1;
        });
    }
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