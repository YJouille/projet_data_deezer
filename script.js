 // GESTION DES GENRES
 DZ.api('/genre', function (response) {
    //console.log(response);
   let carousel = document.querySelector("#kind .carousel");
   let reponse = response;
   console.log(reponse)

   for (let i = 1; i < reponse.data.length; i++) {
     let dataName = reponse.data[i].name;
     let dataPicture = reponse.data[i].picture;

     let item = document.createElement("div");
     item.className = "item-kind";

     let img = document.createElement("img");
     img.className = "img-kind";
     img.src = dataPicture;
     img.alt = dataName;
     item.appendChild(img);

     let title = document.createElement("p");
     title.className = "title-kind";
     title.innerHTML = dataName;
     item.appendChild(title);

     carousel.appendChild(item);
   }
 });


// podcast radio


DZ.api('/chart/0/podcasts', function (responsePoadcast) {
 let carousel=document.querySelector("#podcast .carousel");

 
         let reponse = responsePoadcast;
         console.log(reponse)
         for (let x=0; x<reponse.data.length; x++) {
             
             let dataPicture=reponse.data[x].picture_medium;
             let dataDescription=reponse.data[x].description;

             let itemPodcast=document.createElement("div");
             itemPodcast.className="item-podcast";

             let imgPodcast=document.createElement("img");
             imgPodcast.className="img-podcast";
             imgPodcast.src=dataPicture;
             imgPodcast.alt = reponse.data[x].name;

             itemPodcast.appendChild(imgPodcast);

             let descriptionPodcast=document.createElement("p");
             descriptionPodcast.className="description-podcast";
             descriptionPodcast.innerHTML=dataDescription;
             itemPodcast.appendChild(descriptionPodcast);
             
             carousel.appendChild(itemPodcast);
         }
     
    
 })


/*************** Artist of the moment ***************/
const urlArtist = "https://api.deezer.com/chart/artists";
let artistOfMoment = document.getElementById("artist-of-moment");

//Declaration des fonctions
//Cette fonction g??n??re l'artiste du moment dans le DOM
function generateArtistOfMoment(imgSrc, artistName) {

 artistOfMoment.style = "background : url("+imgSrc+") no-repeat center center; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover;background-size: cover;";
 let playerArtist = document.createElement("div");
 playerArtist.className = "player-artist";

 let blueCircle = document.createElement("div");
 blueCircle.className = "blue-circle";

 let imgPlay = document.createElement("img");
 imgPlay.className = "icon-play";
 imgPlay.src = "icons/play.svg";
 imgPlay.alt = "icon play-pause";

 blueCircle.appendChild(imgPlay);

 let titre = document.createElement("h2");
 titre.innerHTML = "D??couvrez l'artiste du moment <br>"+artistName;
 
 playerArtist.appendChild(blueCircle);
 playerArtist.appendChild(titre);
 artistOfMoment.appendChild(playerArtist);
}

//Cette fonction r??cup??re l'artist du moment
DZ.api('/chart/artists', function (responseArtiste) {

         jsonResponse = responseArtiste;

         let imgSrc = jsonResponse.artists.data[0].picture_big;
         let artistName = jsonResponse.artists.data[0].name;

         generateArtistOfMoment(imgSrc, artistName);
     
 
})
/*************** End Artist of the moment ***************/



/*************** Top 10 tracks and top 10 albums ***************/
// Top 10 tracks and top 10 albums
// Declaration variables

let top10Tracks = document.getElementById("top-10-tracks");
let top10Albums = document.getElementById("top-10-albums");

//Declaration des fonctions
//Cette fonction g??n??re la colonne Top10 tracks ou Top10 albums dans le DOM
function generateItem(number, imgSrc, titleMusic, titleArtist, duration, divParent, trackId) {
 let item = document.createElement("div");
 item.className = "item-music";

 //Au click sur l'item, le player se lance 
 item.addEventListener('click', function () {
     DZ.player.playTracks([trackId]);
     let buttonPlay = document.getElementById("button-play");

     buttonPlay.src = "icons/pause.svg";
     buttonPlay.className = "icon-pause";

     //on ajoute l'item ?? la colonne description du player
     let descriptionPlayer = document.getElementById("desciption");
     descriptionPlayer.innerHTML = "";
     descriptionPlayer.appendChild(item.cloneNode(true));
 });

 let position = document.createElement("p");
 position.className = "number";
 (number < 10 ? number = "0" + number : number);
 position.innerHTML = number;
 item.appendChild(position);

 let img = document.createElement("img");
 img.className = "img-music";
 img.src = imgSrc;
 img.alt = "vignette top10";
 item.appendChild(img);

 let info = document.createElement("div");
 info.className = "info-music";
 
 let title = document.createElement("p");
 title.className = "title-music";
 title.innerHTML = titleMusic;
 info.appendChild(title);

 let artist = document.createElement("p");
 artist.className = "artist-music";
 artist.innerHTML = titleArtist;
 info.appendChild(artist);
 item.appendChild(info);


 if (!isNaN(duration)) {
     let durationElmt = document.createElement("p");
     durationElmt.className = "duration";
     // convert seconds into minutes:seconds
     let sec = duration % 60;
     let min = Math.floor(duration / 60);
     (sec < 10 ? sec = "0" + sec : sec);
     (min < 10 ? min = "0" + min : min);
     durationElmt.innerHTML = min + ":" + sec;
     item.appendChild(durationElmt);
 } else {
     let durationElmt = document.createElement("p");
     durationElmt.className = "duration";
     durationElmt.innerHTML = "00:00";
     durationElmt.style.opacity = 0;
     item.appendChild(durationElmt);
 }

 let line = document.createElement("div");
 line.className = "white-line";
 item.appendChild(line);

 divParent.appendChild(item);
}

