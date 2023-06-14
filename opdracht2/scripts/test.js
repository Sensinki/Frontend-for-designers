// JavaScript Document
console.log("hi there");

// check for heart (liking)
// https://codepen.io/sensinki/pen/PoxodYR
// HEART LIKING IF WE CLICKED ON IT


// TO SHOW THE LIKED SONGS IN THE PLAYLIST.HTML 
// Wait for the document to load
document.addEventListener('DOMContentLoaded', function() {
  // Get all the like hearts on the page
  const likeHearts = document.querySelectorAll('.like');

  // Add event listeners to each like heart
  likeHearts.forEach(function(heart) {
    heart.addEventListener('click', function() {
      // Toggle the liked state of the heart
      heart.classList.toggle('liked');

      // Get the song information
      const songTitle = heart.parentNode.querySelector('h2').innerText;
      const artistName = heart.parentNode.querySelector('h3').innerText;

      // Store the liked song information in localStorage
      const likedSong = {
        title: songTitle,
        artist: artistName
      };

      // Check if liked songs exist in localStorage
      let likedSongs = localStorage.getItem('likedSongs');
      if (!likedSongs) {
        // If no liked songs exist, create a new array and add the current song
        likedSongs = [likedSong];
      } else {
        // If liked songs exist, parse the JSON data and add the current song
        likedSongs = JSON.parse(likedSongs);
        likedSongs.push(likedSong);
      }

      // Store the updated liked songs in localStorage
      localStorage.setItem('likedSongs', JSON.stringify(likedSongs));
    });
  });
});
