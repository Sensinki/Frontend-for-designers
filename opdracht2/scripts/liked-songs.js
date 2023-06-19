// LOCAL STORAGE
// got help from chatGPT
document.addEventListener("DOMContentLoaded", function () {
    const likedSongsList = document.getElementById("likedSongsList");
    const likedSongs = JSON.parse(localStorage.getItem("likedHearts")) || [];

    likedSongs.forEach((song) => {
        const listItem = document.createElement("li");
        const image = document.createElement("img");
        image.src = song.imageSrc;
        const title = document.createElement("h2");
        title.textContent = song.title;
        const artist = document.createElement("h3");
        artist.textContent = song.artist;

        listItem.appendChild(image);
        listItem.appendChild(title);
        listItem.appendChild(artist);
        likedSongsList.appendChild(listItem);
    });

    // DRAG AND DROP
    Sortable.create(likedSongsList, {
        swapThreshold: 0.5,
        ghostClass: "sortableSong",
        dragClass: "sortableDrag",
        onEnd: function (event) {
            event.item.focus();
        },
    });

    // SORT
    // got help from Sanne's code
    function sortSongs(option) {
        const songItems = Array.from(likedSongsList.getElementsByTagName("li"));
        songItems.sort((a, b) => {
            const textA = a.querySelector("h2").textContent.toLowerCase();
            const textB = b.querySelector("h2").textContent.toLowerCase();

            if (option === "az") {
                return textA.localeCompare(textB);
            } else if (option === "za") {
                return textB.localeCompare(textA);
            } else if (option === "short") {
                return textA.length - textB.length;
            } else if (option === "long") {
                return textB.length - textA.length;
            }
        });

        songItems.forEach((item) => likedSongsList.appendChild(item));
    }

    function sortArtists(option) {
        const songItems = Array.from(likedSongsList.getElementsByTagName("li"));
        songItems.sort((a, b) => {
            const textA = a.querySelector("h3").textContent.toLowerCase();
            const textB = b.querySelector("h3").textContent.toLowerCase();

            if (option === "artistAz") {
                return textA.localeCompare(textB);
            } else if (option === "artistZa") {
                return textB.localeCompare(textA);
            } else if (option === "artistShort") {
                return textA.length - textB.length;
            } else if (option === "artistLong") {
                return textB.length - textA.length;
            }
        });

        songItems.forEach((item) => likedSongsList.appendChild(item));
    }

    document.getElementById("sortAZ").addEventListener("click", function () {
        sortSongs("az");
    });
    document.getElementById("sortZA").addEventListener("click", function () {
        sortSongs("za");
    });
    document.getElementById("sortShort").addEventListener("click", function () {
        sortSongs("short");
    });
    document.getElementById("sortLong").addEventListener("click", function () {
        sortSongs("long");
    });

    document.getElementById("AZ").addEventListener("click", function () {
        sortArtists("artistAz");
    });
    document.getElementById("ZA").addEventListener("click", function () {
        sortArtists("artistZa");
    });
    document.getElementById("Short").addEventListener("click", function () {
        sortArtists("artistShort");
    });
    document.getElementById("Long").addEventListener("click", function () {
        sortArtists("artistLong");
    });
});

// SEARCH
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", performSearch);

function performSearch() {
    const query = searchInput.value.trim().toLowerCase();
    const songItems = document.querySelectorAll("#likedSongsList li");

    songItems.forEach((songItem) => {
        const songName = songItem.querySelector("h2").textContent.toLowerCase();
        const artistName = songItem.querySelector("h3").textContent.toLowerCase();

        // got help from chatGPT
        if (songName.includes(query) || artistName.includes(query)) {
            songItem.style.display = "grid";
        } else {
            songItem.style.display = "none";
        }
    });
}
