export interface User {
    id: string,
    nickname: string,
    date_of_birth: string,
    email: string,
    password: string,
    profile_pic_url: string,
}

export interface Follower {
    user_id: string,
    follower_id: string
}

export interface Story {
    id: string,
    user_id: string,
    created_time: string,
    content_url: string,
    content_type: 'image' | 'video'
}

export interface Post {
    id: string,
    user_id: string,
    created_time: string,
    content_width: number,
    content_height: number,
    likes: number,
    comments: number,
    shares: number,
    description?: string,
    audio_name?: string,
    audio_author?: string,
    audio_url?: string,
}

export interface PostContent {
    id: string,
    post_id: string,
    content_type: 'image' | 'video',
    url: string,
    queue?: number
}

interface Comment {
    id: string,
    user_id: string,
    created_time: string,
    likes: number,
    comment: string,
}

export interface PostComment extends Comment {
    post_id: string,
    replies: number
}

export interface PostCommentReply extends Comment {
    comment_id: string,
}