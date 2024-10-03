/* empty css                      */import{S as p,a as u,i as l}from"./assets/vendor-CRCB-GUD.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const m=document.querySelector(".search-input"),d=document.getElementById("gallery"),f=document.querySelector(".search-form"),y=new p(".gallery li > a",{captionsData:"alt",captionDelay:250}),g=document.getElementById("load-more");let a=1,c="";async function h(){const s=m.value.trim();let r;s!==""&&s!==c?(a=1,c=s,d.innerHTML="",r=document.getElementById("loader-container")):r=document.getElementById("loader-more-container");const n=`https://pixabay.com/api/?key=45978686-70839b27c443bdf6e9ef42e3a&q=${s}&image_type=photo&orientation=horizontal&safesearch=true&page=${a}&per_page=40`;try{r.classList.remove("hidden");const t=(await u.get(n)).data;t.hits.length===0?l.error({title:"",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}):(b(t.hits),g.classList.remove("hidden"),a++)}catch(e){l.error({title:"",message:`Sorry, ${e.message}! Please try again!`,position:"topRight"}),console.error(e)}finally{r.classList.add("hidden")}}function b(s){const r=s.map(o=>`
    <li class="card">
  <a href="${o.largeImageURL}">
    <img src="${o.webformatURL}" alt="${o.tags}" />
  </a>
  <div class="info">
    <p class="info-text"><b>Likes</b> ${o.likes}</p>
    <p class="info-text"><b>Views</b> ${o.views}</p>
    <p class="info-text"><b>Comments</b> ${o.comments}</p>
    <p class="info-text"><b>Downloads</b> ${o.downloads}</p>
  </div>
</li>
    
    `);d.innerHTML+=r.join(""),y.refresh()}f.addEventListener("submit",s=>{s.preventDefault(),h()});
//# sourceMappingURL=index.js.map
