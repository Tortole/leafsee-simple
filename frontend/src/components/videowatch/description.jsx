/*
!!!
*/

import { useState } from "react";

import roundViewsCount from "services/roundViewsCount";

import Like from "static/svg/like_green_l.svg";
import LikeHollow from "static/svg/like_hollow_green_l.svg";

function VideoInfo({ video }) {
    /*
    !!!
    */

    return (
        <div className="flex w-full flex-col gap-1">
            <span className="font-play text-3xl font-bold">{video.title}</span>
            <div className="flex w-full flex-row gap-10">
                <span className="font-play text-lg">{`${roundViewsCount(video.views_count)} views`}</span>
                <div className="flex flex-row gap-2">
                    <span className="font-play text-lg">{video.upload_date.split("T")[0]}</span>
                    <span> · </span>
                    <span className="font-play text-lg">{`${video.timesince.split(",")[0]} ago`}</span>
                </div>
            </div>
        </div>
    );
}

function AuthorInfo({ video }) {
    /*
    !!!
    */

    return (
        <div className="flex flex-row gap-6">
            <a href="!!! href-to-author-chanell">
                <img
                    src={video.author_avatar}
                    className="clip-polygon-right-[33%] bg-gray-d size-16"
                />
            </a>
            <div className="flex flex-col justify-center">
                <a href="!!! href-to-author-chanell" className="font-play text-xl font-bold">
                    {video.author_nickname}
                </a>
                <div className="flex flex-row gap-7">
                    <a
                        href="!!! href-to-author-chanell"
                        className="font-play text-base opacity-70"
                    >
                        {video.author_username}
                    </a>
                    <span className="font-play text-base opacity-70">
                        {`${roundViewsCount(video.author_subscribers_count)} subscribers`}
                    </span>
                </div>
            </div>
        </div>
    );
}

function SubscribeButton() {
    /*
    !!!
    */

    const [isSubscribed, setIsSubscribed] = useState(false);

    return (
        <button
            className="bg-green-l font-play clip-polygon-steep-[15px] hover:bg-green-l-hover active:bg-green-l-onclick h-max w-52 p-[3px]"
            onClick={() => setIsSubscribed((i) => !i)}
        >
            <div
                className="clip-polygon-steep-[15px] h-full w-full text-center text-2xl"
                style={{ background: isSubscribed ? "white" : "" }}
            >
                {isSubscribed ? "Отписаться" : "Подписаться"}
            </div>
        </button>
    );
}

function LikesDislikes() {
    /*
    !!!
    */

    const [videoRating, setVideoRating] = useState(0);

    return (
        <div className="clip-polygon-steep-[15px] flex h-max w-max flex-row items-center gap-1 bg-white px-2 py-1">
            <button
                className="flex h-max w-max flex-row items-center gap-3 pr-3"
                onClick={() => setVideoRating((r) => (r <= 0 ? 1 : 0))}
            >
                <img className="w-7" src={videoRating == 1 ? Like : LikeHollow} />
                <span className="font-play text-sm">160K</span>
            </button>

            <div className="h-5 w-[1px] bg-black"></div>

            <button
                className="flex h-max w-max flex-row items-center gap-3 pl-3"
                onClick={() => setVideoRating((r) => (r >= 0 ? -1 : 0))}
            >
                <span className="font-play text-sm">2,5K</span>
                <img className="w-7 rotate-180" src={videoRating == -1 ? Like : LikeHollow} />
            </button>
        </div>
    );
}

function VideoTextDescription({ video }) {
    /*
    !!!
    */

    const [isDescriptionCollapsed, setIsDescriptionCollapsed] = useState(true);

    return (
        <div className="clip-polygon-right-[15px] mt-1 flex w-full flex-col gap-1 bg-white px-3 pb-3 pt-1">
            <span className="font-play text-sm opacity-70">
                {video.tags.map((tag) => `#${tag}`).join(" ")}
            </span>
            <span
                className="font-play w-full overflow-hidden whitespace-pre-line text-base"
                style={{ height: isDescriptionCollapsed ? "6rem" : "100%" }}
            >
                {`${video.description}`}
            </span>
            <div className="flex w-full justify-center">
                <button
                    className="bg-green-l font-play clip-polygon-steep-[15px] hover:bg-green-l-hover active:bg-green-l-onclick h-max w-32 text-center"
                    onClick={() => setIsDescriptionCollapsed((i) => !i)}
                >
                    {isDescriptionCollapsed ? "Развернуть" : "Свернуть"}
                </button>
            </div>
        </div>
    );
}

export default function Description({ video }) {
    /*
    !!!
    */

    return (
        <div className="flex w-full flex-col gap-4">
            <VideoInfo video={video} />
            <div className="flex w-full flex-row items-center justify-between">
                <div className="flex w-full flex-row items-center gap-8">
                    <AuthorInfo video={video} />
                    <SubscribeButton />
                </div>
                <LikesDislikes />
            </div>
            <VideoTextDescription video={video} />
        </div>
    );
}
