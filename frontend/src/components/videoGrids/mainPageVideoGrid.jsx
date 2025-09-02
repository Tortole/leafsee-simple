/*
Loads and places videos in the grid for the main page
*/

import axios from "axios";
import { useEffect, useRef, useState } from "react";

function roundViewsCount(viewsCount) {
    /*
    Convert a views count in string type to an abbreviated form with a letter postfix

    Params:
        viewsCount - string - views count in string type

    Return:
        roundViewsCount - string - rounded views count in abbreviated form with a letter postfix
    */

    const viewsCountStr = viewsCount.toString();
    switch (viewsCountStr.length) {
        case 1: // ones
        case 2: // tens
        case 3: // hundreds
            return viewsCountStr;

        case 4: // ones of thousands
            return viewsCountStr[0] + (viewsCountStr[1] ? "." + viewsCountStr[1] : "") + "K";
        case 5: // tens of thousands
            return viewsCountStr.substring(0, 2) + "K";
        case 6: // hundreds of thousands
            return viewsCountStr.substring(0, 3) + "K";

        case 7: // ones of millions
            return viewsCountStr[0] + (viewsCountStr[1] ? "." + viewsCountStr[1] : "") + "M";
        case 8: // tens of millions
            return viewsCountStr.substring(0, 2) + "M";
        case 9: // hundreds of millions
            return viewsCountStr.substring(0, 3) + "M";

        case 10: // ones of billions
            return viewsCountStr[0] + (viewsCountStr[1] ? "." + viewsCountStr[1] : "") + "B";
        case 11: // tens of billions
            return viewsCountStr.substring(0, 2) + "B";
        case 12: // hundreds of billions
            return viewsCountStr.substring(0, 3) + "B";

        default: // more than trillion
            return ">1T";
    }
}

function VideoTile({ video }) {
    /*
    Create tile with video preview, information and links to author channel and video player

    Params:
        video - Video model - Video model instance with information about single video

    Return:
        VideoTile - video preview tile component
    */

    return (
        <a
            href={`/video/${video.id}`}
            className="flex h-min cursor-pointer flex-col justify-start gap-1"
        >
            <img
                src={video.preview_image}
                className="clip-polygon-right-[15px] bg-gray-d aspect-video w-full"
                alt={`Video preview of "${video.name}"`}
            />
            <div className="flex w-full flex-col gap-1 px-3">
                <div className="flex w-full flex-row flex-wrap justify-start gap-3">
                    <a
                        href="!!! href-to-author-chanell"
                        src={video.author_avatar}
                        className="clip-polygon-octagon bg-gray-d size-12"
                        alt={`Avatar of ${video.author_username}`}
                    />
                    <div className="font-play line-clamp-2 w-[calc(100%-48px-12px)] text-lg leading-tight">
                        <span>{video.name}</span>
                    </div>
                </div>
                <div className="flex w-full flex-col hover:*:opacity-100">
                    <a
                        href="!!! href-to-author-chanell"
                        className="font-play line-clamp-1 text-sm opacity-70"
                    >
                        {video.author_nickname}
                    </a>
                    <a
                        href="!!! href-to-author-chanell"
                        className="font-play line-clamp-1 text-xs opacity-70"
                    >
                        {video.author_username}
                    </a>
                </div>
                <div>
                    <snap className="font-play text-sm opacity-70">
                        {`${roundViewsCount(video.views_count)} views`}
                    </snap>
                    <snap> · </snap>
                    <snap className="font-play text-sm opacity-70">
                        {`${video.timesince.split(",")[0]} ago`}
                    </snap>
                    <snap> · </snap>
                    <snap className="font-play text-sm opacity-70">
                        {video.upload_date.split("T")[0]}
                    </snap>
                </div>
            </div>
        </a>
    );
}

function TemporaryTile({ ref }) {
    /*
    Temporary tile that replaces the tile from the video while the video is being loaded

    Params:
        ref - useRef - useRef reference for the trigger function for loading new videos

    Return:
        TemporaryTile - video temporary tile component
    */

    return (
        <div className="flex h-min flex-col justify-start gap-1" ref={ref}>
            <div className="clip-polygon-right-[15px] bg-gray-d aspect-video w-full"></div>
            <div className="flex w-full flex-col gap-1 px-3">
                <div className="flex w-full flex-row flex-wrap justify-start gap-3">
                    <div className="clip-polygon-octagon bg-gray-d size-12"></div>
                    <div className="clip-polygon-octagon m-1 h-10 w-[calc(100%-48px-12px-8px)]"></div>
                </div>
                <div className="clip-polygon-right-[15px] m-1 h-12 w-full"></div>
            </div>
        </div>
    );
}

