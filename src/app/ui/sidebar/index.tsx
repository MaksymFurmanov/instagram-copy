'use client';

import styles from "./sidebar.module.css";
import LogoSmall from "../../../../public/sidebar/logo.svg";
import FullLogo from "../../../../public/sidebar/full-logo.svg";
import LinkList from "@/app/ui/sidebar/link-list";
import {bottomLinks, topLinks} from "@/app/ui/sidebar/links";

export default function Sidebar() {
    return (
        <main className={styles.Sidebar}>
            <div>
                <a href={"/"}>
                    <FullLogo className={styles.logoFull}/>
                    <LogoSmall className={styles.logo}/>
                </a>

                <LinkList links={topLinks}/>
            </div>

            <LinkList links={bottomLinks}/>
        </main>
    );
}