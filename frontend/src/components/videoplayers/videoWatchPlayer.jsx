/*
Video player component for displaying and controlling video
*/

import { useCallback, useEffect, useRef, useState } from "react";

import VideoplayerFullscreenOffButton from "static/svg/videoplayer_fullscreen_off_button.svg";
import VideoplayerFullscreenOnButton from "static/svg/videoplayer_fullscreen_on_button.svg";
import VideoplayerSettingsButton from "static/svg/videoplayer_gear.svg";
import VideoplayerPauseButton from "static/svg/videoplayer_pause_button.svg";
import VideoplayerPlayButton from "static/svg/videoplayer_play_button.svg";
import VideoplayerSoundOffButton from "static/svg/videoplayer_sound_off_button_filled.svg";
import VideoplayerSoundOnButton from "static/svg/videoplayer_sound_on_button_filled.svg";

function secondsToFormattedTime(seconds) {
    /*
    Converts seconds to a time string in format MM:SS or HH:MM:SS

    Params:
        seconds - numeric value of seconds

    Returns:
        formattedTime - time string in format MM:SS, if the seconds are less than 3600,
            or HH:MM:SS, otherwise
    */

    // !!! what if hours more than 24?
    if (seconds <= 3600) {
        // to MM:SS format
        return new Date(seconds * 1000).toISOString().substring(14, 19);
    } else {
        // to HH:MM:SS format
        return new Date(seconds * 1000).toISOString().substring(11, 16);
    }
}

function seekVideoFromPercentage(videoplayerRef, percentage) {
    /*
    Seek the video by percentage of progress

    Params:
        videoplayerRef - useRef to video player
        percentage - video progress percentage to seek to

    Returns:
        none
    */

    if (videoplayerRef.current) {
        videoplayerRef.current.currentTime = (percentage / 100) * videoplayerRef.current.duration;
    }
}

function getMouseXRelativePosition(event, element) {
    /*
    Get the relative position of the mouse's X-axis from the left edge of an element
    as a percentage of its width

    Params:
        event - mouse click or drag event
        element - element relative to which the mouse position will be calculated

    Return:
        percentage - mouse relative position as a percentage of element width,
            ranging from 0 to 100
    */

    const rect = element.getBoundingClientRect();
    const relativePosition = Math.max(0, Math.min(rect.width, event.clientX - rect.left));
    const percentage = (relativePosition / rect.width) * 100;
    return percentage;
}

function PlayPauseButton({ isPlaying, handlePlayPause }) {
    /*
    Video player play and pause button component

    Params:
        isPlaying - boolean flag that indicates the video is playing
        handlePlayPause - handle function that stops and continues video playback

    Returns:
        PlayPauseButton - play and pause button component
    */

    return (
        <button className="flex h-full w-14 justify-center" onClick={handlePlayPause}>
            <img
                className="w-6 invert"
                src={isPlaying ? VideoplayerPauseButton : VideoplayerPlayButton}
            />
        </button>
    );
}

