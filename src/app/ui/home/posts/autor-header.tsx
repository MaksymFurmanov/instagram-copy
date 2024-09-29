import styles from "@/app/ui/home/posts/post.module.css";
import Dot from "../../../../../public/dot.svg";
import DotsMenu from "../../../../../public/dots-menu.svg";
import getTimePassed from "@/app/utils/getTimePassed";
import {Post, User} from "@/app/lib/definitions";
import ProfilePic from "@/app/ui/profile-pic";

export default function AutorHeader({
                                           post,
                                           author,
                                           isFollowing,
                                           showTimePassed = false
                                       }: {
    post: Post,
    author: User,
    isFollowing: boolean,
    showTimePassed?: boolean
}) {

    const Separator = () => <Dot className={styles.headerSeparator}
                                 style={{
                                     fill:
                                         showTimePassed ? "gray" : "black"
                                 }}
    />;

    return (
        <header className={styles.PostCardHeader}>
            <ProfilePic profilePicUrl={author.profile_pic_url}/>

            <div className={styles.headerDetails}>
                <div>
                    <p>{author.nickname}</p>

                    {showTimePassed && <>
                        <Separator/>
                        <p className={styles.timePassed}>
                            {getTimePassed(post.created_time)}
                        </p>
                    </>}

                    {!isFollowing && <>
                        <Separator/>
                        <button className={styles.followingBtn}>
                            Follow
                        </button>
                    </>}
                </div>

                <div>
                    {(post?.audio_author) && <>
                        <span>{post.audio_author}</span>
                        <Separator/>
                    </>}

                    {post?.audio_name &&
                        <span>{post.audio_name}</span>
                    }
                </div>
            </div>

            <DotsMenu className={styles.dotsMenu}/>
        </header>
    );
}