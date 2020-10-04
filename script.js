const image = document.querySelector("img");
const title = document.querySelector("#title");
const artist = document.querySelector("#artist");
const music = document.querySelector("audio");
const currentTimeElement = document.querySelector("#current-time");
const durationElement = document.querySelector("#duration");
const progressContainer = document.querySelector("#progress-container");
const progress = document.querySelector("#progress");
const prevBtn = document.querySelector("#prev");
const playBtn = document.querySelector("#play");
const nextBtn = document.querySelector("#next");

//songs array
const songsArray = [
  {
    name: "Bellyache",
    title: "Bellyache",
    artist: "Billie Eilish",
  },

  {
    name: "DanceMonkey",
    title: "Dance Monkey",
    artist: "Tones and I",
  },

  {
    name: "Heaven",
    title: "Heaven",
    artist: "Julia Michaels",
  },

  {
    name: "HeyThereDelilah",
    title: "Hey There Delilah",
    artist: "Plain White T's",
  },

  {
    name: "HimAndI",
    title: "Him & I",
    artist: "G-Eazy & Halsey",
  },

  {
    name: "HowLong",
    title: "How Long",
    artist: "Charlie Puth",
  },

  {
    name: "Lovely",
    title: "Lovely",
    artist: "Billie Eilish",
  },

  {
    name: "RollingInTheDeep",
    title: "Rolling In The Deep",
    artist: "Adele",
  },

  {
    name: "WeDontTalkAnymore",
    title: "We Dont Talk Anymore",
    artist: "Charlie Puth",
  },
];

//check if playing
let isPlaying = false;

//Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.title = "pause";
  music.play();
}

//Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.title = "play";
  music.pause();
}

//Play or Pause Event Listener
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

//updata DOM
function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  music.src = `songs/${song.name}.mp3`;
  image.src = `images/${song.name}.jpg`;
}

//current song
let songIndex = 0;

//nextSong
function nextSong() {
  songIndex++;
  if (songIndex > songsArray.length - 1) {
    songIndex = 0;
  }
  loadSong(songsArray[songIndex]);
  playSong();
}

//prevSong
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songsArray.length - 1;
  }
  loadSong(songsArray[songIndex]);
  playSong();
}

//on load
loadSong(songsArray[songIndex]);

//update progress bar and time
function updateProgressBar(event) {
  if (isPlaying) {
    const { currentTime, duration } = event.srcElement;
    //update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    //calculating the duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (duration < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    //delay a bit so that the NaN doesnot flash while changing the songs, it's happening because math.floor is not done when it's setting
    if (durationSeconds) {
      durationElement.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    //calculating the currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeElement.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

//set progress bar
function setProgressBar(event) {
  const width = this.clientWidth;
  const clickX = event.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

//Event Listener
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
music.addEventListener("ended", nextSong);
progressContainer.addEventListener("click", setProgressBar);
