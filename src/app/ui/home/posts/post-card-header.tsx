import Image from "next/image";
import styles from "@/app/ui/home/posts/post.module.css";
import DotsMenu from "../../../../../public/post-card/dots-menu.svg";
import getTimePassed from "@/app/utils/getTimePassed";
import {Post, User} from "@/app/lib/definitions";

const Separator = () => <div className={styles.headerSeparator}/>;

export default function PostCardHeader({post, author, isFollowing}: {
    post: Post,
    author: User,
    isFollowing: boolean
}) {
    const timePassed = getTimePassed(new Date(post.created_time));

    return (
        <header className={styles.PostCardHeader}>
            <Image src={author.profile_pic_url}
                   alt={author.nickname}
                   width={20}
                   height={20}
            />
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