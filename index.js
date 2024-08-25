import{a as f,S as L,i as n}from"./assets/vendor-CZwys2ms.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();const u=t=>`  
      <li class="gallery-card">
      <a href="${t.largeImageURL}">
        <img class="gallery-img" src="${t.webformatURL}" alt="${t.tags}" />
      </a>
      <div class="gallery-info">
        <p><b>Likes</b> ${t.likes}</p>
        <p><b>Views</b> ${t.views}</p>
        <p><b>Comments</b> ${t.comments}</p>
        <p><b>Downloads</b> ${t.downloads}</p>
      </div>
    </li>
  `,b="https://pixabay.com/api/",g=async(t,r=1,a=15)=>{try{const o={params:{key:"45489972-425dbd0ae29bdd8e452daca41",q:t,image_type:"photo",orientation:"horizontal",safesearch:"true",page:r,per_page:a}};return(await f.get(`${b}`,o)).data}catch(o){throw new Error(o.response.status)}},p=document.querySelector(".search-form"),h=document.querySelector(".gallery"),i=document.querySelector(".loader"),m=document.querySelector(".load-more-btn");let y=new L(".gallery a"),l=1,c="";const w=async t=>{if(t.preventDefault(),c=p.elements.user_query.value.trim(),!c){n.error({message:"Please enter a valid search query!",position:"topRight",maxWidth:"500px"});return}l=1,m.classList.add("is-hidden"),i.classList.remove("is-hidden");try{const r=await g(c,l);if(i.classList.add("is-hidden"),r.hits.length===0){n.error({message:"Sorry, there are no images matchings your search query. Please try againe!",position:"topRight",maxWidth:"500px"}),h.innerHTML="",p.reset();return}const a=r.hits.map(o=>u(o)).join("");h.innerHTML=a,y.refresh(),m.classList.remove("is-hidden")}catch{console.log(err),n.error({message:"Something went wrong. Please try again later!",position:"topRight",maxWidth:"500px"}),i.classList.add("is-hidden")}},v=async t=>{l++;try{const r=await g(c,l);i.classList.add("is-hidden");const a=r.hits.map(o=>u(o)).join("");h.insertAdjacentHTML("beforeend",a),y.refresh()}catch(r){console.log(r),n.error({message:"Something went wrong. Please try again later!",position:"topRight",maxWidth:"500px"}),i.classList.add("is-hidden")}};p.addEventListener("submit",w);m.addEventListener("click",v);
//# sourceMappingURL=index.js.map
