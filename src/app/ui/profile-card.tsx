export default function ProfileCard({
                                        profilePicURL,
                                        nickname
                                    }: {
    profilePicURL: string,
    nickname: string,

}) {
    return (
        <div className={"ProfileCard"}>
            <img src={profilePicURL}
                 alt={}
            />
            <div>
                <h3>{nickname}</h3>
                <p></p>
            </div>

        </div>
    );
}