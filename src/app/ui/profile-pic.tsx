import Image from "next/image";

export default function ProfilePic({profilePicUrl}: {
    profilePicUrl: string
}) {
    return (
        <main className={"ProfilePic"}>
            <Image src={profilePicUrl}
                   alt={"Profile picture"}
                   className={"profilePicture"}
                   width={20}
                   height={20}
            />
        </main>
    );
}