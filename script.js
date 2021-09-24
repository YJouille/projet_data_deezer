let kind=document.getElementById("kind");

const url = "https://cors-anywhere.herokuapp.com/https://api.deezer.com/genre";
let requete = new XMLHttpRequest();
requete.open("GET", url);
requete.responseType ="json";
requete.send();
requete.onload = function(){
    if(requete.readyState === XMLHttpRequest.DONE){
        if(requete.status === 200){
            let reponse = requete.response;
            console.log(reponse);
            for (let i=0;i<reponse.length;i++) {


                // let article = document.createElement("div");
                // let title = document.createElement("h2");
                // let content = document.createElement("p");
                // article.className= "col";
                // title.innerHTML=reponse[index].title;
                // content.innerHTML=reponse[index].body;
                // article.appendChild(title);
                // article.appendChild(content);
                // document.getElementById("articles").appendChild(article);
            }
        } else {
            alert ("Un problème est survenu merci de revenir plus tard");
        }
    }
} 