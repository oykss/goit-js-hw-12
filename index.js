import{a as b,S as P,i as u}from"./assets/vendor-CRCB-GUD.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const w="46231257-9f78b377890ff4b2ac35cee0f",S="https://pixabay.com/api/",d=async(r,t=1)=>{const s=new URLSearchParams({key:w,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t});try{return(await b.get(`${S}?${s}`)).data}catch(i){console.log("🚀 ~ getPhotos ~ error:",i)}},h=r=>r.hits.map(({largeImageURL:t,webformatURL:s,tags:i,likes:e,views:o,comments:a,downloads:L})=>`<li class="photo inactive">
      <a href="${t}">
        <img
        src="${s}" 
        alt="${i}" 
        width="360" 
        height="152">
      </a>
      <ul class="list-value">
        <li class="list-item">
          <p class="title">Likes</p>
          <p class="value">${e}</p>
        </li>
        <li class="list-item">
          <p class="title">Views</p>
          <p class="value">${o}</p>
        </li>
        <li class="list-item">
          <p class="title">Comments</p>
          <p class="value">${a}</p>
        </li>
        <li class="list-item">
          <p class="title">Downloads</p>
          <p class="value">${L}</p>
        </li>
      </ul>
      </li>`).join(""),p={titleSize:"0px",messageSize:"16px",messageLineHeight:1.5,messageColor:"#fff",backgroundColor:"#ef4040",position:"topRight",closeOnEscape:!0,iconUrl:"bi_x-octagon.svg",timeout:3e3,class:"custom-toast-width"},q=document.querySelector("form"),m=document.querySelector(".wrap-photos"),c=document.querySelector(".loader"),l=document.querySelector(".btm-more");let y=1,n;const f=new P(".wrap-photos a",{captionsData:"alt",captionDelay:250});q.addEventListener("submit",r=>{r.preventDefault(),y=1,m.innerHTML="";const t=document.querySelector("input").value.trim();t?v(t):(l.classList.remove("btm-more-active"),u.error({message:"Sorry, there are no images matching your search query. Please, try again!",...p}))});l.addEventListener("click",()=>{v(void 0,++y)});function v(r=n,t=1){c.classList.remove("visually-hidden"),t===1?(n=r,d(r).then(s=>{s.hits.length?(m.innerHTML=h(s),f.refresh(),g()):u.error({message:"Sorry, there are no images matching your search query. Please, try again!",...p})}).finally(()=>{c.classList.add("visually-hidden"),l.classList.add("btm-more-active")})):d(n,t).then(s=>{s.hits.length<15&&(u.error({message:"We're sorry, but you've reached the end of search results.",...p}),l.classList.remove("btm-more-active")),m.insertAdjacentHTML("beforeend",h(s)),g().then(()=>{window.scrollBy({top:850,behavior:"smooth"})}),f.refresh()}).finally(()=>{c.classList.add("visually-hidden")})}function g(){return new Promise(r=>{document.querySelectorAll(".photo.inactive").forEach((s,i)=>{s.classList.remove("inactive"),setTimeout(()=>{s.classList.add("active"),i===9&&r()},i*50)})})}
//# sourceMappingURL=index.js.map