//Cette fonction r??cup??re l'objet json des top10 tracks

DZ.api('/chart/tracks', function (responseTenTracks) {
console.log(responseTenTracks)
jsonResponse = responseTenTracks.tracks;
console.log(jsonResponse.data)
for (let i = 0; i < jsonResponse.data.length; i++) {
             let number = jsonResponse.data[i].position;
             let imgSrc = jsonResponse.data[i].artist.picture_small;
             let titleMusic = jsonResponse.data[i].title;
             let titleArtist = jsonResponse.data[i].artist.name;
             let duration = jsonResponse.data[i].duration;
             let trackId = jsonResponse.data[i].id;
             generateItem(number, imgSrc, titleMusic, titleArtist, duration, top10Tracks, trackId);
         }

})

// //Cette fonction r??cup??re l'objet json des top10 albums
DZ.api('/chart/albums', function (responseTenAlbums) {
jsonResponse = responseTenAlbums.albums;
console.log(jsonResponse.data)
for (let i = 0; i < jsonResponse.data.length; i++) {
             let number = jsonResponse.data[i].position;
             let imgSrc = jsonResponse.data[i].artist.picture_small;
             let titleMusic = jsonResponse.data[i].title;
             let titleArtist = jsonResponse.data[i].artist.name;
             let duration = jsonResponse.data[i].duration;
             let trackId = jsonResponse.data[i].id;
             generateItem(number, imgSrc, titleMusic, titleArtist, duration, top10Albums);
         }

})



/*************** Top of playlists ***************/
//Declaration des variables
let playList = document.getElementById("playlist");

//Cette fonction g??n??re le top des playlists dans le DOM
function generateCarouselPlaylist(items){
 let carouselPlayList = document.querySelector("#playlist .carousel");
 for (let item of items) {
     carouselPlayList.appendChild(item);
 }
 return carouselPlayList;
}

//Cette fonction g??n??re un item du top des playlists dans le DOM
function generateTopPlayItem(imgSrc, title) {
 let itemPlayList = document.createElement("div");
 itemPlayList.className = "item-kind";
 
 let imgPlayList = document.createElement("img");
 imgPlayList.className = "img-kind";
 imgPlayList.src = imgSrc;
 imgPlayList.alt = "image play list";

 let titlePlaylist = document.createElement("p");
 titlePlaylist.className = "title-kind";
 titlePlaylist.innerHTML = title;
 
 itemPlayList.appendChild(imgPlayList);
 itemPlayList.appendChild(titlePlaylist);
 console.log("item : "+imgPlayList);
 return itemPlayList;    
}

//Cette fonction r??cup??re le top des playLists
function getPlayLists() {
let items = new Array();


 DZ.api('/chart/playlists', function (responsePlaylist) {
     
         jsonResponse = responsePlaylist;
         console.log("reponse", jsonResponse);

         let carouselPlayList = document.createElement("div");
         carouselPlayList.className = "carousel";

         for (let i = 0; i < jsonResponse.playlists.data.length; i++) {
             let imgSrc = jsonResponse.playlists.data[i].picture_medium;
             let title = jsonResponse.playlists.data[i].title;
            
             // console.log("title top playlists ", title);
             // console.log("src image top playlists", imgSrc);

            items.push(generateTopPlayItem(imgSrc, title));
         }
         playList.appendChild(generateCarouselPlaylist(items));                        
     
 });
}
getPlayLists();


//  Fonctionnalit??s slider
const sliderList = document.querySelectorAll('.carousel');
for(slider of sliderList){
 oneSlider(slider)
}

function oneSlider(slider){
 let isDown = false;
 let startX;
 let scrollLeft;

 slider.addEventListener('mousedown', (e) => {
     isDown = true;
     slider.classList.add('active');
     startX = e.pageX - slider.offsetLeft;
     scrollLeft = slider.scrollLeft;
 });
 slider.addEventListener('mouseleave', () => {
     isDown = false;
     slider.classList.remove('active');
 });
 slider.addEventListener('mouseup', () => {
     isDown = false;
     slider.classList.remove('active');
 });
 slider.addEventListener('mousemove', (e) => {
     if (!isDown) return;
     e.preventDefault();
     const x = e.pageX - slider.offsetLeft;
     const walk = (x - startX) * 3; //scroll-fast
     slider.scrollLeft = scrollLeft - walk / 2;
 });

}

let buttonPlay = document.getElementById("button-play");
buttonPlay.addEventListener('click', function () {
 if(!DZ.player.isPlaying()) {
     DZ.player.play();
     buttonPlay.className = "icon-pause";
     buttonPlay.src = "icons/pause.svg";
 } else {
     DZ.player.pause();
     buttonPlay.className = "icon-play";
     buttonPlay.src = "icons/play.svg";
 }
});