function ProgressBar({ videoplayerRef, videoProgressPercentage, setVideoProgressPercentage }) {
    /*
    Video player video progress bar component

    Params:
        videoplayerRef - useRef to video player
        videoProgressPercentage - current video progress in percentage
        setVideoProgressPercentage - function to set video progress in percentage

    Return:
        ProgressBar - progress bar component
    */

    const progressBar = useRef(null);
    const [isBarDragging, setIsBarDragging] = useState(false);
    const [videoProgressPercentageDrag, setVideoProgressPercentageDrag] = useState(0);

    function handleProgressBarDragStart(event) {
        /*
        Handle function when the user clicks the mouse button on the progress bar
        */

        if (!progressBar.current) return;

        event.preventDefault();
        event.stopPropagation();

        setVideoProgressPercentageDrag(getMouseXRelativePosition(event, progressBar.current));
        setIsBarDragging(true);
    }

    const handleProgressBarDrag = useCallback(
        (event) => {
            /*
            Handle function when the user holds the mouse button and move mouse
            over the progress bar
            */

            if (!progressBar.current || !isBarDragging) return;

            setVideoProgressPercentageDrag(getMouseXRelativePosition(event, progressBar.current));
        },
        [isBarDragging, progressBar],
    );

    const handleProgressBarDragEnd = useCallback(
        (event) => {
            /*
            Handle function when the user releases the mouse button from the progress bar
            */
            if (!progressBar.current || !isBarDragging) return;

            event.preventDefault();
            event.stopPropagation();

            seekVideoFromPercentage(videoplayerRef, videoProgressPercentageDrag);
            setVideoProgressPercentage(videoProgressPercentageDrag);
            setIsBarDragging(false);
        },
        [
            isBarDragging,
            progressBar,
            videoProgressPercentageDrag,
            videoplayerRef,
            setVideoProgressPercentage,
        ],
    );

    useEffect(() => {
        /*
        Rerender progress bar when the user clicks, holds and moves mouse over the progress bar
        */

        document.addEventListener("mousemove", handleProgressBarDrag);
        document.addEventListener("mouseup", handleProgressBarDragEnd);
        return () => {
            document.removeEventListener("mousemove", handleProgressBarDrag);
            document.removeEventListener("mouseup", handleProgressBarDragEnd);
        };
    }, [handleProgressBarDrag, handleProgressBarDragEnd]);

    return (
        <div
            className="group relative flex h-2 w-full cursor-pointer items-center"
            onMouseDown={handleProgressBarDragStart}
            ref={progressBar}
        >
            {/* background */}
            <div className="absolute h-1 w-full bg-white bg-opacity-25 group-hover:h-full" />
            {/* loaded */}
            <div
                className="absolute h-1 bg-white bg-opacity-50 group-hover:h-full"
                style={{ width: `${0}%` }}
            />
            {/* watched */}
            <div
                className="bg-green-n absolute flex h-1 items-center group-hover:h-full"
                style={{
                    width: `${isBarDragging ? videoProgressPercentageDrag : videoProgressPercentage}%`,
                }}
            >
                <div className="bg-green-n clip-polygon-right-[33%] absolute -right-2 size-0 group-hover:size-4" />
            </div>
        </div>
    );
}

function MuteButton({ isVolumeMute, muteUnmuteVideo }) {
    /*
    Video player mute and unmute button component

    Params:
        isVolumeMute - boolean flag that indicates the volume video is mute
        muteUnmuteVideo - handle function to mute and unmute volume

    Returns:
        MuteButton - mute and unmute button component
    */

    return (
        <button className="flex h-full w-12 justify-center" onClick={muteUnmuteVideo}>
            <img
                className="w-6 invert"
                src={isVolumeMute ? VideoplayerSoundOffButton : VideoplayerSoundOnButton}
            />
        </button>
    );
}

function VolumeBar({ isVolumeMute, volumePercentage, intermediarySetVideoVolumePercentage }) {
    /*
    Video player volume bar component

    Params:
        isVolumeMute - boolean flag that indicates the volume video is mute
        volumePercentage - current video volume value in percentage
        intermediarySetVideoVolumePercentage - intermediary function for changing the volume

    Return:
        VolumeBar - volume bar component
    */

    const volumeBar = useRef(null);
    const [isBarDragging, setIsBarDragging] = useState(false);

    function handleVolumeBarDragStart(event) {
        /*
        Handle function when the user clicks the mouse button on the volume bar
        */

        if (!volumeBar.current) return;

        event.preventDefault();
        event.stopPropagation();

        intermediarySetVideoVolumePercentage(
            getMouseXRelativePosition(event, volumeBar.current),
            false,
        );
        setIsBarDragging(true);
    }

    const handleVolumeBarDrag = useCallback(
        (event) => {
            /*
            Handle function when the user holds the mouse button and move mouse over the volume bar
            */

            if (!volumeBar.current || !isBarDragging) return;

            intermediarySetVideoVolumePercentage(
                getMouseXRelativePosition(event, volumeBar.current),
                false,
            );
        },
        [isBarDragging, volumeBar, intermediarySetVideoVolumePercentage],
    );

    const handleVolumeBarDragEnd = useCallback(
        (event) => {
            /*
            Handle function when the user releases the mouse button from the volume bar
            */
            if (!volumeBar.current || !isBarDragging) return;

            event.preventDefault();
            event.stopPropagation();

            const relativePosition = getMouseXRelativePosition(event, volumeBar.current);
            intermediarySetVideoVolumePercentage(relativePosition, relativePosition > 0);
            setIsBarDragging(false);
        },
        [isBarDragging, volumeBar, intermediarySetVideoVolumePercentage],
    );

    useEffect(() => {
        /*
        Rerender volume bar when the user clicks, holds and moves mouse over the volume bar
        */

        document.addEventListener("mousemove", handleVolumeBarDrag);
        document.addEventListener("mouseup", handleVolumeBarDragEnd);
        return () => {
            document.removeEventListener("mousemove", handleVolumeBarDrag);
            document.removeEventListener("mouseup", handleVolumeBarDragEnd);
        };
    }, [handleVolumeBarDrag, handleVolumeBarDragEnd]);

    return (
        <div
            className="relative flex h-full w-24 cursor-pointer items-center"
            onMouseDown={handleVolumeBarDragStart}
            ref={volumeBar}
        >
            {/* background */}
            <div className="absolute h-1 w-full bg-white bg-opacity-25" />
            {/* bar */}
            <div
                className="absolute flex h-1 items-center bg-white"
                style={{
                    width: `${isVolumeMute ? 0 : volumePercentage}%`,
                }}
            >
                <div className="clip-polygon-right-[33%] absolute -right-[6px] size-3 bg-white" />
            </div>
        </div>
    );
}

