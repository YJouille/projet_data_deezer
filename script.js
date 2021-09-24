// Declaration variables

const url = "https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/tracks";
let top10Tracks = document.getElementById("top-10-tracks");

function generateItem(number,imgSrc,titleMusic, titleArtist, duration){
   let item = document.createElement("div");
   item.className = "item-music";

   let position = document.createElement("p");
   position.className = "number";
   (number<10?number="0"+number:number);
   position.innerHTML = number;
   item.appendChild(position);
   
   let img = document.createElement("img");
   img.className = "img-music";
   img.src = imgSrc;
   item.appendChild(img);

   let info = document.createElement("div");
   info.className = "info-music";
   let title = document.createElement("p");
   title.className = "title-music";
   title.innerHTML =titleMusic;
   info.appendChild(title);
   let artist = document.createElement("p");
   artist.className = "artist-music";
   artist.innerHTML = titleArtist;
   info.appendChild(artist);
   item.appendChild(info);

   let durationElmt = document.createElement("p");
   durationElmt.className = "duration";
   // convert seconds into minutes:seconds
   let sec = duration%60;
   let min = Math.floor(duration/60);
   (sec<10?sec="0"+sec:sec);
   (min<10?min="0"+min:min);
   durationElmt.innerHTML = min + ":" + sec;
   item.appendChild(durationElmt);

   let line = document.createElement("div");
   line.className = "white-line";
   item.appendChild(line);

   top10Tracks.appendChild(item);
}


function getTop10Tracks() {
    let requete = new XMLHttpRequest();
    requete.open("GET", url);
    requete.responseType = "json";
    requete.send();

    requete.onload = function () {
        if (requete.readyState === 4 && requete.status === 200) {
           jsonResponse = requete.response;
            console.log("reponse", jsonResponse.tracks);
            console.log("longueur", jsonResponse.tracks.data.length);

            for (let i = 0; i < jsonResponse.tracks.data.length; i++) {
                let number = jsonResponse.tracks.data[i].position;
                let imgSrc = jsonResponse.tracks.data[i].artist.picture_small;
                let titleMusic = jsonResponse.tracks.data[i].title;
                let titleArtist = jsonResponse.tracks.data[i].artist.name;
                let duration = jsonResponse.tracks.data[i].duration;
                generateItem(number,imgSrc,titleMusic, titleArtist, duration);
            }
        }
    };
}

getTop10Tracks();