const countryList=document.getElementById("countryList");var currentDate=new Date;function offsetToMs(e){const[t,n]=e.replace(/utc/i,"").split(":").map((e=>Number(e.replace(/\D/,"")))),a=60*t*60*1e3+60*n*1e3;return e.includes("-")?-a:a}const searchcountry=async e=>{const t=await fetch("./data/countries.json");let n=(await t.json()).filter((t=>{const n=new RegExp(`^${e}`,"gi");return t.country.match(n)||t.abbr.match(n)}));0===e.length&&(n=[],countryList.innerHTML=""),outputHtml(n);let a=document.querySelectorAll(".capitalCity");a.forEach((e=>{e.addEventListener("click",(function(){a.forEach((e=>e.classList.remove("active"))),this.classList.add("active");var e=this.querySelector("span").textContent||this.querySelector("span").innerText;fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e}&appid=4d8fb5b93d4af21d66a2948710284366&units=metric`).then((e=>e.json())).then((e=>{const{main:t,name:n,sys:a,weather:c}=e,s=`./img/weather/${c[0].icon}.svg`,i=document.querySelector(".capitalCity.active #capitalWeather"),r=`\n            <div class="city-name" data-name="${n},${a.country}">\n              <span>${n}</span>\n            </div>\n            <div class="city-temp">${Math.round(t.temp)}<sup>°C</sup></div>\n            <figure>\n              <img class="city-icon" src="${s}" alt="${c[0].description}">\n              <figcaption>${c[0].description}</figcaption>\n            </figure>\n          `;i.innerHTML=r})).catch((()=>{a.textContent="Please search for a valid city"}))}))}));let c=document.querySelectorAll(".currency");c.forEach((e=>{e.addEventListener("click",(function(){c.forEach((e=>e.classList.remove("currency-open"))),this.classList.add("currency-open");var e=this.querySelector("span").textContent||this.querySelector("span").innerText;fetch("https://openexchangerates.org/api/latest.json?app_id=507f9314f79f467d9605061678f7e286").then((e=>e.json())).then((t=>{const n=document.querySelector(".currency-open #currencyData");const a=`\n            <span>1 US$ = ${new Intl.NumberFormat("en-EN",{style:"currency",currency:`${e}`,currencyDisplay:"name"}).format(`${t.rates[e]}`)}</span>\n          `;n.innerHTML=a})).catch((()=>{c.textContent="There is no data",console.log("There is no data")}))}))}))},outputHtml=e=>{if(e.length>0){const t=e.map((e=>`\n          <div class="card">\n            <div class="card-top">\n              <div class="card-title">${e.country}</div>\n              <img src="./img/flags/${e.code.toLowerCase()}.svg">\n            </div>\n            <div class="card-data">\n              <div class="population">\n              Population: <span>${new Intl.NumberFormat("ru-RU").format(e.population)}</span></div>\n              <div>Density: <span>${new Intl.NumberFormat("ru-RU").format(e.density)}</span></div>\n              <div class="area">Area: <span>${(e.area/1e3).toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g," ")} thous.km<sup>2</sup></span></div>\n              <div class="capitalCity">Capital: <span class="capitalName">${e.capital}</span>\n                <div id="capitalWeather"></div>\n              </div>\n              <div class="countryCode">Country Code: <span>${e.phoneCode}</span></div>\n              <div class="currency">Сurrency: <span>${e.currency}</span>\n                <div id="currencyData"></div>\n              </div>\n              <div class="time">Time in the capital: <span>${new Date((new Date).getTime()+offsetToMs(`${e.timezones}`)).toUTCString()}</span></div>\n            </div>\n          </div>\n        `)).join("");document.getElementById("countryList").innerHTML=t}};document.getElementById("search").addEventListener("input",(()=>searchcountry(search.value))),document.addEventListener("DOMContentLoaded",(()=>{document.getElementById("search").focus({focusVisible:!0})}));
