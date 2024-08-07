console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let song_img = document.getElementById('song-img');
let currentTimeDisplay = document.getElementById('current_time');
let durationTimeDisplay = document.getElementById('duration_time'); // Added this to display duration
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

// List of songs
const songs = [
    { songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Rabba - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/6.jpg" },

];

const songsContainer = document.getElementById('songsContainer');

songs.forEach((song, index) => {
    // Create song item div
    const songItem = document.createElement('div');
    songItem.className = 'songItem';

    // Create and append song image
    const img = document.createElement('img');
    img.className = 'img';
    img.src = song.coverPath;
    img.alt = song.songName;
    songItem.appendChild(img);

    // Create and append song name
    const songName = document.createElement('span');
    songName.className = 'songName';
    songName.textContent = song.songName;
    songItem.appendChild(songName);

    // Create and append play icon with timestamp
    const songListPlay = document.createElement('span');
    songListPlay.className = 'songlistplay';
    const timestamp = document.createElement('span');
    timestamp.className = 'timestamp';
    timestamp.id = `timestamp-${index}`; // Set unique ID for timestamp
    timestamp.textContent = 'Loading...'; // Placeholder text
    const playIcon = document.createElement('i');
    playIcon.id = index;
    playIcon.className = 'far fa-play-circle';
    timestamp.appendChild(playIcon);
    songListPlay.appendChild(timestamp);
    songItem.appendChild(songListPlay);

    // Append song item to container
    songsContainer.appendChild(songItem);

    // Create audio element to get duration
    const audio = new Audio(song.filePath);
    audio.addEventListener('loadedmetadata', () => {
        // Format duration and update timestamp text
        const duration = audio.duration;
        const formattedDuration = formatTime(duration);
        timestamp.textContent = formattedDuration;
    });
});

// Function to format time in MM:SS format
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Handle play / pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        playPauseIcon.src = 'pause.svg';
    } else {
        audioElement.pause();
        playPauseIcon.src = 'play.svg';
    }
});

// Listen to Events
// Update progress bar and current time as the audio plays
audioElement.addEventListener('timeupdate', () => {
    const currentTime = audioElement.currentTime;
    currentTimeDisplay.innerHTML = formatTime(currentTime);

    const progress = (currentTime / audioElement.duration) * 100;
    myProgressBar.value = progress;
    myProgressBar.style.setProperty('width', `${progress}%`);
});

// Display duration once metadata is loaded
audioElement.addEventListener('loadedmetadata', () => {
    const duration = audioElement.duration;
    durationTimeDisplay.innerHTML = formatTime(duration);
});

// Handle seeking through the audio
myProgressBar.addEventListener('input', () => {
    const newTime = myProgressBar.value * audioElement.duration / 100;
    audioElement.currentTime = newTime;
});

// Make all play icons revert to play state
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Add event listeners to song play icons
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        song_img.src = songs[songIndex].coverPath;
        audioElement.currentTime = 0;
        audioElement.play();
        playPauseIcon.src = 'pause.svg';
    });
});

// Handle next song
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    song_img.src = songs[songIndex].coverPath;
    audioElement.currentTime = 0;
    audioElement.play();
    playPauseIcon.src = 'pause.svg';
});

// Handle previous song
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    song_img.src = songs[songIndex].coverPath;
    audioElement.currentTime = 0;
    audioElement.play();
    playPauseIcon.src = 'pause.svg';
});
