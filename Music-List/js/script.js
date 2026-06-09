const playlist = [
{    id: 0,
    title: "Mera Yaar",
    singer: "Javed Bashir",
    album: "mera yaar.jpg",
    music: "MeraYaar.mp3"
},
{    
    id: 1,
    title: "Mann Mera",
    singer: "Gajendra Verma",
    album: "Mannmera.jpg",
    music: "MannMera.mp3"
},
{    
    id: 2,
    title: "Aadat",
    singer: "Atif Aslam",
    album: "Aadat.jpg",
    music: "Aadat.mp3"
},
{
 id: 3,
    title: "Tum Tak",
    singer: "A.R.Rahman",
    album: "Tum-Tak.jpg",
    music: "TumTak.mp3"
},
{    
    id: 4,
    title: "Jo Tere Sang",
    singer: "Mustafa Zahid",
    album: "JoTereSang.jpg",
    music: "JoTereSang.mp3"
},
{    
    id: 5,
    title: "Kun Faya Kun",
    singer: "A.R. Rahman",
    album: "Rockstar.jpg",
    music: "KunFaaya.mp3"
},
{    
    id: 6,
    title: "Labon Ko",
    singer: "KK",
    album: "Bhool.jpg",
    music: "Labonko.mp3"
},
{    
    id: 7,
    title: "Pehli Nazar Mein",
    singer: "Atif Aslam",
    album: "PehliNazar.jpg",
    music: "PehliNazar.mp3"
},
{    
    id: 8,
    title: "Tere Liye",
    singer: "Atif Aslam",
    album: "Prince.jpg",
    music: "TereLiyePrince.mp3"
},
{    
    id: 9,
    title: "Tu Hai",
    singer: "A.R. Rahman",
    album: "Roy.jpg",
    music: "TuHai.mp3"
},
{    
    id: 10,
    title: "Barso Re",
    singer: "Shreya Ghoshal",
    album: "Guru.jpg",
    music: "BarsoRe.mp3"
}
];

window.addEventListener("load", () => {
    let savedTime = localStorage.getItem("currentTime");
    let savedIndex = localStorage.getItem("currentSongIndex");
    if (savedIndex !== null) {
        i = parseInt(savedIndex);
    }
   loadSong();
   audio.addEventListener("loadedmetadata", () => {
     timeofSong();
     let savedTime = localStorage.getItem("currentTime");
     if (savedTime !== null) {
        audio.currentTime = parseFloat(savedTime);
    }
});
});
const album=document.querySelector("#album");
const audio=document.querySelector("#audio");
// console.dir(audio);
// Property	Use
// src	         Set audio file
// currentTime	 Get/set current time (in seconds)
// duration	     Total length of audio
// paused	     Check if audio is paused (true/false)
// volume	     Volume (0 to 1)
// muted	     Mute/unmute
// loop	         Repeat audio
// playbackRate	 Speed (1 = normal, 2 = fast)

// method 

// Method	        Use
// play()	        Start audio
// pause()	        Pause audio
// load()	        Reload audio
// canPlayType()	Check supported format
const title=document.querySelector("#title");
const singer=document.querySelector("#singer")
const playpausebtn=document.querySelector("#playpausebtn");
const progress=document.querySelector("#progress");
const shuffle=document.querySelector("#shuffle i");
const repeat=document.querySelector("#repeatBtn i") 
const heart=document.querySelector("#heart i") 
const initial=document.querySelector("#initial");  
const final=document.querySelector("#final");  
let i=0;
let isShuffle =false;
let lastSaved = 0;
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function timeofSong(){
  let current=audio.currentTime;
    let cminutes = Math.floor(current / 60);
let cseconds = Math.floor(current % 60);
   let duration = audio.duration;
   let minutes = Math.floor(duration / 60);
let seconds = Math.floor(duration % 60);
  cseconds = cseconds < 10 ? "0" + cseconds : cseconds;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  cminutes = cminutes < 10 ? "0" + cminutes : cminutes;
  minutes = minutes < 10 ? "0" + minutes : minutes;

initial.textContent=`${cminutes}:${cseconds}`;
final.textContent=`${minutes}:${seconds}`;

}

function autoPlayIfPlaying() {
    let icon = document.querySelector("#playpausebtn i");
    if (icon.classList.contains("fa-pause")) {
        audio.play();
    }
}



function loadSong(){
album.src="img/"+playlist[i].album;
audio.src="audio/"+playlist[i].music;
title.innerHTML=playlist[i].title;
singer.innerHTML=playlist[i].singer;
 updateHeartIcon(); 
}


