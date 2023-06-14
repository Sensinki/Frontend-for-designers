// LOCAL STORAGE
likedSongs = JSON.parse(localStorage.getItem('likedHearts')) || [];

// Create HTML elements for each liked song
const likedSongsList = document.getElementById('likedSongsList');

likedSongs.forEach(song => {
  const listItem = document.createElement('li');
  const image = document.createElement('img');
  image.src = song.imageSrc; // Make sure the image source URL is set correctly
  const title = document.createElement('h2');
  title.textContent = song.title;
  const artist = document.createElement('h3');
  artist.textContent = song.artist;

  listItem.appendChild(image);
  listItem.appendChild(title);
  listItem.appendChild(artist);
  likedSongsList.appendChild(listItem);
});
