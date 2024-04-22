const videosSection = document.querySelector("section");
const loader = document.querySelector(".loader-box");
const youtubeBox = document.querySelector("#youtubeBox");

const baseSearchURL =
  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=";
const apiKey = "AIzaSyANU7T8EJTIpEDm1gBmXrGaOQYVhNU46GE";

setTimeout(getVideos, 2000);

function getVideos() {
  fetch(
    "https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=15&playlistId=UUi8e0iOVk1fEOogdfu4YgfA&key=AIzaSyANU7T8EJTIpEDm1gBmXrGaOQYVhNU46GE"
  )
    .then((res) => res.json())
    .then((data) => {
      youtubeBox.style.display = "grid";
      youtubeBox.style.gridTemplateColumns = "repeat(3, 1fr)";

      loader.style.display = "none";
      data.items.forEach((el) => {
        videosSection.innerHTML += `<a href="https://www.youtube.com/watch?v=${el.snippet.resourceId.videoId}" class="ytVideo" target="_blank">
        <img src="${el.snippet.thumbnails.maxres.url}" class="thumbnail" />
        <h3 id="title">${el.snippet.title}</h3>
        </a>`;
      });
    })
    .catch((err) => {
      // loader.style.display = 'none';
      console.log(err);
      videosSection.innerHTML = `<h3>Sorry something went wrong, try again later.</h3>`;
    });
}

// ..................................search bar.............................................//
const form = document.querySelector("#form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = document.querySelector("#search").value.trim() + "Offical Trailer";
  if (searchTerm) {
    loader.style.display = "block";
    searchVideos(searchTerm);
  } else {
    alert("Please enter a search term.");
  }
});

function searchVideos(query) {
  const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&type=video&key=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      youtubeBox.style.display = "grid";
      youtubeBox.style.gridTemplateColumns = "repeat(3, 1fr)";
      loader.style.display = "none";
      videosSection.innerHTML = ""; // Clear existing videos

      data.items.forEach((item) => {
        const videoId = item.id.videoId;
        const title = item.snippet.title;
        const thumbnailUrl = item.snippet.thumbnails.high.url;

        
        const videoHTML = `
                    <a href="https://www.youtube.com/watch?v=${videoId}" class="ytVideo" target="_blank">
                        <img src="${thumbnailUrl}" class="thumbnail" />
                        <h3 style= "color:black;">${title}</h3>
                    </a>
                `;
        videosSection.innerHTML += videoHTML;
      });
    })
    .catch((error) => {
      loader.style.display = "none";
      console.error("Error fetching videos:", error);
      videosSection.innerHTML =
        "<h3>Sorry, something went wrong. Please try again later.</h3>";
    });
}




// Check if the viewport width matches the media query condition
function applyMediaQuery() {
  if (window.matchMedia("(max-width: 820px)").matches) {
      // Applying the CSS styles
      document.querySelector('.BodyBox #youtubeBox').style.display = 'grid';
      document.querySelector('.BodyBox #youtubeBox').style.gridTemplateColumns = 'repeat(1, 1fr)';
      document.querySelector('.BodyBox').style.width = '100vw';
  } else {

   
      youtubeBox.style.gridTemplateColumns = "repeat(3, 1fr)";
      document.querySelector('.BodyBox').style.width = '97vw';
     
  }
}

// Call the function on page load and whenever the window size changes
window.addEventListener('load', applyMediaQuery);
window.addEventListener('resize', applyMediaQuery);




document.addEventListener("DOMContentLoaded", function() {
  const menuBtn = document.querySelector('.menu-btn');
  const navOpt = document.querySelector('.navOpt');
  const closeBtn = document.querySelector('.close-btn');

  menuBtn.addEventListener('click', function() {
    navOpt.classList.toggle('show');
    closeBtn.style.display = 'block';
  

  });
  closeBtn.addEventListener('click', function() {
    navOpt.classList.toggle('show');
    closeBtn.style.display = 'none';
  });
});






