'use client';

import {Fragment} from 'react';
import styles from "./sidebar.module.css";
import {topLinks, bottomLinks, SidebarLinkType} from "@/app/ui/sidebar/links";
import LogoSmall from "../../../../public/sidebar/logo.svg";
import FullLogo from "../../../../public/sidebar/full-logo.svg";
import Link from "@/app/ui/sidebar/link";
import {useRouter} from "next/navigation";
import {useEffect, useRef, useState} from "react";

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

    const [showLabels, setShowLabels] = useState<boolean>(false);
    useEffect(() => {
        const handleResize = () => {
            setShowLabels(window.innerWidth > 1260);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
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

    const Logo = showLabels ? FullLogo : LogoSmall;

    return (
        <main className={styles.Sidebar} ref={containerRef}>
            <div>
                <a href={"/"}>
                    <Logo className={
                        showLabels ? styles.logoFull : styles.logo
                    }/>
                </a>
                <div>
                    {topLinks.map((link, index) =>
                        <Link key={`top-${index}`}
                              link={link}
                              selected={selected === link.label}
                              showLabels={showLabels}
                              onClick={() => navigationHandler(link)}
                        />
                    )}
                </div>
            </div>

            <div>
                {bottomLinks.map((link, index) => {
                    const handleThreads = (showThreads || link.label !== "Threads");
                    return handleThreads
                        ? <Link key={`bottom-${index}`}
                                link={link}
                                selected={selected === link.label}
                                showLabels={showLabels}
                                onClick={() => navigationHandler(link)}
                        />
                        : <Fragment key={`bottom-${index}`}/>;
                })}
            </div>
        </main>
    );
}