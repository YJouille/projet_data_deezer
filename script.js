//Top 10 tracks
//Declaration variables

let top10Tracks = document.getElementById("top-10-tracks");
let jsonResponse;

const url = "https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/tracks";

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
                console.log("position", number);

                let imgSrc = jsonResponse.tracks.data[i].album.cover_small;
                console.log("image", imgSrc);

                let titleMusic = jsonResponse.tracks.data[i].title;
                console.log("title", titleMusic);
            }
        }
    };
}

getTop10Tracks();