import {
    Follower,
    Post,
    PostComment,
    PostCommentReply,
    PostContent,
    Story,
    User
} from "@/app/lib/definitions";

export const users: User[] = [
    {
        id: '644f87a3-4154-49c8-a6b8-ece398af247e',
        nickname: 'jeremy_fox',
        date_of_birth: '12.08.1995',
        email: 'jeremy.fox@gmail.com',
        password: 'password123',
        profile_pic_url: 'https://firebasestorage.googleapis.com/v0/b/instagram-copy-555fb.appspot.com/o/user%2Fjeremy_fox%2Fprofile_picture.png?alt=media&token=3972e065-c3d7-4dbd-990e-cc669f4825dd'
    },
    {
        id: '82984017-d440-489b-ad02-6913c404b902',
        nickname: 'ally_manson',
        date_of_birth: '12.08.1995',
        email: 'ally.manson@gmail.com',
        password: 'allypassword',
        profile_pic_url: 'https://firebasestorage.googleapis.com/v0/b/instagram-copy-555fb.appspot.com/o/user%2Fally_manson%2Fprofile_picture.jpg?alt=media&token=4df11358-6ee2-4d17-b5d1-1f47381944dc'
    },
    {
        id: '61af641d-3496-40d8-88e0-cc54f432393d',
        nickname: 'lilia_tracy',
        date_of_birth: '12.08.1995',
        email: 'lilia.tracy@gmail.com',
        password: 'tracylilia123',
        profile_pic_url: 'https://firebasestorage.googleapis.com/v0/b/instagram-copy-555fb.appspot.com/o/user%2Flilia_tracy%2Fprofile_picture.jpg?alt=media&token=71e884a9-b596-40aa-accc-c225f5a3c4d1'
    },
    {
        id: '66747c14-c55b-4af5-b5ab-16a2edaaf95b',
        nickname: 'maksym_furmanov',
        date_of_birth: '17.03.2004',
        email: 'furmanov.maksym@gmail.com',
        password: 'maksymPassword',
        profile_pic_url: 'https://firebasestorage.googleapis.com/v0/b/instagram-copy-555fb.appspot.com/o/user%2Fmaksym_furmanov%2Fprofile_picture.jpg?alt=media&token=a4afe074-ee4b-4545-9cf1-7d81326802ee'
    }
]

export const user = users[3];

export const followers: Follower[] = [
    {
        user_id: '66747c14-c55b-4af5-b5ab-16a2edaaf95b',
        follower_id: '644f87a3-4154-49c8-a6b8-ece398af247e',
    },
    {
        user_id: '644f87a3-4154-49c8-a6b8-ece398af247e',
        follower_id: '82984017-d440-489b-ad02-6913c404b902',
    },
    {
        user_id: '66747c14-c55b-4af5-b5ab-16a2edaaf95b',
        follower_id: '61af641d-3496-40d8-88e0-cc54f432393d',
    }
]

export const stories: Story[] = [
    {
        id: 'fb0802a0-b42d-46e5-bab7-e231da89fb94',
        user_id: '644f87a3-4154-49c8-a6b8-ece398af247e',
        created_time: new Date(2024, 7, 12, 17, 30, 21).toISOString().slice(0, 19),
        content_url: '',
        content_type: 'image'
    },
    {
        id: 'fbde9e0b-2b1c-421a-b575-10797c693059',
        user_id: '644f87a3-4154-49c8-a6b8-ece398af247e',
        created_time: new Date(2024, 7, 12, 16, 31, 15).toISOString().slice(0, 19),
        content_url: '',
        content_type: 'image'
    },
    {
        id: 'f29eb80b-08a2-41e6-8436-4f9d8fb06048',
        user_id: '82984017-d440-489b-ad02-6913c404b902',
        created_time: new Date(2024, 7, 12, 12, 20, 9).toISOString().slice(0, 19),
        content_url: '',
        content_type: 'image'
    },
    {
        id: '9b6bb456-dd70-4640-9d04-e297c2c28120',
        user_id: '61af641d-3496-40d8-88e0-cc54f432393d',
        created_time: new Date(2024, 7, 12, 10, 36, 7).toISOString().slice(0, 19),
        content_url: '',
        content_type: 'image'
    }
]

