'use client';

import Link from "@/app/ui/sidebar/link";
import {SidebarLinkType} from "@/app/lib/definitions";

export default function LinkList({links}: { links: SidebarLinkType[] }) {
    return (
        <div>
            {links.map((link, index) => (
                <Link key={`bottom-${index}`}
                      link={link}
                />
            ))}
        </div>
    );
}