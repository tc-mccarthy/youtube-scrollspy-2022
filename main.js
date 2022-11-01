const video_frame = document.querySelector(".video-frame");
const watch = new Watch(video_frame, {
  threshold: 0.75,
});
let player;

function onYouTubeIframeAPIReady() {
  const video_player = document.querySelector(".yt-player");
  const video_id = video_player.dataset.videoId;
  player = new YT.Player(video_player, {
    height: "390",
    width: "640",
    videoId: video_id,
    playerVars: {
      playsinline: 1,
    },
    events: {
      onStateChange: onPlayerStateChange,
    },
  });
}

function onPlayerStateChange(e) {
  if (e.data === YT.PlayerState.PLAYING) {
    video_frame.classList.add("can-stick");
  } else {
    video_frame.classList.remove("can-stick");
  }
}

watch
  .inView(() => {
    video_frame.classList.remove("sticky");
  })
  .outView(() => {
    video_frame.classList.add("sticky");
  });

/**
 * Uses the YT API to scrub to a certain point in the video
 * @param {String} timecode
 */
function goToChapter(timecode) {
  console.log(">> TIMECODE >>", timecode);
  timecode = timecode.split(":");
  const seconds =
    parseInt(timecode[0]) * 60 * 60 +
    parseInt(timecode[1]) * 60 +
    parseInt(timecode[2]);

  console.log(">> SECONDS >>", seconds);

  player.playVideo();
  player.seekTo(seconds, true);
}

/**
 * Find all of the chapter links and, for each of them, create the click bind that
 * fires the goToChapter function
 */
const chapters = document.querySelectorAll(".chapters li a");

chapters.forEach((chapter) => {
  const timecode = chapter.closest("li").dataset.timecode;
  chapter.addEventListener("click", function (e) {
    e.preventDefault();
    goToChapter(timecode);
  });
});
