import Header from "@/app/ui/home/header";
import List from "@/app/ui/home/stories/list";
import PostsList from "@/app/ui/home/posts/list";
import RightSideBar from "@/app/ui/home/right-side-bar/right-side-bar";
import styles from "./ui/home/home.module.css"
import React, {Suspense} from "react";
import PostModal from "@/app/ui/home/posts/modal/modal";

export default function HomePage({
                                     searchParams
                                 }: {
    searchParams?: {
        variant?: string,
        id?: string
    }
}) {
    const params = new URLSearchParams(searchParams);
    const variant = params.get("variant") || "home";
    const id = params.get("id") || null;

    return (
        <main className={styles.Home}>
            <div>
                <Header variant={variant}/>

                {variant === "home" && <List/>}

                <PostsList variant={variant}/>
            </div>

            <RightSideBar/>

            {id && <Suspense fallback={"Loading"}>
                <PostModal id={id}/>
            </Suspense>}
        </main>
    );
}
