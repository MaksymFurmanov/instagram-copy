import HomeIcon from "../../../../public/sidebar/home.svg";
import HomeFilledIcon from "../../../../public/sidebar/home-filled.svg";
import SearchIcon from "../../../../public/sidebar/search.svg";
import ExploreIcon from "../../../../public/sidebar/explore.svg";
import ExploreFilledIcon from "../../../../public/sidebar/explore-filled.svg";
import ReelsIcon from "../../../../public/sidebar/reels.svg";
import ReelsFilledIcon from "../../../../public/sidebar/reels-filled.svg";
import MessagesIcon from "../../../../public/sidebar/messages.svg";
import MessagesFilledIcon from "../../../../public/sidebar/messages-filled.svg";
import NotificationsIcon from "../../../../public/sidebar/notifications.svg";
import NotificationsFilledIcon from "../../../../public/sidebar/notifications-filled.svg";
import CreateIcon from "../../../../public/sidebar/create.svg";
import ThreadsIcon from "../../../../public/sidebar/threads.svg";
import HamburgerMenu from "../../../../public/sidebar/hamburger-menu.svg";
import {user} from "@/app/lib/data-placeholders";
import {SidebarLinkType} from "@/app/lib/definitions";

export const topLinks: SidebarLinkType[] = [
    {
        label: "Home",
        icon: HomeIcon,
        selected_icon: HomeFilledIcon,
        href: "/"
    },
    {
        label: "Search",
        icon: SearchIcon,
        selected_icon: SearchIcon,
    },
    {
        label: "Explore",
        icon: ExploreIcon,
        selected_icon: ExploreFilledIcon,
        href: "/explore"
    },
    {
        label: "Reels",
        icon: ReelsIcon,
        selected_icon: ReelsFilledIcon,
        href: "/reels"
    },
    {
        label: "Messages",
        icon: MessagesIcon,
        selected_icon: MessagesFilledIcon,
        href: "/direct/inbox"
    },
    {
        label: "Notifications",
        icon: NotificationsIcon,
        selected_icon: NotificationsFilledIcon,
    },
    {
        label: "Create",
        icon: CreateIcon,
        selected_icon: CreateIcon,
    },
    {
        label: "Profile",
        icon: user.profile_pic_url,
        selected_icon: user.profile_pic_url,
    }
]

export const bottomLinks: SidebarLinkType[] = [
    {
        label: "Threads",
        icon: ThreadsIcon,
        selected_icon: ThreadsIcon,
    },
    {
        label: "More",
        icon: HamburgerMenu,
        selected_icon: HamburgerMenu,
    }
]