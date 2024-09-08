import {
    Follower,
    Post,
    PostComment,
    PostCommentReplies,
    PostContent,
    Story,
    User
} from "@/app/lib/definitions";

export const users: User[] = [
    {
        id: '0',
        nickname: 'jeremy_fox',
        date_of_birth: '12.08.1995',
        email: 'jeremy.fox@gmail.com',
        profile_pic_url: 'https://firebasestorage.googleapis.com/v0/b/instagram-copy-555fb.appspot.com/o/user%2Fjeremy_fox%2Fprofile_picture.png?alt=media&token=3972e065-c3d7-4dbd-990e-cc669f4825dd'
    },
    {
        id: '1',
        nickname: 'ally_manson',
        date_of_birth: '12.08.1995',
        email: 'ally.manson@gmail.com',
        profile_pic_url: 'https://firebasestorage.googleapis.com/v0/b/instagram-copy-555fb.appspot.com/o/user%2Fally_manson%2Fprofile_picture.jpg?alt=media&token=4df11358-6ee2-4d17-b5d1-1f47381944dc'
    },
    {
        id: '2',
        nickname: 'lilia_tracy',
        date_of_birth: '12.08.1995',
        email: 'lilia.tracy@gmail.com',
        profile_pic_url: 'https://firebasestorage.googleapis.com/v0/b/instagram-copy-555fb.appspot.com/o/user%2Flilia_tracy%2Fprofile_picture.jpg?alt=media&token=71e884a9-b596-40aa-accc-c225f5a3c4d1'
    },
    {
        id: '3',
        nickname: 'maksym_furmanov',
        date_of_birth: '17.03.2004',
        email: 'furmanov.maksym@gmail.com',
        profile_pic_url: 'https://firebasestorage.googleapis.com/v0/b/instagram-copy-555fb.appspot.com/o/user%2Fmaksym_furmanov%2Fprofile_picture.jpg?alt=media&token=a4afe074-ee4b-4545-9cf1-7d81326802ee'
    }
]

export const user = users[3];

export const followers: Follower[] = [
    {
        user_id: '3',
        follower_id: '0',
    },
    {
        user_id: '0',
        follower_id: '1',
    },
    {
        user_id: '3',
        follower_id: '2',
    }
]

export const stories: Story[] = [
    {
        id: '0',
        user_id: '0',
        created_time: new Date(2024, 8, 12, 17, 30, 21).toString(),
        content_url: '',
        content_type: 'image'
    },
    {
        id: '1',
        user_id: '0',
        created_time: new Date(2024, 8, 12, 16, 31, 15).toString(),
        content_url: '',
        content_type: 'image'
    },
    {
        id: '2',
        user_id: '1',
        created_time: new Date(2024, 8, 12, 12, 20, 9).toString(),
        content_url: '',
        content_type: 'image'
    },
    {
        id: '3',
        user_id: '2',
        created_time: new Date(2024, 8, 12, 10, 36, 7).toString(),
        content_url: '',
        content_type: 'image'
    }
]

export const posts: Post[] = [
    {
        id: '0',
        user_id: '0',
        created_time: new Date(2024, 8, 12, 15, 27, 23).toString(),
        likes: 2,
        comments: 3,
        shares: 1
    },
    {
        id: '1',
        user_id: '2',
        created_time: new Date(2024, 8, 12, 9, 15, 27).toString(),
        likes: 2,
        comments: 3,
        shares: 1,
        audioName: 'Original audio'
    },
    {
        id: '2',
        user_id: '1',
        created_time: new Date(2024, 8, 13, 5, 3, 7).toString(),
        likes: 4,
        comments: 0,
        shares: 0,
        description: 'Можем привезти для вас такие трусики, если хотите, напишите в комментарии😍'
    }
]

export const postsContent: PostContent[] = [
    {
        id: '0',
        post_id: '0',
        content_type: 'image',
        url: 'https://firebasestorage.googleapis.com/v0/b/instagram-copy-555fb.appspot.com/o/user%2Fjeremy_fox%2Fposts%2F12.8.24_15%3A27%3A23%2Fjeremy_img1.jpg?alt=media&token=ce9438d1-2a92-4ee8-9149-aff09c274635',
        queue: 0
    },
    {
        id: '1',
        post_id: '0',
        content_type: 'image',
        url: 'https://firebasestorage.googleapis.com/v0/b/instagram-copy-555fb.appspot.com/o/user%2Fjeremy_fox%2Fposts%2F12.8.24_15%3A27%3A23%2Fjeremy_img2.jpg?alt=media&token=35d45c07-35d7-4d89-83f5-cf19d131cf81',
        queue: 1
    },
    {
        id: '2',
        post_id: '0',
        content_type: 'image',
        url: 'https://firebasestorage.googleapis.com/v0/b/instagram-copy-555fb.appspot.com/o/user%2Fjeremy_fox%2Fposts%2F12.8.24_15%3A27%3A23%2Fjeremy_img3.jpg?alt=media&token=7e5d3f35-1c37-4705-bc62-2eb3583119b8',
        queue: 2
    },
    {
        id: '3',
        post_id: '1',
        content_type: 'video',
        url: 'https://firebasestorage.googleapis.com/v0/b/instagram-copy-555fb.appspot.com/o/user%2Flilia_tracy%2Fposts%2F12.8.24_09%3A15%3A27%2FCat%20-%20Made%20with%20Clipchamp.mp4?alt=media&token=e7cdfa4c-9016-439b-92f0-0ff681d3884d',
    },
    {
        id: '4',
        post_id: '2',
        content_type: 'image',
        url: 'https://firebasestorage.googleapis.com/v0/b/instagram-copy-555fb.appspot.com/o/user%2Fally_manson%2Fposts%2F13.8.24_05%3A03%3A07%2Fally_manson.jpg?alt=media&token=502ec0b5-e703-4a36-87ad-697a7924758d',
    }
]

export const postComments: PostComment[] = [

];

export const postCommentAnswers: PostCommentReplies[] = [

];