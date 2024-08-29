var a=document.getElementById('countryList'),g=aK=>{if(aK.length>0){document.getElementById('countryList').innerHTML=aK.map(aL=>`
          <div class="card">
            <div class="card-top">
              <div class="card-title">${aL.country}</div>
              <img src="./img/flags/${aL.id.toLowerCase()}.svg">
            </div>
            <div class="card-data">
              <div class="population">
              Population: <span>${d(aL.pop2024)}</span></div>
              <div class="density">Density: <span>${d(aL.density)} /km<sup>2</sup></span></div>
              <div class="area">Area: <span>${d(aL.area,0)} km<sup>2</sup></span></div>
              <div class="area">GDP (2023), bln.: <span>${e(aL.gdp2023)} </span></div>
              <div class="area">GDP per capita (2023): <span>${e(aL.gdppc2023)}</span></div>
              <div class="area">GDP PPP (2023), int.dollars: <span>${e(aL.gdpppppc2023)}</span></div>
              <div class="capitalCity">Capital: <span class="capitalName">${aL.capital}</span>
                <div id="capitalWeather"></div>
              </div>
              <div class="countryCode">Country Code: <span>${aL.phoneCode}</span></div>
              <div class="currency">Сurrency: <span>${aL.currency}</span>
                <div id="currencyData"></div>
              </div>
              <div class="time">Time in the capital: <span>${new Date(new Date().getTime()+c(`${aL.timezones}`)).toUTCString()}</span></div>
            </div>
          </div>
        `).join('')}};var b=new Date();function c(s){const[h,m]=s.replace(/utc/i,'').split(':').map(x=>+x.replace(/\D/,'')),ms=h*60*60*1000+m*60*1000;return s.includes('-')?-ms:ms}function d(A){if(Number.isInteger(A))return new Intl.NumberFormat('ru-RU').format(A);return new Intl.NumberFormat('ru-RU', {maximumSignificantDigits:2}).format(A)}function e(_){if(_==0)return'no data';return new Intl.NumberFormat('ru-RU', {style:'currency',currency:'USD'}).format(_)}var f=async B=>{const C=await fetch('./data/countries.json',{priority:'high'});const _c=await C.json();let D=_c.filter(_a=>{const _b=new RegExp(`^${B}`, 'gi');return _a.country.match(_b)||_a.capital.match(_b)});B.length===0&&(D=[],a.innerHTML='');g(D);let E=document.querySelectorAll('.capitalCity');for(const _A of E)_A.addEventListener('click',function(){for(const aB of E)aB.classList.remove('active');this.classList.add('active');var aA=this.querySelector('span').textContent||this.querySelector('span').innerText,_B='4d8fb5b93d4af21d66a2948710284366';fetch(`https://api.openweathermap.org/data/2.5/weather?q=${aA}&appid=${_B}&units=metric`).then(aC=>aC.json()).then(aD=>{const{main:aE,name:_C,sys:_d,weather:_e}=aD,G=document.querySelector('.capitalCity.active #capitalWeather');const _f=`./img/weather/${_e[0]['icon']}.svg`;G.innerHTML=`
            <div class="city-name" data-name="${_C},${_d.country}">
              <span>${_C}</span>
            </div>
            <div class="city-temp">${Math.round(aE.temp)}<sup>°C</sup></div>
            <figure>
              <img class="city-icon" src="${_f}" alt="${_e[0]['description']}">
              <figcaption>${_e[0]['description']}</figcaption>
            </figure>
          `}).catch(()=>E.textContent='Please search for a valid city')});let F=document.querySelectorAll('.currency');for(const item of F)item.addEventListener('click',function(){for(const item of F)item.classList.remove('currency-open');this.classList.add('currency-open');var aF=this.querySelector('span').textContent||this.querySelector('span').innerText;fetch('https://openexchangerates.org/api/latest.json?app_id=507f9314f79f467d9605061678f7e286').then(aG=>aG.json()).then(aH=>{const aI=document.querySelector('.currency-open #currencyData');let aJ=new Intl.NumberFormat('en-EN', {style:'currency',currency:`${aF}`,currencyDisplay:'name'}).format(`${aH.rates[aF]}`);aI.innerHTML=`
            <span>1 US$ = ${aJ}</span>
          `}).catch(()=>{F.textContent='There is no data';console.log('There is no data')})})};document.getElementById('search').addEventListener('input',()=>f(search.value));document.addEventListener('DOMContentLoaded',()=>document.getElementById('search').focus({focusVisible:!0}));
