import {DependencyList, useEffect, useRef} from "react";

export default function useScalingTextarea(rows: number, [...args]: DependencyList) {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${Math.min(textarea.scrollHeight, 16 * rows)}px`;
        }
    }, [args]);

    return textareaRef;
}