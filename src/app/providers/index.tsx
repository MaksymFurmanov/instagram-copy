'use client';

import SelectedLinkProvider from "@/app/providers/SelectedLinkProvider";

export function Providers({children}: { children: React.ReactNode }) {
    return (
        <SelectedLinkProvider>
            {children}
        </SelectedLinkProvider>
    );
}