function getGridItemsPerRow(gridRef) {
    /*
    Calculates the number of columns in an element with the CSS property "grid-template-columns: repeat(...)"

    Params:
        gridRef - useRef - useRef reference to element with the CSS property "grid-template-columns: repeat(...)"

    Return:
        columnsCount - number - count of columns in referenced element
    */

    const gridColumnsWidths = window.getComputedStyle(gridRef.current).gridTemplateColumns;

    if (!gridColumnsWidths) return 0;

    const columns = gridColumnsWidths.split(" ").filter(Boolean);
    return columns.length;
}

export default function MainPageGrid() {
    /*
    Video grid component for main page

    Params:
        none

    Return:
        MainPageGrid - video grid component
    */

    /*
    It has been empirically determined that
    the maximum number of visible video rows in a grid
    with a minimum video tile width of 400px
    and on a standard-size monitor
    is 5
    + 1 just in case
    */
    const visibleRowInVideoGridCount = 6;
    // The number of rows with temporary tiles after the rows with videos in the grid
    const temporaryRowsCount = 2;

    const videosPerRowCount = useRef(null);
    const isRequestSend = useRef(false);
    const isThereVideoToLoad = useRef(true);

    const videoGridRef = useRef(null);
    const firstTemporaryTile = useRef(null);

    const [videos, setVideos] = useState([]);
    const [temporaryTilesCount, setTemporaryTilesCount] = useState(1);

    function loadVideo() {
        /*
        Load new videos and block access when to request while loading
        */

        if (isRequestSend.current) {
            return;
        }
        isRequestSend.current = true;

        const videoToLoadCount = videosPerRowCount.current * visibleRowInVideoGridCount;
        axios
            .get(
                "/api/video",
                {
                    video_count: videoToLoadCount,
                },
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Accept: "application/json",
                    },
                },
            )
            .then((response) => {
                const loadedVideo = response.data;
                setVideos((v) => [...v, ...loadedVideo]);

                if (loadedVideo.length < videoToLoadCount) {
                    isThereVideoToLoad.current = false;
                }

                setTemporaryTilesCount(videosPerRowCount.current * temporaryRowsCount);
                isRequestSend.current = false;
            })
            // !!! add error handling
            .catch((error) => error);
    }

    const observerLoadVideo = new IntersectionObserver(
        /*
        Trigger function to load new videos when the element marked by this observer gets into the viewport
        */

        ([entry]) => {
            if (entry.isIntersecting) {
                loadVideo();
            }
        },
        {
            threshold: 0,
        },
    );

    /*
    Calculates the number of videos in a row in the grid,
    place temporary tiles while the first videos are loading
    and sets the video download trigger to firstTemporaryTile
    */
    useEffect(() => {
        videosPerRowCount.current = getGridItemsPerRow(videoGridRef);
        setTemporaryTilesCount(videosPerRowCount.current * visibleRowInVideoGridCount);
        loadVideo();
        observerLoadVideo.observe(firstTemporaryTile.current);
    }, []);

    function updateVideoGrid() {
        /*
        Recalculates the number of videos in a row when the grid is resized
        */

        const videosPerRowCountNew = getGridItemsPerRow(videoGridRef);

        if (videosPerRowCountNew !== videosPerRowCount) {
            /*
            The number of video tiles in the last incomplete row
            zero means that there is no incomplete row
            */
            const videosTailCount = videos.length % videosPerRowCountNew;

            // If there is no incomplete line with video tiles,
            if (videosTailCount === 0) {
                // then add time tiles for exactly temporaryRowsCount lines,
                setTemporaryTilesCount(videosPerRowCountNew * temporaryRowsCount);
            } else {
                // else add additional tiles to align the incomplete line
                setTemporaryTilesCount(
                    videosPerRowCountNew * temporaryRowsCount +
                        (videosPerRowCountNew - videosTailCount),
                );
            }

            videosPerRowCount.current = videosPerRowCountNew;
        }
    }

    /*
    Sets updateVideoGrid to the resizing event listener
    and updates it when the video variable changes (because React does't pass the actual variables to the listener)
    */
    useEffect(() => {
        window.addEventListener("resize", updateVideoGrid);
    }, [videos]);

    return (
        <div ref={videoGridRef} className="grid-repeat-auto-fill-[400px] grid h-fit w-full gap-6">
            {videos.map((video) => (
                <VideoTile video={video} />
            ))}
            {isThereVideoToLoad.current && (
                <>
                    <TemporaryTile ref={firstTemporaryTile} />
                    {Array(temporaryTilesCount - 1).fill(<TemporaryTile />)}
                </>
            )}
        </div>
    );
}
