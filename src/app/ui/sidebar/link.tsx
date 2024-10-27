'use client';

import styles from "./sidebar.module.css";
import Image from "next/image";
import {SidebarLinkType} from "@/app/lib/definitions";
import {useRouter} from "next/navigation";
import {useSelectedLink, useSetSelectedLink} from "@/app/providers/SelectedLinkProvider";
import clsx from "clsx";

export default function Link({link}: {
    link: SidebarLinkType
}) {
    const {replace} = useRouter();
    const {selectedLink} = useSelectedLink();
    const {setSelectedLink} = useSetSelectedLink();

    const selected = selectedLink === link.label;

    const navigationHandler = (link: SidebarLinkType) => {
        setSelectedLink(link.label);

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

    const IconComponent = selected ? link.selected_icon : link.icon;

    return (
        <main className={clsx(
            styles.Link,
            link.label === "Threads" && styles.threads
        )}
              onClick={() => navigationHandler(link)}
        >
            {link.label === "Profile" ? (
                <Image src={link.icon}
                       alt={link.label}
                       width={25}
                       height={25}
                />
            ) : (
                <IconComponent className={link.label === "More"
                    ? styles.more : ""}
                />
            )}

            <p className={styles.linkLabel}
               style={{fontWeight: selected ? 600 : 400}}
            >
                {link.label}
            </p>
        </main>
    );
}