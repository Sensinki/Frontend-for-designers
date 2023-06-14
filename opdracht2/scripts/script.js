
// HEART FEEDBACK FOR USER
document.addEventListener('DOMContentLoaded', function() {
  const likeHearts = document.querySelectorAll('.like');
  
  likeHearts.forEach(function(heart) {
    heart.addEventListener('click', function() {
      heart.classList.toggle('liked');
      
      if (heart.classList.contains('liked')) {
        heart.setAttribute('src', 'images/heart-filled.png');
        heart.setAttribute('alt', 'heart-filled');
      } else {
        heart.setAttribute('src', 'images/heart.png');
        heart.setAttribute('alt', 'heart');
      }
      
      const songTitle = heart.parentNode.querySelector('h2').innerText;
      const artistName = heart.parentNode.querySelector('h3').innerText;
      
      let likedSongs = localStorage.getItem('likedSongs');
      if (!likedSongs) {
        likedSongs = [songTitle];
      } else {
        likedSongs = JSON.parse(likedSongs);
        likedSongs.push(songTitle);
      }
      
      localStorage.setItem('likedSongs', JSON.stringify(likedSongs));
    });
  });
});



// LOCAL STORAGE
let likedSongs = [];

function handleLike(event) {
  const likeButton = event.target;

  // Check if the parent LI element exists
  const listItem = likeButton.closest('li');
  if (!listItem) {
    return; // Exit the function if the parent LI element doesn't exist
  }

  // Retrieve the song information
  const imageSrc = listItem.querySelector('img').src;
  const title = listItem.querySelector('h2').textContent;
  const artist = listItem.querySelector('h3').textContent;

  // Create an object with the song information
  const song = {
    imageSrc: imageSrc,
    title: title,
    artist: artist
  };

  // Add the liked song to the array in local storage
  likedSongs.push(song);
  localStorage.setItem('likedHearts', JSON.stringify(likedSongs));
}

// Add event listeners to all like buttons
const likeButtons = document.querySelectorAll('.like');
likeButtons.forEach(button => {
  button.addEventListener('click', handleLike);
});


