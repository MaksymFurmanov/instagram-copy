'use client';

import Image from "next/image";
import {PostContent, User} from "@/app/lib/definitions";
import styles from "./post.module.css";
import ContentGallery from "@/app/ui/home/posts/content-gallery";

export default function PostCard({
                                     content,
                                     author
                                 }: {
                                     content: PostContent[],
                                     author: User
                                 }
) {


    return (
        <main className={styles.PostCard}>
            <header>
                <Image src={author.profile_pic_url}
                       alt={author.nickname}
                       width={20}
                       height={20}
                />
                <div>
                    <p>{author.nickname}</p>
                </div>
            </header>

            <ContentGallery content={content}/>
        </main>
    );
}