export const posts: Post[] = [
    {
        id: '039a3096-98d5-4698-a065-6696bd1a288f',
        user_id: '644f87a3-4154-49c8-a6b8-ece398af247e',
        created_time: new Date(2024, 7, 12, 15, 27, 23).toISOString().slice(0, 19),
        content_width: 568,
        content_height: 710,
        likes: 2,
        comments: 3,
        shares: 1
    },
    {
        id: '79718480-9377-4e18-aea7-0a8c110bedc4',
        user_id: '61af641d-3496-40d8-88e0-cc54f432393d',
        created_time: new Date(2024, 7, 12, 9, 15, 27).toISOString().slice(0, 19),
        content_width: 1920,
        content_height: 1080,
        likes: 2,
        comments: 3,
        shares: 1,
        audio_name: 'Original audio'
    },
    {
        id: '7ae70bf4-0911-4fe0-8e6b-d178a4ebba17',
        user_id: '82984017-d440-489b-ad02-6913c404b902',
        created_time: new Date(2024, 7, 11, 5, 3, 7).toISOString().slice(0, 19),
        content_width: 800,
        content_height: 1000,
        likes: 4,
        comments: 0,
        shares: 0,
        description: 'Можем привезти для вас такие трусики, если хотите, напишите в комментарии😍'
    }
]

export const postsContent: PostContent[] = [
    {
        id: '8a3a6131-3589-49b3-8be0-65cb72db9fe2',
        post_id: '039a3096-98d5-4698-a065-6696bd1a288f',
        content_type: 'image',
        url: 'https://firebasestorage.googleapis.com/v0/b/instagram-copy-555fb.appspot.com/o/user%2Fjeremy_fox%2Fposts%2F12.8.24_15%3A27%3A23%2Fjeremy_img1.jpg?alt=media&token=736e72cd-e9f0-484c-acda-82a4a86a2218',
        queue: 0
    },
    {
        id: '98880766-838e-469a-b25c-07ede0f72e61',
        post_id: '039a3096-98d5-4698-a065-6696bd1a288f',
        content_type: 'image',
        url: 'https://firebasestorage.googleapis.com/v0/b/instagram-copy-555fb.appspot.com/o/user%2Fjeremy_fox%2Fposts%2F12.8.24_15%3A27%3A23%2Fjeremy_img2.jpg?alt=media&token=affbe932-0154-4b8e-9e56-496100bbd02d',
        queue: 1
    },
    {
        id: '4f2f3cb2-f56e-4af6-b146-07542bfd40e0',
        post_id: '039a3096-98d5-4698-a065-6696bd1a288f',
        content_type: 'image',
        url: 'https://firebasestorage.googleapis.com/v0/b/instagram-copy-555fb.appspot.com/o/user%2Fjeremy_fox%2Fposts%2F12.8.24_15%3A27%3A23%2Fjeremy_img3.jpg?alt=media&token=ab2b9d72-c896-4228-88aa-291dfd9e10ed',
        queue: 2
    },
    {
        id: '51f75eeb-3cc7-41bb-8688-c1f5e6969152',
        post_id: '79718480-9377-4e18-aea7-0a8c110bedc4',
        content_type: 'video',
        url: 'https://firebasestorage.googleapis.com/v0/b/instagram-copy-555fb.appspot.com/o/user%2Flilia_tracy%2Fposts%2F12.8.24_09%3A15%3A27%2FCat%20-%20Made%20with%20Clipchamp.mp4?alt=media&token=e7cdfa4c-9016-439b-92f0-0ff681d3884d',
    },
    {
        id: 'ee9eaaa0-ecbd-42ce-9e3b-7cf72c66ed63',
        post_id: '7ae70bf4-0911-4fe0-8e6b-d178a4ebba17',
        content_type: 'image',
        url: 'https://firebasestorage.googleapis.com/v0/b/instagram-copy-555fb.appspot.com/o/user%2Fally_manson%2Fposts%2F13.8.24_05%3A03%3A07%2Fally_manson.jpg?alt=media&token=502ec0b5-e703-4a36-87ad-697a7924758d'
    }
]

export const postsComments: PostComment[] = [
    {
        id: '96425de3-d0ad-4ed8-b60f-5b9617c486ff',
        user_id: '61af641d-3496-40d8-88e0-cc54f432393d',
        post_id: '7ae70bf4-0911-4fe0-8e6b-d178a4ebba17',
        created_time: new Date(2024, 7, 12, 19, 30, 20).toISOString().slice(0, 19),
        likes: 1,
        comment: 'Хочу',
        replies: 0
    }
];

export const postsCommentsReplies: PostCommentReply[] = [
    {
        id: 'e16c72a6-3fbc-4cbc-b3e1-57a1d0993a4f',
        comment_id: '96425de3-d0ad-4ed8-b60f-5b9617c486ff',
        user_id: '82984017-d440-489b-ad02-6913c404b902',
        created_time: new Date(2024, 7, 13, 10, 13, 15).toISOString().slice(0, 19),
        likes: 1,
        comment: 'Написала в директ'
    }
];