/*
!!!
*/

import { useState } from "react";

import roundViewsCount from "services/roundViewsCount";

export default function Description({ video }) {
    /*
    !!!
    */

    const [isDescriptionCollapsed, setIsDescriptionCollapsed] = useState(true);

    return (
        <div className="flex w-full flex-col gap-4">
            {/* Video info */}
            <div className="flex w-full flex-col gap-1">
                <span className="font-play text-3xl font-bold">{video.title}</span>
                <div className="flex w-full flex-row gap-10">
                    <span className="font-play text-lg">{`${roundViewsCount(video.views_count)} views`}</span>
                    <div className="flex flex-row gap-2">
                        <span className="font-play text-lg">
                            {video.upload_date.split("T")[0]}
                        </span>
                        <span> · </span>
                        <span className="font-play text-lg">{`${video.timesince.split(",")[0]} ago`}</span>
                    </div>
                </div>
            </div>

            {/* Author info */}
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

            {/* Description */}
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
                        className="bg-green-l font-play clip-polygon-steep-[15px] hover:bg-green-l-hover active:bg-green-l-onclick h-max w-32 text-left text-center"
                        onClick={() => setIsDescriptionCollapsed((i) => !i)}
                    >
                        {isDescriptionCollapsed ? "Развернуть" : "Свернуть"}
                    </button>
                </div>
            </div>
        </div>
    );
}