function playpause(){
 if(audio.paused){
    audio.play();
    playpausebtn.innerHTML='<i class="fa-solid fa-pause"></i>'
 }
else{
    audio.pause();
    playpausebtn.innerHTML='<i class="fa-solid fa-play"></i>'
}
}
function prevSong(){
 if (isShuffle) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * playlist.length);
        } while (randomIndex === i);
        i = randomIndex;
    }
else{
i--;
if(i<0){
    i=playlist.length-1;
}
}
localStorage.setItem("currentTime", 0);
loadSong();
  autoPlayIfPlaying();
}
// timeupdate 
audio.addEventListener("timeupdate", () => {
    if (!isNaN(audio.duration)){
    timeofSong();
    let current = Math.floor(audio.currentTime);
    if (current !== lastSaved) {
        lastSaved = current;
        localStorage.setItem("currentTime", current);
        localStorage.setItem("currentSongIndex", i);
    }
        progress.value = (audio.currentTime / audio.duration) * 100;
    }
});
// progress update
progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});
// next song
audio.addEventListener("ended", () => {
    nextSong();
});
// shuffle and nextSong 
function nextSong() {
    if (isShuffle) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * playlist.length);
        } while (randomIndex === i);
        i = randomIndex;
    } else {
        i++;
        if (i === playlist.length) {
            i = 0;
        }
    }
    localStorage.setItem("currentTime", 0);
    loadSong();
  autoPlayIfPlaying();    
}
// repeat  
function repeatClick() {
    repeat.classList.toggle("repeat-all");
    repeat.classList.toggle("repeat-off");
    if (repeat.classList.contains("repeat-all")) {
        audio.loop = true;   
    } else {
        audio.loop = false;  
    }
}
// shuffle

function shuffleClick() {
    shuffle.classList.toggle("shuffle-on");
    shuffle.classList.toggle("shuffle-off");

    isShuffle = shuffle.classList.contains("shuffle-on");
}
// volume
function volumeClick() {
    let icon = document.querySelector("#volume i");
    if (icon.classList.contains("fa-volume-high")) {
        icon.classList.remove("fa-volume-high");
        icon.classList.add("fa-volume-off");
        audio.muted = true;
    } else {
        icon.classList.remove("fa-volume-off");
        icon.classList.add("fa-volume-high");
        audio.muted = false;
    }
}
// heart click
function heartClick(){
heart.classList.toggle("fa-regular");
heart.classList.toggle("fa-solid");
}
// wishlist 

function heartClick() {
    let songId = playlist[i].id;
    let icon = document.getElementById("heartIcon");

    if (wishlist.includes(songId)) {
   
        wishlist = wishlist.filter(id => id !== songId);

        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");
    } else {
        wishlist.push(songId);
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}
function updateHeartIcon() {
    let songId = playlist[i].id;
    let icon = document.getElementById("heartIcon");
    if (wishlist.includes(songId)) {
        icon.classList.add("fa-solid");
        icon.classList.remove("fa-regular");
    } else {
        icon.classList.add("fa-regular");
        icon.classList.remove("fa-solid");
    }
}
// list show 
function showList(){   
   let list = document.querySelector(".listitems");
   list.innerHTML = "";
   playlist.forEach((song,index)=>{
      let li = document.createElement("li");
      li.classList.add("space-bottom");
      li.innerHTML = `
        <img src="img/${song.album}" width="40" height="40">
        <span>${song.title}</span>
      `;
    li.addEventListener("click", function(){
   document.querySelectorAll(".listitems li").forEach(el => el.classList.remove("active-song"));
   li.classList.add("active-song");

   playSong(index);
   closeOffcanvas();
});
      list.appendChild(li);
   });
}


function closeOffcanvas() {
  const offcanvasEl = document.getElementById("leftCanvas");
  const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl)
                     || new bootstrap.Offcanvas(offcanvasEl);

  setTimeout(() => bsOffcanvas.hide(), 100); // smooth feel
}

function rightcloseOffcanvas() {
  const offcanvasEl = document.getElementById("rightCanvas");
  const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl)
                     || new bootstrap.Offcanvas(offcanvasEl);

  setTimeout(() => bsOffcanvas.hide(), 100); // smooth feel
}

// wishlist
function wishshowList(){   
   let list = document.querySelector(".listitems-right");
   list.innerHTML = "";
   wishlist.forEach((song, index) => {
      let li = document.createElement("li");
      li.classList.add("space-bottom");
      li.innerHTML = `
        <img src="img/${playlist[song].album}" width="40" height="40">
        <span>${playlist[song].title}</span>
      `;
      li.addEventListener("click", function(){
         playSong(song);
         rightcloseOffcanvas();
      });
      list.appendChild(li);
   });
}



function playSong(index){
   i = index;  
   localStorage.setItem("currentTime", 0);
    audio.currentTime = 0; 
   audio.src = "audio/" + playlist[index].music;
   loadSong(); 
   audio.play();
   playpausebtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

