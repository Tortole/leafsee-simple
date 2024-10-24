$(document).ready(function () {
    loadNewVideos();
});

function loadNewVideos() {
    $.ajax({
        data: $(this).serialize(),
        url: video_list_api_url,
        dataType: "json",
        success: function (videos) {
            displayNewVideos(videos);
        },
    });
}

function displayNewVideos(videos) {
    videos.forEach((video) => {
        videoBlockConstructorMain(video);
    });
}

// Endings for large numbers
var digits_names = {
    k: "K",
    m: "M",
    b: "B",
};

function roundViewsCount(views_count) {
    var views_count_str = views_count.toString();
    switch (views_count_str.length) {
        // ones
        case 1:
        // tens
        case 2:
        // hundreds
        case 3:
            return views_count_str;
        // ones of thousands
        case 4:
            return (
                views_count_str[0] +
                (views_count_str[1] ? "." + views_count_str[1] : "") +
                digits_names["k"]
            );
        // tens of thousands
        case 5:
            return views_count_str.substring(0, 2) + digits_names["k"];
        // hundreds of thousands
        case 6:
            return views_count_str.substring(0, 3) + digits_names["k"];
        // ones of millions
        case 7:
            return (
                views_count_str[0] +
                (views_count_str[1] ? "." + views_count_str[1] : "") +
                digits_names["m"]
            );
        case 8:
            // tens of millions
            return views_count_str.substring(0, 2) + digits_names["m"];
        case 9:
            // hundreds of millions
            return views_count_str.substring(0, 3) + digits_names["m"];
        case 10:
            // ones of billions
            return (
                views_count_str[0] +
                (views_count_str[1] ? "." + views_count_str[1] : "") +
                digits_names["b"]
            );
        case 11:
            // tens of billions
            return views_count_str.substring(0, 2) + digits_names["b"];
        case 12:
            // hundreds of billions
            return views_count_str.substring(0, 3) + digits_names["b"];
        // more than trillion
        default:
            return ">1T";
    }
}

function videoBlockConstructorMain(video) {
    let template = $("#video-block-template").clone();
    template.removeAttr("id");

    // Set video link
    template.attr("href", `${video_watch_url}\\${video.id}`);

    // Set author avatar
    template
        .find(".video-block-avatar")

        .attr("src", `${video.author_avatar}`);

    // Set video name
    template.find(".video-block-name").text(video.name);

    // Set channel link
    template
        .find(".video-block-link-channel")
        .attr("href", `${author_channel_url}\\${video.author}`);

    // Set author nickname
    template.find(".video-block-nickname").text(video.author_nickname);

    // Set author username
    template.find(".video-block-username").text(video.author_username);

    // Set video views
    template
        .find(".video-block-views")
        .text(
            roundViewsCount(video.views_count) + " " + video_block_views_text,
        );

    // Set video name
    template
        .find(".video-block-timesince")
        .text(video.timesince.split(",")[0] + " " + video_block_timesince_text);

    // Set upload date
    template.find(".video-block-date").text(video.upload_date.split("T")[0]);

    $("#video-blocks-panel").append(template);
}

function redirectWithHref(event) {
    event.preventDefault();
    let hrefLink = event.target.getAttribute("href");
    if (hrefLink) {
        window.location.href = hrefLink;
    } else {
        window.location.href = event.currentTarget.getAttribute("href");
    }
}
