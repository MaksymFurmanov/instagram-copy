'use client';

import {ReactElement, useEffect, useLayoutEffect, useState} from "react";
import {createPortal} from "react-dom";

const createWrapper = (wrapperId: string) => {
    const wrapper = document.createElement("div");
    wrapper.setAttribute("id", wrapperId);
    document.body.appendChild(wrapper);
    return wrapper;
}

export default function ModalPortal({
    children,
    wrapperId
                                    }: {
    children: ReactElement,
    wrapperId: string
}) {
    const [wrapper, setWrapper] = useState<HTMLElement>();

    useLayoutEffect(() => {
        let element = document.getElementById(wrapperId);
        let systemCreated = false;

        if(!element) {
            systemCreated = true;
            element = createWrapper(wrapperId);
        }
        setWrapper(element);

        return () => {
            if(systemCreated && element?.parentNode) {
                element.parentNode.removeChild(element);
            }
        }
    }, [wrapperId]);

    useEffect(() => {
        if(!document.body.classList.contains("noScroll")) {
            document.body.classList.add("noScroll");
        }

        return () => {
            document.body.classList.remove("noScroll");
        }
    }, [wrapperId]);

    if(!wrapper) return null;

    return createPortal(children, wrapper);
}