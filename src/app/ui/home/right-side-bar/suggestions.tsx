import styles from "@/app/ui/home/right-side-bar/right-side-bar.module.css";
import Image from "next/image";
import Footer from "@/app/ui/footer";
import React from "react";
import {MutualFriend} from "@/app/lib/definitions";

export default function Suggestions({suggestions}: {
    suggestions: MutualFriend[]
}) {
    console.log(suggestions)

    return (
        <main className={styles.Suggestions}>
            <header>
                <b>Suggested for you</b>
                <button className={styles.actionBtn}>
                    See all
                </button>
            </header>

            <div>
                {suggestions.map(suggestion => {
                    return (
                        <div className={styles.suggestion}>
                            <div className={styles.suggestionContainer}>
                                <Image src={suggestion.profile_pic_url}
                                       alt={`Profile picture ${suggestion.nickname}`}
                                       width={50}
                                       height={50}
                                />

                                <div>
                                    <b>{suggestion.nickname}</b>
                                    <p>Followed by {suggestion.users.map(user => user)}</p>
                                </div>
                            </div>

                            <button className={styles.actionBtn}>
                                Follow
                            </button>
                        </div>
                    );
                })}
            </div>
            <Footer/>
        </main>
    );
}