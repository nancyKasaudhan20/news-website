const API_KEY = "f5bf3cc6d7e740b0b2e384ab8ddcd3bc";
// This is the api key from newsapi.org and we can get some limited number of request (1000) from this key.
// copy get request
const url= "https://newsapi.org/v2/everything?q=";

// jab window load ho
window.addEventListener('load',()=> fetchNews("India") );

function reload(){
   window.location.reload();
}

async function fetchNews(query){   //fetch is asyncronous function 
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`); //string template that's why back tick
    const data = await res.json();
    bindData(data.articles);
}
function bindData(articles) {
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML=""; //PHELE EMPTY KARDO CARDS KO vrna sab article stack hota chalas jaega'

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone)
    })
}
function fillDataInCard(cardClone,article)
{
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
    const date = new Date(article.publishedAt).toLocaleString("en-US",{timeZone: "Asia/Jakarta"
});
newsSource.innerHTML= `${article.source.name} . ${date}`;

cardClone.firstElementChild.addEventListener("click", ()=> {
    window.open(article.url, "_blank");
});
}

let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');

}
const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');
searchButton.addEventListener('click',() =>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav= null;
})