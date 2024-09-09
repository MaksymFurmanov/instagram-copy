import Image from "next/image";
import Circle from "./../../../public/circle.svg";

export default function ProfilePic({profilePicUrl}: {
    profilePicUrl: string
}) {
    return (
        <main className={"ProfilePic"}>
            <Image src={profilePicUrl}
                   alt={"Profile picture"}
                   width={20}
                   height={20}
            />
            <Circle className={"storiesCircle"}/>
        </main>
    );
}