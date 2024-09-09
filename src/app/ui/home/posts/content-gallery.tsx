'use client';

import Image from 'next/image';
import styles from "@/app/ui/home/posts/post.module.css";
import {useEffect, useRef, useState} from "react";
import {PostContent} from "@/app/lib/definitions";
import {IoIosArrowDropleftCircle} from "react-icons/io";
import {IoIosArrowDroprightCircle} from "react-icons/io";

export default function ContentGallery({content}: {
    content: PostContent[]
}) {
    const galleryRef = useRef<HTMLDivElement | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const scroll = (index: number) => {
        if(galleryRef.current) {
            const scrollAmount = galleryRef.current.clientWidth * index;
            galleryRef.current.scrollTo({
                left: scrollAmount,
                behavior: 'smooth',
            });
            setActiveIndex(index);
        }
    };

    const handleScroll = () => {
        if(galleryRef.current) {
            const scrollLeft = galleryRef.current.scrollLeft;
            const imageWidth = galleryRef.current.clientWidth;
            const currentIndex = Math.round(scrollLeft / imageWidth);
            setActiveIndex(currentIndex);
        }
    };

    useEffect(() => {
        const gallery = galleryRef.current;

        if (gallery) {
            gallery.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (gallery) {
                gallery.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    return (
        <div className={styles.ContentGallery}>
            <button className={styles.scrollButton}
                    style={{
                        left: 0,
                        display: activeIndex <= 0
                            ? "none" : "block"
                    }}
                    onClick={() => scroll(activeIndex - 1)}
            >
                <IoIosArrowDropleftCircle/>
            </button>

            <div className={styles.galleryContainer} ref={galleryRef}>
                {content.map((item, index) => (
                    <div key={index} className={styles.contentWrapper}>
                        {item.content_type === "image" ? (
                            <Image src={item.url}
                                   alt={`Picture ${index + 1}`}
                                   layout={"fill"}
                                   priority={true}
                            />
                        ) : (
                            <video width={450} controls>
                                <source src={item.url} type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </div>
                ))}
            </div>

            <button className={styles.scrollButton}
                    style={{
                        right: 0,
                        display: activeIndex >= content.length - 1
                            ? "none" : "block"
                    }}
                    onClick={() => scroll(activeIndex + 1)}
            >
                <IoIosArrowDroprightCircle/>
            </button>

            {content.length > 1 &&
                <div className={styles.dotsPagination}>
                    {content.map((item, index) => (
                        <div key={index}
                             className={`${styles.dot} 
                             ${index === activeIndex ? styles.active : ''}`}
                        />
                    ))}
                </div>
            }
        </div>
    );
}