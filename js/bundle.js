!function(e){var t={};function s(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=e,s.c=t,s.d=function(e,t,r){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(r,a,function(t){return e[t]}.bind(null,a));return r},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=0)}([function(e,t,s){"use strict";s.r(t);const r="35596d0ce1799b9e4c7617c1698f94dd",a=async(e,t)=>(await axios.get(`https://api.themoviedb.org/3/search/${t}?query=${e}&api_key=${r}`).catch(e=>{console.log(e)})).data.results,l=(e,t)=>{const s=[];for(let r=0;r<e.length;r++)for(let a=0;a<t.length;a++)e[r].id===t[a].id&&e[r].name===t[a].name?s.push(e[r]):e[r].id===t[a].id&&e[r].original_title===t[a].original_title&&s.push(e[r]);return s},i=(e,t)=>e.length<=t?e:e.slice(0,t)+"...",o=e=>e/10*100,d=e=>1220===e.id||1667===e.id||63498===e.id||27023===e.id||1489===e.id||562===e.id||1667===e.id||1709===e.id||3167===e.id||4573===e.id||2224===e.id||2518===e.id||66488===e.id||60971===e.id||"Live with Regis and Kathie Lee"===e.original_name?void 0:e,n=(...e)=>{let t=[];e.forEach(e=>{t=[...t,...e]});let s,r={};for(let e=0;e<t.length;e++)r[t[e].id]||(r[t[e].id]=t[e]);return s=Array.from(Object.values(r)),s},p=(e,t)=>{let s;if(s="<div class='results__card'>","movie"===e.media_type){if(e.poster_path&&(s+=` <div class = "results__card--image"</div><img src="https://image.tmdb.org/t/p/w185${e.poster_path}" alt="${e.original_title}"></div>`),s+='<div class = "results__card--info"><div class = "results__card--header">',e.original_title&&(s+=`<p class = "results__card--title-movie">${i(e.original_title,30)}</p>`),e.release_date&&(s+=`<div class = "results__card--release"><p>${e.release_date}</p></div>`),e.vote_average){const t=c(e);s+=t}s+="</div>",e.overview&&(s+=`<div class = "results__card--overview"><p>${i(e.overview,300)}</p></div>`)}else if("popular_movies"===t){if(e.poster_path&&(s+=` <div class = "results__card--image"</div><img src="https://image.tmdb.org/t/p/w185${e.poster_path}" alt="${e.original_title}"></div>`),s+='<div class = "results__card--info"><div class = "results__card--header">',e.original_title&&(s+=`<p class = "results__card--title-movie">${i(e.original_title,30)}</p>`),e.release_date&&(s+=`<div class = "results__card--release"><p>${e.release_date}</p></div>`),e.vote_average){const t=c(e);s+=t}s+="</div>",e.overview&&(s+=`<div class = "results__card--overview"><p>${i(e.overview,300)}</p></div>`)}else if("popMoviesHome"===t){if(e.poster_path&&(s+=` <div class = "results__card--image"</div><img src="https://image.tmdb.org/t/p/w185${e.poster_path}" alt="${e.original_title}"></div>`),s+='<div class = "results__card--info"><div class = "results__card--header">',e.original_title&&(s+=`<p class = "results__card--title-movie">${i(e.original_title,30)}</p>`),e.release_date&&(s+=`<div class = "results__card--release"><p>${e.release_date}</p></div>`),e.vote_average){const t=c(e);s+=t}s+="</div>",e.overview&&(s+=`<div class = "results__card--overview"><p>${i(e.overview,300)}</p></div>`)}else if("popTvHome"===t){if(e.poster_path&&(s+=`<div class = "results__card--image"><img src="https://image.tmdb.org/t/p/w185${e.poster_path}" alt="${e.name}"></div>`),s+='<div class = "results__card--info"><div class = "results__card--header">',e.name&&(s+=`<div class = "results__card--header2"><div class = "results__card--title-tv"><p>${i(e.name,30)}</p></div>`),e.release_date&&(s+=`<div class = "results__card--release"><p>${e.release_date}</p></div>`),e.vote_average){const t=c(e);s+=t}s+="</div>",s+="</div>",e.overview&&(s+=`<div class = "results__card--overview"><p>${i(e.overview,300)}</p></div>`)}else if("tv"===e.media_type){if(e.poster_path&&(s+=`<div class = "results__card--image"><img src="https://image.tmdb.org/t/p/w185${e.poster_path}" alt="${e.name}"></div>`),s+='<div class = "results__card--info"><div class = "results__card--header">',e.name&&(s+=`<div class = "results__card--header2"><div class = "results__card--title-tv"><p>${i(e.name,30)}</p></div>`),e.release_date&&(s+=`<div class = "results__card--release"><p>${e.release_date}</p></div>`),s+="</div>",e.vote_average){const t=c(e);s+=t}s+="</div>",e.overview&&(s+=`<div class = "results__card--overview"><p>${i(e.overview,300)}</p></div>`)}else if("popular_tv"===t){if(e.poster_path&&(s+=`<div class = "results__card--image"><img src="https://image.tmdb.org/t/p/w185${e.poster_path}" alt="${e.name}"></div>`),s+='<div class = "results__card--info"><div class = "results__card--header">',e.name&&(s+=`<div class = "results__card--header2"><div class = "results__card--title-tv"><p>${i(e.name,30)}</p></div>`),e.release_date&&(s+=`<div class = "results__card--release"><p>${e.release_date}</p></div>`),e.vote_average){const t=c(e);s+=t}s+="</div>",s+="</div>",e.overview&&(s+=`<div class = "results__card--overview"><p>${i(e.overview,300)}</p></div>`)}else"person"===e.media_type||"person"===t?(e.profile_path?s+=`<div class = "results__card--image"><img src="https://image.tmdb.org/t/p/w185${e.profile_path}" alt="${e.name}"></div>`:s+='<div class = "results__card--image"><img src ="../img/noimage.png" width = "185" height = "278"> </div>',s+='<div class = "results__person">',e.name&&(s+=`<div class = "results__person--header"><p>${e.name}</p>`),e.known_for_department&&(s+=`<h3>${e.known_for_department}<h3/>`),s+="</div>",e.known_for.length>0&&(s+='<div class = "known-for-images">',e.known_for.forEach((e,t)=>{let r="";r=e.original_title?e.original_title:e.original_name?e.original_name:"",e.poster_path&&(s+=`<div class = "known-for-title known-for-titles-${t+1}"><img class = "known-for-image" src = "https://image.tmdb.org/t/p/w94_and_h141_bestv2${e.poster_path}" alt = "${e.original_title||e.original_name}"><a href = "#">${i(r,25)}</a></div>`)}),s+="</div>"),s+=`<div id ="${e.id}" class = " results__card--tag"> <p>tag</p> <img  class="results__card--tag-icon" src="../img/SVG/plus.svg"/></div></div>`):"popular_people"===t&&(e.profile_path&&(s+=`<div class = "results__card--image"><img src="https://image.tmdb.org/t/p/w185${e.profile_path}" alt="${e.name}"></div>`),s+='<div class = "results__person">',e.name&&(s+=`<div class = "results__person--header"><p>${e.name}</p>`),e.known_for_department&&(s+=`<h3>${e.known_for_department}<h3/>`),s+="</div>",e.known_for.length>0&&(s+='<div class = "known-for-images">',e.known_for.forEach((e,t)=>{let r="";r=e.original_title?e.original_title:e.original_name?e.original_name:"",s+=`<div class = "known-for-title known-for-titles-${t+1}"><img class = "known-for-image" src = "https://image.tmdb.org/t/p/w94_and_h141_bestv2${e.poster_path}" alt = "${e.original_title||e.original_name}"><a href = "#">${i(r,25)}</a></div>`}),s+="</div>"),s+=`<div id ="${e.id}" class = "results__card--tag"> <p>tag</p> <img  class="results__card--tag-icon" src="/img/SVG/plus.svg" alt="plus icon"/></div></div>`);return s+="\n        </div> \n        </div>\n      ",s},c=e=>{let t="";return e.vote_average<4?t+=`<div class = "results__card--voteraverage40 results__card--voteraverage"><p>${Math.trunc(o(e.vote_average))}%</p></div>`:e.vote_average>=4&&e.vote_average<6?t+=`<div class = "results__card--voteraverage4060 results__card--voteraverage"><p>${Math.trunc(o(e.vote_average))}%</p></div>`:e.vote_average>=6&&(t+=`<div class = "results__card--voteraverage60 results__card--voteraverage"><p>${Math.trunc(o(e.vote_average))}%</p></div>`),t},u=document.querySelector(".results__home"),_=document.querySelector(".results__home--movies"),v=document.querySelector(".results__home--tv"),g=document.querySelector(".results__output"),m=document.querySelector(".results__info"),h=document.querySelector(".results__header"),f=document.querySelector(".results__taggedPeople"),y=document.querySelector(".searchbar__search"),w=document.querySelector(".search__input"),$=document.querySelector("#moviesButton"),P=document.querySelector("#tvButton"),b=document.querySelector("#peopleButton"),M={userInput:"",results:[],comparedResults:[],comparedResultsThreePeople:[],taggedPeople:[],credits:new Map},k=async e=>{M.taggedPeople=[],R(""),m.style.display="none",M.results=await(async()=>(await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${r}&language=en-US&page=1`).catch(e=>{console.log(e)})).data.results)(),"home"===e?(g.style.display="none",x("input not needed","popMoviesHome")):(g.style.display="grid",u.style.display="none",x("input not needed","popular_movies"))},T=async e=>{M.taggedPeople=[],R(""),m.style.display="none",M.results=await(async()=>(await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${r}&language=en-US&page=1`).catch(e=>{console.log(e)})).data.results)(),"home"===e?(g.style.display="none",x("input not needed","popTvHome")):(g.style.display="grid",u.style.display="none",x("input not needed","popular_tv"))},S=async()=>{M.taggedPeople=[],R(""),m.style.display="none",u.style.display="none",g.style.display="grid",M.results=await(async()=>(await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=${r}&language=en-US&page=1`).catch(e=>{console.log(e)})).data.results)(),x("input not needed","popular_people")},H=()=>{M.taggedPeople.forEach(async e=>{if(!M.credits.get(e.id)){const t=await(async e=>(await axios.get(`https://api.themoviedb.org/3/person/${e}/combined_credits?api_key=${r}&language=en-US`).catch(e=>{console.log(e)})).data)(e.id);M.credits.set(e.id,t),M.taggedPeople.length>1&&L()}})},L=()=>{const e=Array.from(M.credits.values()),t=[];if(2===M.taggedPeople.length){e.forEach(e=>{let s=n(e.cast,e.crew);t.push(s)});const s=l(t[0],t[1]);M.comparedResults=s,x("input not needed","compared_search")}else if(3===M.taggedPeople.length){t.push(M.comparedResults);const s=n(e[e.length-1].cast,e[e.length-1].crew);t.push(s);const r=l(t[1],t[0]);M.comparedResultsThreePeople=r,x("input not needed","compared_search_3")}},E=async e=>{if(""===e&&M.taggedPeople.length>1)x("input not needed","compared_search");else if(""===e)M.results=[],x(e,"standard_search");else{let t;t=M.taggedPeople.length>0?await a(e,"person"):await a(e,"multi"),M.results=t,x(e,"standard_search")}},q=e=>{if(U(),0===M.taggedPeople.length){if("person"===M.results[0].media_type){if(M.taggedPeople.includes(e))return;M.taggedPeople.push(e)}else if(!e.media_type){if(M.taggedPeople.includes(e))return;M.taggedPeople.push(e)}}else{if(M.taggedPeople.includes(e))return;M.taggedPeople.push(e)}},x=(e,t)=>{let s="";if("input not needed"===e&&"popMoviesHome"===t)s+='<div class = "results__title"><p>Popular Movies</p></div>',M.results.forEach(e=>s+=p(e,"popMoviesHome")),_.innerHTML=s;else if("input not needed"===e&&"popTvHome"===t)s+='<div class = "results__title"><p>Popular TV</p></div>',M.results.forEach(e=>s+=p(e,"popTvHome")),v.innerHTML=s;else if(""===e)g.innerHTML=s;else if("standard_search"===t)if(M.taggedPeople.length>0){M.results.forEach(e=>{s+=p(e,"person"),g.innerHTML=s}),document.querySelectorAll(".results__card--tag").forEach(e=>e.onclick=()=>{const t=M.results.filter(t=>t.id==e.id);m.style.display="flex",q(t[0]),R(),H()})}else{M.results.forEach(e=>{s+=p(e),g.innerHTML=s});const e=document.querySelectorAll(".results__card--tag"),t=document.querySelectorAll(".results__card--read-more");t.forEach(t.onclick=()=>{V(t.id)}),e.forEach(e=>e.onclick=()=>{const t=M.results.filter(t=>t.id==e.id);m.style.display="flex",q(t[0]),R(),H()})}else if("compared_search"===t)M.comparedResults.forEach(e=>{const t=d(e);t&&(s+=p(t))}),g.innerHTML=s;else if("compared_search_3"===t)M.comparedResultsThreePeople.forEach(e=>{const t=d(e);t&&(s+=p(t))}),g.innerHTML=s;else if("popular_movies"===t)s+='<div class = "results__title"><p>Popular Movies</p></div>',M.results.forEach(e=>s+=p(e,"popular_movies")),g.innerHTML=s;else if("popular_tv"===t)s+='<div class = "results__title"><p>Popular TV</p></div>',M.results.forEach(e=>s+=p(e,"popular_tv")),g.innerHTML=s;else if("popular_people"===t){s+='<div class = "results__title"><p>Popular People</p></div>',M.results.forEach(e=>{s+=p(e,"popular_people"),g.innerHTML=s}),document.querySelectorAll(".results__card--tag").forEach(e=>e.onclick=()=>{const t=M.results.filter(t=>t.id==e.id);m.style.display="flex",q(t[0]),R(),H()})}},R=e=>{if(""===e)f.innerHTML="",h.innerHTML="";else{if(M.taggedPeople.length>3)return void console.log("tagged people");{O(),I();const e=document.querySelector(".results__header--clear");e&&(e.onclick=()=>{j(),m.style.display="none",O("clear"),I()})}}},j=()=>{M.userInput="",M.taggedPeople=[],M.comparedResults=[],M.comparedResultsThreePeople=[],M.credits=new Map},O=e=>{h.innerHTML="clear"===e?"":'\n    <div class="results__header--title">Tagged</div>\n    <button class="results__header--clear">clear</button>'},I=()=>{let e,t="";f.innerHTML=t,e="<a href=\"#\" class='results__people'>",M.taggedPeople.forEach(t=>{e+=`<p>${t.name}</p>`}),e+="</a>",0===M.taggedPeople.length&&(e=""),t+=e,f.innerHTML=t},A=e=>{9!==e.which&&9!==e.keyCode||(m.style.display="flex",M.userInput="",e.preventDefault(),(()=>{if(0===M.taggedPeople.length){if("person"===M.results[0].media_type){if(M.taggedPeople.includes(M.results[0]))return;M.taggedPeople.push(M.results[0])}else if(!M.results[0].media_type){if(M.taggedPeople.includes(clickedPerson))return;M.taggedPeople.push(clickedPerson)}}else{if(M.taggedPeople.includes(M.results[0]))return void console.log("tagged people");M.taggedPeople.push(M.results[0])}})(),R(),U(),H())},U=()=>{w.value=""};y.onsubmit=e=>{e.preventDefault(),""!==M.userInput&&E(M.userInput),document.activeElement.blur(),""===w.value&&U()},w.oninput=e=>{M.taggedPeople.length>0?m.style.display="flex":m.style.display="none",(e=>{M.userInput=e.target.value,E(M.userInput)})(e)},w.onkeydown=e=>{g.style.display="grid",u.style.display="none",u.innerHTML="",A(e)},$.onclick=()=>{u.innerHTML="",j(),k()},P.onclick=()=>{u.innerHTML="",j(),T()},b.onclick=()=>{u.innerHTML="",j(),S()};console.log(M),k("home"),T("home");const V=e=>{console.log(e)}}]);