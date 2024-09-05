'use client';

import {Fragment} from 'react';
import styles from "./sidebar.module.css";
import Image from 'next/image';
import {topLinks, bottomLinks} from "@/app/ui/sidebar/links";
import logo from "../../../../public/logo.svg";
import fullLogo from "../../../../public/full-logo.svg";
import SidebarLink from "@/app/ui/sidebar/sidebar-link";
import {useRouter} from "next/navigation";
import {useEffect, useRef, useState} from "react";
import {SidebarLinkType} from "@/app/lib/definitions";

export default function Sidebar() {
    const {replace} = useRouter();
    const [selected, setSelected] = useState<string>("Home");

    const containerRef = useRef<HTMLDivElement | null>(null);
    const [showThreads, setShowThreads] = useState<boolean>(false);
    useEffect(() => {
        const requiredHeight = 60;

        const sidebarHeight = containerRef.current?.offsetHeight || 0;
        const usedHeight = containerRef.current?.scrollHeight || 0;
        const space = sidebarHeight - usedHeight;

        if (space < requiredHeight) {
            setShowThreads(false);
        } else {
            setShowThreads(true);
        }
    }, []);

    const navigationHandler = (link: SidebarLinkType) => {
        setSelected(link.label);

        if (link?.href) {
            replace(link.href);
            return;
        }

        switch (link.label) {
            case "Search":
                break;
            case "Notification":
                break;
            case "Create":
                break;
            default:
        }
    }

    return (
        <main className={styles.Sidebar} ref={containerRef}>
            <div>
                <a href={"/"}>
                    <Image className={styles.logoFull}
                           src={fullLogo}
                           alt={"Instagram"}
                           width={103}
                           height={29}
                    />
                    <Image className={styles.logo}
                           src={logo}
                           alt={"Instagram"}
                           width={103}
                           height={29}
                    />
                </a>
                <div>
                    {topLinks.map((link, index) =>
                        <SidebarLink key={`top-${index}`}
                                     link={link}
                                     selected={selected === link.label}
                                     onClick={() => navigationHandler(link)}
                        />
                    )}
                </div>
            </div>

            <div>
                {bottomLinks.map((link, index) => {
                    const handleThreads = (showThreads | link.label !== "Threads");
                    return handleThreads
                        ? <SidebarLink key={`bottom-${index}`}
                                       link={link}
                                       selected={selected === link.label}
                                       onClick={() => navigationHandler(link)}
                        />
                        : <Fragment key={`bottom-${index}`}/>;
                })}
            </div>
        </main>
    );
}