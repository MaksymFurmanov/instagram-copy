'use client';

import styles from "./post.module.css";
import Play from "./../../../../../public/play.svg";
import SoundOn from "./../../../../../public/sound-on.svg";
import SoundOff from "./../../../../../public/sound-off.svg";
import {useEffect, useRef, useState} from "react";

export default function Video({contentUrl}: {
    contentUrl: string
}) {
    const [isPlaying, setPlaying] = useState<boolean>(false);
    const [isMuted, setMuted] = useState<boolean>(true);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);

    const togglePlay = () => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        if (!isPlaying) {
            videoElement.play();
        } else {
            videoElement.pause();
        }
    }

    const toggleMute = () => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        videoElement.muted = !isMuted;
        setMuted(prevState => !prevState);
    }

    useEffect(() => {
        const videoElement = videoRef.current;

        const handlePlayOnView = (entries:
                                      IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    videoElement?.play();
                } else {
                    videoElement?.pause();
                    setPlaying(false);
                }
            });
        };

        const observer = new IntersectionObserver(handlePlayOnView, {
            threshold: 0.2,
        });

        if (videoElement) {
            observer.observe(videoElement);
        }

        return () => {
            if (videoElement) {
                observer.unobserve(videoElement);
            }
        };
    }, []);

    return (
        <main className={styles.Video}>
            <div onClick={togglePlay}>
                <video ref={videoRef}
                       onPlay={handlePlay}
                       onPause={handlePause}
                >
                    <source src={contentUrl}
                            type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
            </div>

            {!isPlaying && <Play className={styles.playBtn}/>}
            <div className={styles.muteBtn}
                 onClick={toggleMute}
            >
                {isMuted ? <SoundOff/> : <SoundOn/>}
            </div>
        </main>
    );
}