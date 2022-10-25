const video_frame = document.querySelector(".video-frame");
const watch = new Watch(video_frame, {
  threshold: 0.75,
});

watch
  .inView(() => {
    video_frame.classList.remove("sticky");
  })
  .outView(() => {
    video_frame.classList.add("sticky");
  });
