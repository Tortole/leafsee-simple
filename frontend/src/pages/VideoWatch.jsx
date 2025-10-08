/*
Page for watching and commenting on the video
*/

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MainShell from "components/shells/mainShell/mainShell";
import Videoplayer from "components/videoplayers/videoWatchPlayer";

function loadVideo(videoId, setVideo) {
    /*
    Video info load function by GET request to backend API

    Params:
        videoId - video ID
        setVideo - hook function to set video info

    Returns:
        none
    */

    axios
        .get(
            `/api/video/${videoId}`,
            {},
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Accept: "application/json",
                },
            },
        )
        .then((response) => {
            setVideo(response.data);
        })
        // !!! add error handling
        .catch((error) => error);
}

export default function VideoWatch() {
    /*
    Video watch page component

    Params:
        none

    Returns:
        VideoWatch - video watch page component
    */

    const { videoId } = useParams();

    const [video, setVideo] = useState(null);

    useEffect(() => {
        loadVideo(videoId, setVideo);
    }, []);

    return (
        <MainShell>
            <div className="flex flex-row gap-5">
                <div className="flex w-[75%] flex-col gap-5">
                    <div className="clip-polygon-right-1 aspect-video w-full">
                        {video && <Videoplayer video={video} />}
                    </div>
                    <div>description</div>
                    <div>comments</div>
                </div>
                <div>recommendation</div>
            </div>
        </MainShell>
    );
}
