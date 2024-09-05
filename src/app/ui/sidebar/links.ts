import HomeIcon from "../../../../public/home.svg";
import HomeFilledIcon from "../../../../public/home-filled.svg";
import SearchIcon from "../../../../public/search.svg";
import ExploreIcon from "../../../../public/explore.svg";
import ExploreFilledIcon from "../../../../public/explore-filled.svg";
import ReelsIcon from "../../../../public/reels.svg";
import ReelsFilledIcon from "../../../../public/reels-filled.svg";
import MessagesIcon from "../../../../public/messages.svg";
import MessagesFilledIcon from "../../../../public/messages-filled.svg";
import NotificationsIcon from "../../../../public/notifications.svg";
import NotificationsFilledIcon from "../../../../public/notifications-filled.svg";
import CreateIcon from "../../../../public/create.svg";
import ThreadsIcon from "../../../../public/threads.svg";
import HamburgerMenu from "../../../../public/hamburger-menu.svg";
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