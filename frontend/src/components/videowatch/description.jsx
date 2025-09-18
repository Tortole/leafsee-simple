/*
!!!
*/

import roundViewsCount from "services/roundViewsCount";

export default function Description({ video }) {
    /*
    !!!
    */

    return (
        <div className="flex w-full flex-col gap-1">
            <div className="font-play text-3xl font-bold">{video.title}</div>
            <div className="flex w-full flex-row gap-10">
                <div className="font-play text-lg">{`${roundViewsCount(video.views_count)} views`}</div>
                <div className="flex flex-row gap-2">
                    <div className="font-play text-lg">{video.upload_date.split("T")[0]}</div>
                    <span> · </span>
                    <div className="font-play text-lg">{`${video.timesince.split(",")[0]} ago`}</div>
                </div>
            </div>
        </div>
    );
}
