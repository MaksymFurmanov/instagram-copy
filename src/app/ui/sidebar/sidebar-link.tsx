import styles from "./sidebar.module.css";
import Image from "next/image";
import {SidebarLinkType} from "@/app/ui/sidebar/links";

export default function SidebarLink({link, selected, onClick, showLabels}: {
    link: SidebarLinkType,
    selected: boolean,
    showLabels: boolean,
    onClick: Function
}) {
    const IconComponent = selected ? link.selected_icon : link.icon;
    return (
        <main className={styles.SidebarLink} onClick={onClick}>
            {link.label === "Profile" ? (
                <Image src={link.icon}
                       alt={link.label}
                       style={{borderRadius: "50px"}}
                       width={25}
                       height={25}
                />
            ) : (
                <IconComponent className={link.label === "More"
                    ? styles.more : ""}
                />
            )}
            {showLabels &&
                <p style={{fontWeight: selected ? 600 : 400}}>
                    {link.label}
                </p>
            }
        </main>
    );
}