function SettingsMenuOpenButton({ isSettingsMenuVisible, setIsSettingsMenuVisible }) {
    /*
    Video settings menu open button component

    Params:
        isSettingsMenuVisible - boolean flag that indicates the settings menu
            is visible and whether the button image needs to be rotated
        setIsSettingsMenuVisible - handle function to show and hide settings menu

    Returns:
        SettingsMenuOpenButton - settings menu open button component
    */

    return (
        <button
            className="flex h-full w-12 justify-center"
            onClick={() => setIsSettingsMenuVisible((i) => !i)}
        >
            <img
                className={
                    "w-8 invert transition-transform " +
                    `${isSettingsMenuVisible ? "-rotate-90" : "rotate-0"}`
                }
                src={VideoplayerSettingsButton}
            />
        </button>
    );
}

function SettingsMenu() {
    /*
    Video settings menu component

    Params:
        none

    Returns:
        SettingsMenu - settings menu component
    */

    return (
        <div className="clip-polygon-right-1 absolute -top-80 right-6 flex h-80 w-60 flex-col gap-1 bg-black bg-opacity-80 p-4">
            <span className="text-white">Качество видео 720р</span>
            <span className="text-white">Скорость воиспр. 1.0х</span>
        </div>
    );
}

function FullscreenButton({ isVideoFullscreen, setIsVideoFullscreen }) {
    /*
    Video enter or exit fullscreen button component

    Params:
        isVideoFullscreen - boolean flag that indicates is video in fullscreen mode
        setIsVideoFullscreen - handle function to enter or exit fullscreen mode

    Returns:
        FullscreenButton - fullscreen button component
    */

    return (
        <button
            className="flex h-full w-12 justify-center"
            onClick={() => setIsVideoFullscreen((i) => !i)}
        >
            <img
                className="w-7 invert"
                src={
                    isVideoFullscreen
                        ? VideoplayerFullscreenOffButton
                        : VideoplayerFullscreenOnButton
                }
            />
        </button>
    );
}

