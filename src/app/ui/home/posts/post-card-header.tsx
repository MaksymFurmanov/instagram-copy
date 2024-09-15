import styles from "@/app/ui/home/posts/post.module.css";
import DotsMenu from "../../../../../public/dots-menu.svg";
import getTimePassed from "@/app/utils/getTimePassed";
import {Post, User} from "@/app/lib/definitions";
import ProfilePic from "@/app/ui/profile-pic";

const Separator = () => <div className={styles.headerSeparator}/>;

export default function PostCardHeader({post, author, isFollowing}: {
    post: Post,
    author: User,
    isFollowing: boolean
}) {
    const timePassed = getTimePassed(post.created_time);

    return (
        <header className={styles.PostCardHeader}>
            <ProfilePic profilePicUrl={author.profile_pic_url}/>
            <div className={styles.headerDetails}>
                <div>
                    <p>{author.nickname}</p>
                    <Separator/>
                    <p className={styles.timePassed}>
                        {timePassed}
                    </p>
                    {!isFollowing &&
                        <>
                            <Separator/>
                            <button className={styles.followingBtn}>
                                Follow
                            </button>
                        </>
                    }
                </div>
                <div>
                    {(post?.audio_author) &&
                        <>
                            <span>{post.audio_author}</span>
                            <Separator/>
                        </>
                    }
                    {post?.audio_name &&
                        <span>{post.audio_name}</span>
                    }
                </div>
            </div>
            <DotsMenu className={styles.dotsMenu}/>
        </header>
    );
}