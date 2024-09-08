export type User = {
    id: string,
    nickname: string,
    date_of_birth: string,
    email: string,
    profile_pic_url: string,
}

export type Follower = {
    user_id: string,
    follower_id: string
}

export type Story = {
    id: string,
    user_id: string,
    created_time: string,
    content_url: string,
    content_type: 'image' | 'video'
}

export type Post = {
    id: string,
    user_id: string,
    created_time: string,
    likes: number,
    comments: number,
    shares: number,
    description?: string,
    audio_name?: string,
    audio_author?: string,
    audio_url?: string,
}

export type PostContent = {
    id: string,
    post_id: string,
    content_type: 'image' | 'video',
    url: string,
    queue?: number
}

export type PostComment = {
    id: string,
    post_id: string,
    user_id: string,
    comment: string
    created_time: string,
    likes: number,
    replies: number
}

export type PostCommentReplies = {
    id: string,
    post_comment_id: string,
    user_id: string,
    answer: string
    created_time: string,
    likes: number
}