// HEART FEEDBACK FOR USER
document.addEventListener("DOMContentLoaded", function () {
    const likeHearts = document.querySelectorAll(".like");

    likeHearts.forEach(function (heart) {
        heart.addEventListener("click", function () {
            heart.classList.toggle("liked");

            if (heart.classList.contains("liked")) {
                heart.setAttribute("src", "images/heart-filled.png");
                heart.setAttribute("alt", "heart-filled");
            } else {
                heart.setAttribute("src", "images/heart.png");
                heart.setAttribute("alt", "heart");
            }

            const songTitle = heart.parentNode.querySelector("h2").innerText;
            const artistName = heart.parentNode.querySelector("h3").innerText;

            let likedSongs = localStorage.getItem("likedSongs");
            if (!likedSongs) {
                likedSongs = [songTitle];
            } else {
                likedSongs = JSON.parse(likedSongs);
                likedSongs.push(songTitle);
            }

            localStorage.setItem("likedSongs", JSON.stringify(likedSongs));
        });
    });
});

// LOCAL STORAGE
let likedSongs = [];

function handleLike(event) {
    const likeButton = event.target;

    const listItem = likeButton.closest("li");
    if (!listItem) {
        return;
    }

    const imageSrc = listItem.querySelector("img").src;
    const title = listItem.querySelector("h2").textContent;
    const artist = listItem.querySelector("h3").textContent;

    const song = {
        imageSrc: imageSrc,
        title: title,
        artist: artist,
    };

    likedSongs.push(song);
    localStorage.setItem("likedHearts", JSON.stringify(likedSongs));
}

const likeButtons = document.querySelectorAll(".like");
likeButtons.forEach((button) => {
    button.addEventListener("click", handleLike);
});

// KEYBOARD
// scroll -> down-up
const mainElement = document.querySelector("main");

mainElement.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
        // up
        mainElement.scrollTop -= 50;
        event.preventDefault();
    } else if (event.key === "ArrowDown") {
        // down
        mainElement.scrollTop += 50;
        event.preventDefault();
    }
});

// scroll -> right-left
const sortButtons = document.querySelectorAll("#sortingOptions button");
let activeButtonIndex = 0;

sortButtons[activeButtonIndex].focus();

function handleButtonNavigation(event) {
    const key = event.key;

    if (key === "ArrowRight" && activeButtonIndex < sortButtons.length - 1) {
        // right
        activeButtonIndex++;
        sortButtons[activeButtonIndex].focus();
    } else if (key === "ArrowLeft" && activeButtonIndex > 0) {
        // left
        activeButtonIndex--;
        sortButtons[activeButtonIndex].focus();
    } else if (key === "Enter") {
        sortButtons[activeButtonIndex].click();
    }
}

document.addEventListener("keydown", handleButtonNavigation);
