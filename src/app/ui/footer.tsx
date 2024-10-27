import Dot from "./../../../public/dot.svg";
import {Fragment} from "react";

const Links = [
    "About",
    "Help",
    "Press",
    "API",
    "Jobs",
    "Privacy",
    "Terms",
    "Locations",
    "Language",
    "Meta Verified"
];

export default function Footer() {
    return (
        <footer className={"Footer"}>
            <div className={"footerLinks"}>
                {Links.map((link, index) => (
                    <Fragment key={index}>
                        <p>{link}</p>
                        {index !== Links.length - 1 && <Dot/>}
                    </Fragment>
                ))}
            </div>

            <p>2024 MAKSYM FURMANOV PORTFOLIO PROJECT</p>
        </footer>
    );
}