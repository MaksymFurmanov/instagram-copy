'use client';

import {usePathname, useSearchParams} from "next/navigation";
import {useRouter} from "next/navigation";
import styles from "./home.module.css";
import clsx from "clsx";
import {HomeVariant} from "@/app/page";

export default function HomeHeader({variant}: {variant: HomeVariant}) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const {replace} = useRouter();

    const handleNavigation = (variant: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("variant", variant);
        replace(`${pathname}?${params}`);
    }

    return (
        <header className={styles.HomeHeader}>
            <p className={clsx(
                styles.headerLink,
                variant === "home" && styles.selected
            )}
               onClick={() => handleNavigation("home")}
            >
                For you
            </p>
            <p className={clsx(
                styles.headerLink,
                variant === "following" && styles.selected
            )}
               onClick={() => handleNavigation("following")}
            >
                Following
            </p>
        </header>
    );
}