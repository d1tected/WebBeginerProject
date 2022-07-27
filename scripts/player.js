// let player;
// console.log(player);
// const playerContainer = $(".player");
// const playpaused = $(".player__start");

// let eventsInit = () => {
//   $(".player__start").click(e => {
//     e.preventDefault();

//     const btn = $(e.currentTarget);
  
//     if (playerContainer.hasClass("paused")) {
//       player.pauseVideo();
//     } else {
//       player.playVideo();
//     }
//   });

//   $(".player__playback").click(e => {
//     const bar = $(e.currentTarget);
//     const clickedPosition = e.originalEvent.layerX;
    
//     const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
//     const newPlaybackPositionSec =
//       (player.getDuration() / 100) * newButtonPositionPercent;
    
//     $(".player__playback-button").css({
//       left: `${newButtonPositionPercent}%`
//     });
    
//     player.seekTo(newPlaybackPositionSec);
//    });

//    $(".player__splash").click(e => {
//     player.playVideo();
//   })

// };

// const formatTime = timeSec => {
//   const roundTime = Math.round(timeSec);
  
//   const minutes = addZero(Math.floor(roundTime / 60));
//   const seconds = addZero(roundTime - minutes * 60);
  
//   function addZero(num) {
//     return num < 10 ? `0${num}` : num;
//   }
  
//   return `${minutes} : ${seconds}`;
//  };

//  const onPlayerReady = () => {
//   let interval;
//   const durationSec = player.getDuration();
  
//   $(".player__duration-estimate").text(formatTime(durationSec));
  
//   if (typeof interval !== "undefined") {
//     clearInterval(interval);
//   }
  
//   interval = setInterval(() => {
//     const completedSec = player.getCurrentTime();
//     const completedPercent = (completedSec / durationSec) * 100;
  
//     $(".player__playback-button").css({
//       left: `${completedPercent}%`
//     });
   
//     $(".player__duration-completed").text(formatTime(completedSec));
//   }, 1000);
//  };


//  const onPlayerStateChange = event => {
//   /*
//     -1 (воспроизведение видео не начато)
//     0 (воспроизведение видео завершено)
//     1 (воспроизведение)
//     2 (пауза)
//     3 (буферизация)
//     5 (видео подают реплики).
//   */
//   switch (event.data) {
//     case 1:
//       playerContainer.addClass("active");
//       playerContainer.addClass("paused");
//       playpaused.addClass("player__start--paused");
//       break;
  
//     case 2:
//       playerContainer.removeClass("active");
//       playerContainer.removeClass("paused");
//       playpaused.removeClass("player__start--paused");

//       break;
//   }
//  };


// function onYouTubeIframeAPIReady() {
//   player = new YT.Player("yt-player", {
//     height: "100%",
//     width: "100%",
//     videoId: "glV3pmNJV8c",
//     events: {
//       onReady: onPlayerReady,
//       onStateChange: onPlayerStateChange,
      
//     },
//     playerVars: {
//       controls: 0,
//       disablekb: 1,
//       showinfo: 0,
//       rel: 0,
//       autoplay: 0,
//       modestbranding: 0
//     }

//   });
  
// }


//  eventsInit();
////////////////////////////////////
const playBtn = document.querySelector(".player-section__player-img");
const video = document.getElementById('player');
const PlayerPlayBtn = document.querySelector('.duration__img');
const durationControl = document.getElementById('durationLevel');
const soundControl = document.getElementById('micLevel');
let soundBtn = document.querySelector('.sound');
const dynamicBtn = document.getElementById('dynamic');
let soundLevel;
let intervalId;

video.addEventListener('loadeddata', function () {
  video.addEventListener('click', playStop);

  let playButtons = document.querySelectorAll('.play');

  for (let i = 0; i < playButtons.length; i++) {
    playButtons[i].addEventListener('click', playStop);
  }

  durationControl.min = 0;
  durationControl.value = 0;
  durationControl.max = video.duration;
  durationControl.addEventListener('input', setVideoDuration);

  soundControl.min = 0;
  soundControl.value = soundControl.max;
  soundControl.max = 10;
  soundControl.addEventListener('input', changeSoundVolume);

  dynamicBtn.addEventListener('click', soundMute);

  video.addEventListener('ended', () => {
    playBtn.classList.toggle('player-section__player-img--active');
    playBtn.classList.remove('active');
    video.currentTime = 0;

  })
});

function playStop() {
  playBtn.classList.toggle('player-section__player-img--active');
  PlayerPlayBtn.classList.toggle('active');

  if (video.paused) {
    video.play();
    intervalId = setInterval(updateDuration, 1000 / 60);
  } else {
    clearInterval(intervalId);
    video.pause();
  }
}

function setVideoDuration () {
  video.currentTime = durationControl.value;
  updateDuration();
}

function updateDuration() {
  durationControl.value = video.currentTime;
  let step = video.duration / 100;
  let percent = video.currentTime / step;
  durationControl.style.background = `linear-gradient(90deg, #ff0000 0%, #ff0000 ${percent}%, #626262 ${percent}%)`;
}

function changeSoundVolume() {
  video.volume = soundControl.value / 10;
  if (video.volume === 0) {
    soundBtn.classList.add('active');
  } else {
    soundBtn.classList.remove('active');
  }
}

function soundMute() {
  if (video.volume === 0) {
    video.value = soundLevel;
    soundControl.value = soundLevel * 10;
    soundBtn.classList.remove('active');
  } else {
    soundLevel = video.value;
    video.volume = 0
    soundControl.value = 0;
    soundBtn.classList.add('active');
  }
}