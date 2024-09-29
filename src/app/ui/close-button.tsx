'use client';

import CloseIcon from "../../../public/close.svg";
import {MouseEventHandler} from "react";
import {useRouter} from "next/navigation";

export default function CloseButton() {
    const router = useRouter();

    return (
        <button className={"CloseButton"}
                onClick={() => router.back()}
        >
            <CloseIcon/>
        </button>
    );
}