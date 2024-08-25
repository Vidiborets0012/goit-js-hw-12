import{a as p,S as u,i as n}from"./assets/vendor-CZwys2ms.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const m=r=>`  
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
  `,h="https://pixabay.com/api/",f=async r=>{try{const s={params:{key:"45489972-425dbd0ae29bdd8e452daca41",q:r,image_type:"photo",orientation:"horizontal",safesearch:"true"}};return(await p.get(`${h}`,s)).data}catch(s){throw new Error(s.response.status)}},l=document.querySelector(".search-form"),d=document.querySelector(".gallery"),c=document.querySelector(".loader");let y=new u(".gallery a");const g=async r=>{r.preventDefault();const s=l.elements.user_query.value.trim();if(!s){n.error({message:"Please enter a valid search query!",position:"topRight",maxWidth:"500px"});return}c.classList.remove("is-hidden");try{const o=await f(s);if(c.classList.add("is-hidden"),o.hits.length===0){n.error({message:"Sorry, there are no images matchings your search query. Please try againe!",position:"topRight",maxWidth:"500px"}),d.innerHTML="",l.reset();return}const a=o.hits.map(e=>m(e)).join("");d.innerHTML=a,y.refresh()}catch{console.log(err),n.error({message:"Something went wrong. Please try again later!",position:"topRight",maxWidth:"500px"}),c.classList.add("is-hidden")}};l.addEventListener("submit",g);
//# sourceMappingURL=index.js.map
