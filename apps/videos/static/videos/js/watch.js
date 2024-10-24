const videoPlayer = $("#video-player");
const video = videoPlayer.get(0);

// >>>> Play button >>>>
const playButton = $("#control-play-button");

function togglePlayButton() {
    playButton.children().each(function () {
        $(this).toggleClass("hidden");
    });
}

function togglePlay() {
    if (video.paused || video.ended) {
        video.play();
    } else {
        video.pause();
    }
}

playButton.on("click", togglePlay);
videoPlayer.on("click", togglePlay);
videoPlayer.on("play", togglePlayButton);
videoPlayer.on("pause", togglePlayButton);
// <<<< <<<<

// >>>> Volume >>>>

// <<<< <<<<

// >>>> Progress Bar >>>>
const progressBar = $("#control-progress-bar");
const progressBarLoaded = $("#control-progress-bar-loaded");
const progressBarWatched = $("#control-progress-bar-watched");

function handleProgressBar() {
    let progressPercentage = (video.currentTime / video.duration) * 100;
    progressBarWatched.css("width", `${progressPercentage}%`);
}

function scrub(event) {
    const scrubTime = (event.offsetX / progressBar.width()) * video.duration;
    video.currentTime = scrubTime;
}

videoPlayer.on("timeupdate", handleProgressBar);
progressBar.on("click", scrub);
let mousedown = false;
progressBar.on("mousedown", () => (mousedown = true));
progressBar.on("mousemove", (event) => mousedown && scrub(event));
progressBar.on("mouseup", () => (mousedown = false));
// <<<< <<<<
