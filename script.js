// kind music
const urlGenre = "https://api.deezer.com/genre";
let requeteGenre = new XMLHttpRequest();
requeteGenre.open("GET", urlGenre);
requeteGenre.responseType ="json";
requeteGenre.send();
requeteGenre.onload = function(){
    let carousel=document.querySelector(".carousel");

    if(requeteGenre.readyState === XMLHttpRequest.DONE){
        if(requeteGenre.status === 200){
            let reponse = requeteGenre.response;

            for (let i=1; i<reponse.data.length; i++) {
                let dataName=reponse.data[i].name;
                let dataPicture=reponse.data[i].picture;

                let item = document.createElement("div");
                item.className="item-kind";

                let img=document.createElement("img");
                img.className="img-kind";
                img.src=dataPicture;
                img.alt = dataName;
                item.appendChild(img);

                let title=document.createElement("p");
                title.className="title-kind";
                title.innerHTML=dataName;
                item.appendChild(title);
                
                carousel.appendChild(item);
            }
        }
        else {
            alert ("Un problème est survenu merci de revenir plus tard");
        }
    }
}

// podcast radio
const urlPodcast = "https://api.deezer.com/chart/podcast";
let requetePodcast = new XMLHttpRequest();
requetePodcast.open("GET", urlPodcast);
requetePodcast.responseType ="json";
requetePodcast.send();
requetePodcast.onload = function(){
    let carousel=document.querySelector("#podcast .carousel");

    if(requetePodcast.readyState === XMLHttpRequest.DONE){
        if(requetePodcast.status === 200){
            let reponse = requetePodcast.response;
            console.log(reponse)
            for (let x=0; x<reponse.podcasts.data.length; x++) {
                
                let dataPicture=reponse.podcasts.data[x].picture_medium;
                let dataDescription=reponse.podcasts.data[x].description;

                let itemPodcast=document.createElement("div");
                itemPodcast.className="item-podcast";

                let imgPodcast=document.createElement("img");
                imgPodcast.className="img-podcast";
                imgPodcast.src=dataPicture;
                imgPodcast.alt = reponse.podcasts.data[x].name;

                itemPodcast.appendChild(imgPodcast);

                let descriptionPodcast=document.createElement("p");
                descriptionPodcast.className="description-podcast";
                descriptionPodcast.innerHTML=dataDescription;
                itemPodcast.appendChild(descriptionPodcast);
                
                carousel.appendChild(itemPodcast);
            }
        }
        else {
            alert ("Un problème est survenu merci de revenir plus tard");
        }
    }
}

/*************** Top 10 tracks and top 10 albums ***************/
// Top 10 tracks and top 10 albums
// Declaration variables
const urlTracks = "https://api.deezer.com/chart/tracks";
const urlAlbums = "https://api.deezer.com/chart/albums";
let top10Tracks = document.getElementById("top-10-tracks");
let top10Albums = document.getElementById("top-10-albums");

//Declaration des fonctions
//Cette fonction génère la colonne Top10 tracks ou Top10 albums dans le DOM
function generateItem(number, imgSrc, titleMusic, titleArtist, duration, divParent, trackId) {
    let item = document.createElement("div");
    item.className = "item-music";

    item.addEventListener('click', function () {
        DZ.player.playTracks([trackId]);
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

//Cette fonction récupère l'objet json des top10 tracks
function getTop10Tracks(url) {
    let requete = new XMLHttpRequest();
    requete.open("GET", url);
    requete.responseType = "json";
    requete.send();

    requete.onload = function () {
        if (requete.readyState === 4 && requete.status === 200) {
            jsonResponse = requete.response;

            for (let i = 0; i < jsonResponse.tracks.data.length; i++) {
                let number = jsonResponse.tracks.data[i].position;
                let imgSrc = jsonResponse.tracks.data[i].artist.picture_small;
                let titleMusic = jsonResponse.tracks.data[i].title;
                let titleArtist = jsonResponse.tracks.data[i].artist.name;
                let duration = jsonResponse.tracks.data[i].duration;
                let trackId = jsonResponse.tracks.data[i].id;
                generateItem(number, imgSrc, titleMusic, titleArtist, duration, top10Tracks, trackId);
            }
        }
    };
}



//Cette fonction récupère l'objet json des top10 albums
function getTop10Albums(url) {
    let requete = new XMLHttpRequest();
    requete.open("GET", url);
    requete.responseType = "json";
    requete.send();

    requete.onload = function () {
        if (requete.readyState === 4 && requete.status === 200) {
            jsonResponse = requete.response;

            for (let i = 0; i < jsonResponse.albums.data.length; i++) {
                let number = jsonResponse.albums.data[i].position;
                let imgSrc = jsonResponse.albums.data[i].cover_small;
                let titleMusic = jsonResponse.albums.data[i].title;
                let titleArtist = jsonResponse.albums.data[i].artist.name;
                let duration = jsonResponse.albums.data[i].duration;
                generateItem(number, imgSrc, titleMusic, titleArtist, duration, top10Albums);
                
            }
        }
    };
}
//Appel des fonctions
getTop10Tracks(urlTracks);
getTop10Albums(urlAlbums);
/*************** End Top 10 tracks and top 10 albums ***************/



/*************** Artist of the moment ***************/
const urlArtist = "https://api.deezer.com/chart/artists";
let artistOfMoment = document.getElementById("artist-of-moment");

//Declaration des fonctions
//Cette fonction génère l'artiste du moment dans le DOM
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
    titre.innerHTML = "Découvrez l'artiste du moment <br>"+artistName;
    
    playerArtist.appendChild(blueCircle);
    playerArtist.appendChild(titre);
    artistOfMoment.appendChild(playerArtist);
}

//Cette fonction récupère l'artist du moment
function getArtistOfMoment(url) {
    let requete = new XMLHttpRequest();
    requete.open("GET", url);
    requete.responseType = "json";
    requete.send();

    requete.onload = function () {
        if (requete.readyState === 4 && requete.status === 200) {
            jsonResponse = requete.response;

            let imgSrc = jsonResponse.artists.data[0].picture_big;
            let artistName = jsonResponse.artists.data[0].name;

            generateArtistOfMoment(imgSrc, artistName);
        }
    };
}
getArtistOfMoment(urlArtist);
/*************** End Artist of the moment ***************/

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
/*************** Top of playlists ***************/
//Declaration des variables
const urlPlaylist = "https://api.deezer.com/chart/playlists";
let playList = document.getElementById("playlist");
//Declaration des fonctions

//Cette fonction génère le top des playlists dans le DOM
function generateCarouselPlaylist(items){
    let carouselPlayList = document.createElement("div");
    carouselPlayList.className = "carousel";
    for (let item of items) {
        carouselPlayList.appendChild(item);
    }
    return carouselPlayList;
}

//Cette fonction génère un item du top des playlists dans le DOM
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

//Cette fonction récupère le top des playLists
function getPlayLists(url) {

    let items = new Array();
    let requete = new XMLHttpRequest();
    requete.open("GET", url);
    requete.responseType = "json";
    requete.send();

    requete.onload = function () {
        if (requete.readyState === 4 && requete.status === 200) {
            jsonResponse = requete.response;
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
        }
    };
}
getPlayLists(urlPlaylist);

/*************** End Top of playlists ***************/