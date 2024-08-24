import{S as u,i as n}from"./assets/vendor-5ObWk2rO.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const h=r=>`  
      <li class="gallery-card">
      <a href="${r.largeImageURL}">
        <img class="gallery-img" src="${r.webformatURL}" alt="${r.tags}" />
      </a>
      <div class="gallery-info">
        <p><b>Likes</b> ${r.likes}</p>
        <p><b>Views</b> ${r.views}</p>
        <p><b>Comments</b> ${r.comments}</p>
        <p><b>Downloads</b> ${r.downloads}</p>
      </div>
    </li>
  `,m="https://pixabay.com/api/",p=r=>{const s=new URLSearchParams({key:"45489972-425dbd0ae29bdd8e452daca41",q:r,image_type:"photo",orientation:"horizontal",safesearch:"true"});return fetch(`${m}?${s}`).then(o=>{if(!o.ok)throw new Error(o.status);return o.json()})},c=document.querySelector(".search-form"),d=document.querySelector(".gallery"),l=document.querySelector(".loader");let f=new u(".gallery a");const g=r=>{r.preventDefault();const s=c.elements.user_query.value.trim();if(!s){n.error({message:"Please enter a valid search query!",position:"topRight",maxWidth:"500px"});return}l.classList.remove("is-hidden"),p(s).then(o=>{if(l.classList.add("is-hidden"),o.hits.length===0){n.error({message:"Sorry, there are no images matchings your search query. Please try againe!",position:"topRight",maxWidth:"500px"}),d.innerHTML="",c.reset();return}const i=o.hits.map(e=>h(e)).join("");d.innerHTML=i,f.refresh()}).catch(o=>{console.log(o),n.error({message:"Something went wrong. Please try again later!",position:"topRight",maxWidth:"500px"}),l.classList.add("is-hidden")})};c.addEventListener("submit",g);
//# sourceMappingURL=index.js.map
