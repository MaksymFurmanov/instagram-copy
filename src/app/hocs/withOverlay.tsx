import {ComponentType, FC} from "react";

export default function withOverlay<P extends object>(
    WrappedComponent: ComponentType<P>
): FC<P> {
    return ({...props}: P) => {
        return (
            <div className="Overlay">
                <WrappedComponent {...props as P} />
            </div>
        );
    };
}