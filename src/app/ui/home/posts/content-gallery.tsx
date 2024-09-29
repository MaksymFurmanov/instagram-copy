'use client';

import Image from 'next/image';
import styles from "@/app/ui/home/posts/post.module.css";
import modalStyles from '@/app/ui/home/posts/modal/post.modal.module.css';
import {useEffect, useRef, useState} from "react";
import {PostContent} from "@/app/lib/definitions";
import {IoIosArrowDropleftCircle} from "react-icons/io";
import {IoIosArrowDroprightCircle} from "react-icons/io";
import clsx from "clsx";
import Video from "@/app/ui/home/posts/video";

export default function ContentGallery({content, size, modal = false}: {
    content: PostContent[],
    size: {
        width: number,
        height: number
    },
    modal?: boolean
}) {
    const galleryRef = useRef<HTMLDivElement | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const scroll = (index: number) => {
        if (galleryRef.current) {
            const scrollAmount = galleryRef.current.clientWidth * index;
            galleryRef.current.scrollTo({
                left: scrollAmount,
                behavior: 'smooth',
            });
            setActiveIndex(index);
        }
    };

    const handleScroll = () => {
        if (galleryRef.current) {
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
        <main className={clsx(
            styles.ContentGallery,
            modal && modalStyles.modalContent
        )}>
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
                {content.map((item, index) => {
                    return (
                        <div key={index} className={styles.contentWrapper}
                             style={{
                                 aspectRatio: `${size.width} / ${size.height}`
                             }}
                        >
                            {item.content_type === "image" ? (
                                <Image key={index}
                                       src={item.url}
                                       alt={`Picture ${index + 1}`}
                                       layout={"fill"}
                                       priority={true}
                                />
                            ) : (
                                <Video key={index}
                                       contentUrl={item.url}
                                />
                            )}
                        </div>
                    )
                })}
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
                    {content.map((_, index) => (
                        <div key={index}
                             className={`${styles.dot} 
                             ${index === activeIndex ? styles.active : ''}`}
                        />
                    ))}
                </div>
            }
        </main>
    );
}