function Videoplayer({ video }) {
    /*
    Video player component that display and control video

    Params:
        video - instance of the video model

    Return:
        Videoplayer - video player component
    */

    const videoplayerContainer = useRef(null);
    const videoplayer = useRef(null);

    // >>>> Handle the play and pause >>>>
    const [isPlaying, setIsPlaying] = useState(false);

    function handlePlayPause() {
        if (isPlaying) {
            videoplayer.current.pause();
        } else {
            videoplayer.current.play();
        }
        setIsPlaying(!isPlaying);
    }

    // >>>> Handle the progress bar and time >>>>
    const [videoProgressPercentage, setVideoProgressPercentage] = useState(0);
    const [videoProgressTime, setVideoProgressTime] = useState(secondsToFormattedTime(0));
    const [videoDuration, setVideoDuration] = useState(secondsToFormattedTime(0));

    function handleProgress(event) {
        // duration is NotaNumber at beginning
        if (isNaN(event.target.duration)) {
            return;
        }

        const currentTimeDurationRatio = event.target.currentTime / event.target.duration;

        // set video playing boolean flag
        if (currentTimeDurationRatio === 1) {
            // touch setIsPlaying only if currentTimeDurationRatio === 1
            setIsPlaying(false);
        }

        // set progress bar
        setVideoProgressPercentage(currentTimeDurationRatio * 100);

        // set progress time
        setVideoProgressTime(secondsToFormattedTime(event.target.currentTime));
    }

    // >>>> Handle the video volume >>>>
    const [isVolumeMute, setIsVolumeMute] = useState(false);
    const [volumePercentage, setVolumePercentage] = useState(100);
    /*
    The last non-zero value is the video volume, before starting the next video volume change,
    for example, dragging the volume bar slider
    */
    const lastNotZeroVideoVolume = useRef(100);

    useEffect(() => {
        videoplayer.current.volume = volumePercentage / 100;
        setIsVolumeMute(volumePercentage === 0);
    }, [volumePercentage]);

    // The intermediary function for changing the volume to keep lastNotZeroVideoVolume
    function intermediarySetVideoVolumePercentage(volumePercentage, isVolumeChangingComplete) {
        setVolumePercentage(volumePercentage);
        if (isVolumeChangingComplete) {
            lastNotZeroVideoVolume.current = volumePercentage;
        }
    }

    function muteUnmuteVideo() {
        if (isVolumeMute) {
            setVolumePercentage(lastNotZeroVideoVolume.current);
            videoplayer.current.volume = lastNotZeroVideoVolume.current / 100;
            setIsVolumeMute(false);
        } else {
            videoplayer.current.volume = 0;
            setIsVolumeMute(true);
        }
    }

    // >>>> Handle the video settings menu >>>>
    const [isSettingsMenuVisible, setIsSettingsMenuVisible] = useState(false);

    // >>>> Handle the fullscreen >>>>
    /*
    The initial state is null to avoid an error when trying to exit fullscreen mode
    when first loading a page when there is no fullscreen element
    */
    const [isVideoFullscreen, setIsVideoFullscreen] = useState(null);

    function handleFullscreen(isEnterToFullscreen) {
        if (isEnterToFullscreen) {
            if (videoplayerContainer.current.requestFullscreen) {
                videoplayerContainer.current.requestFullscreen();
            } else if (videoplayerContainer.current.mozRequestFullScreen) {
                // Firefox
                videoplayerContainer.current.mozRequestFullScreen();
            } else if (videoplayerContainer.current.webkitRequestFullscreen) {
                // Safari
                videoplayerContainer.current.webkitRequestFullscreen();
            } else if (videoplayerContainer.current.msRequestFullscreen) {
                // IE/Edge
                videoplayerContainer.current.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                // Firefox
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                // Safari
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                // IE/Edge
                document.msExitFullscreen();
            }
        }
    }

    useEffect(() => {
        if (isVideoFullscreen !== null) {
            handleFullscreen(isVideoFullscreen);
        }
    }, [isVideoFullscreen]);

    return (
        <div className="relative size-full" ref={videoplayerContainer}>
            {/* Videoplayer */}
            <video
                className="absolute size-full bg-black object-contain"
                ref={videoplayer}
                onTimeUpdate={handleProgress}
                onLoadedMetadata={(event) =>
                    setVideoDuration(secondsToFormattedTime(event.target.duration))
                }
            >
                <source src={video.file} type="video/mp4" />
            </video>

            {/* Bottom video controls bar */}
            <div className="absolute bottom-0 flex w-full flex-col gap-1 bg-gradient-to-t from-black px-4 pb-1 pt-9">
                <ProgressBar
                    videoplayerRef={videoplayer}
                    videoProgressPercentage={videoProgressPercentage}
                    setVideoProgressPercentage={setVideoProgressPercentage}
                />

                {/* Video controls buttons */}
                <div className="flex h-12 w-full flex-row items-center justify-between">
                    <div className="flex h-full flex-row items-center gap-1">
                        <PlayPauseButton handlePlayPause={handlePlayPause} isPlaying={isPlaying} />
                        <MuteButton
                            isVolumeMute={isVolumeMute}
                            muteUnmuteVideo={muteUnmuteVideo}
                        />
                        <VolumeBar
                            isVolumeMute={isVolumeMute}
                            volumePercentage={volumePercentage}
                            intermediarySetVideoVolumePercentage={
                                intermediarySetVideoVolumePercentage
                            }
                        />
                        <div className="font-play mx-4 flex gap-2 text-white">
                            <span>{videoProgressTime}</span>
                            <span> / </span>
                            <span>{videoDuration}</span>
                        </div>
                    </div>
                    <div className="flex h-full flex-row items-center">
                        <SettingsMenuOpenButton
                            isSettingsMenuVisible={isSettingsMenuVisible}
                            setIsSettingsMenuVisible={setIsSettingsMenuVisible}
                        />
                        <FullscreenButton
                            isVideoFullscreen={isVideoFullscreen}
                            setIsVideoFullscreen={setIsVideoFullscreen}
                        />
                    </div>
                </div>

                {isSettingsMenuVisible && <SettingsMenu />}
            </div>
        </div>
    );
}

export default Videoplayer;
