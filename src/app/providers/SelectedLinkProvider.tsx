import {createContext, Dispatch, SetStateAction, useContext, useState} from "react";

type SelectedLinkContextType = { selectedLink: string } | undefined;
type SetSelectedLinkContextType = { setSelectedLink: Dispatch<SetStateAction<string>> } | undefined;

const SelectedLinkContext = createContext<SelectedLinkContextType>(undefined);
const SetSelectedLinkContext = createContext<SetSelectedLinkContextType>(undefined);

export default function SelectedLinkProvider({children}:
                                                 { children: React.ReactNode }) {
    const [selectedLink, setSelectedLink] = useState<string>("Home");

    return (
        <SetSelectedLinkContext.Provider value={{setSelectedLink}}>
            <SelectedLinkContext.Provider value={{selectedLink}}>
                {children}
            </SelectedLinkContext.Provider>
        </SetSelectedLinkContext.Provider>
    );
}

export const useSelectedLink = () => {
    const context = useContext(SelectedLinkContext);
    if (!context) {
        throw new Error("useSelectedLink isn't in SelectedLinkProvider");
    }
    return context;
};

export const useSetSelectedLink = () => {
    const context = useContext(SetSelectedLinkContext);
    if (!context) {
        throw new Error("useSetSelectedLink isn't in SelectedLinkProvider");
    }
    return context;
};