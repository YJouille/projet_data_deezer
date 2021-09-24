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
const slider = document.querySelector('.carousel');
console.log(slider)
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
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 3; //scroll-fast
  slider.scrollLeft = scrollLeft - walk/2;
  console.log(walk);
});
