import styles from "./sidebar.module.css";
import Image from "next/image";
import {SidebarLinkType} from "@/app/lib/definitions";

const buttonStyle: Record<string, string> = {
    "Profile": styles.profile,
    "More": styles.more
};

export default function SidebarLink({link, selected, onClick}: {
    link: SidebarLinkType,
    selected: boolean,
    onClick: Function
}) {
    return (
        <main className={styles.SidebarLink}
              onClick={onClick}
        >
            <Image src={selected ? link.selected_icon : link.icon}
                   className={buttonStyle[link.label] || ""}
                   alt={link.label}
                   width={20}
                   height={20}
            />
            <p style={{fontWeight: selected ? 600 : 400}}>
                {link.label}
            </p>
        </main>
    );
}