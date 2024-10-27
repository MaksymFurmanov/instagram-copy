import styles from "@/app/ui/home/right-side-bar/right-side-bar.module.css";
import Image from "next/image";
import {user} from "@/app/lib/data-placeholders";
import React from "react";

export default function UserProfile() {
    return (
        <main className={styles.UserProfile}>
            <div className={styles.userContainer}>
                <Image src={user.profile_pic_url}
                       alt={"Profile picture"}
                       width={50}
                       height={50}
                />
                <b>{user.nickname}</b>
            </div>

            <button className={styles.actionBtn}>
                Switch
            </button>
        </main>
    );
}