
import {MouseEventHandler} from "react";

export default function MoreModal({onClose}: {
    onClose: MouseEventHandler<HTMLButtonElement>
}) {
    return (
        <main>
            <button onClick={onClose}>
                Close
            </button>
        </main>
    );
}