import styles from "./right-side-bar.module.css";
import React from "react";
import UserProfile from "@/app/ui/home/right-side-bar/user-profile";
import Suggestions from "@/app/ui/home/right-side-bar/suggestions";
import {fetchFriendsSuggestions, fetchMutualFollowersNames} from "@/app/lib/data";
import {user} from "@/app/lib/data-placeholders";
import {MutualFriend, User} from "@/app/lib/definitions";

export default async function RightSideBar() {
    const mutualFriends: MutualFriend[] =
        await fetchFriendsSuggestions(user.id)
            .then(async (suggestions: User[]) => {
                return await Promise.all(
                    suggestions.map(async (suggestion: User) => {
                            return {
                                ...suggestion,
                                users: await fetchMutualFollowersNames(
                                    user.id, suggestion.id
                                )
                            } as MutualFriend;
                        }
                    ))
            })
            .catch(e => {
                console.error(e);
                throw new Error("Error to fetch mutual friends");
            });

    return (
        <main className={styles.RightSideBar}>
            <UserProfile/>
            <Suggestions suggestions={mutualFriends}/>
        </main>
    );
}