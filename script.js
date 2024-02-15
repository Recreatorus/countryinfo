var A=a=>typeof a=='number',b=a=>typeof a=='undefined',c=document.getElementById('countryList'),e=async aB=>{const aC=await fetch('./data/countries.json');const _C=await aC.json();!aB.length&&(fits=[],c.innerHTML='');f(_C.filter(aD=>{const aE=new RegExp(`^${aB}`, 'gi');return aD.country.match(aE)||aD.abbr.match(aE)}));let _d=document.querySelectorAll('.capitalCity');for(const aF of _d)aF.addEventListener('click',function(){for(const aI of _d)aI.classList.remove('active');this.classList.add('active');var aG=this.querySelector('span').textContent||this.querySelector('span').innerText,aH='4d8fb5b93d4af21d66a2948710284366';fetch(`https://api.openweathermap.org/data/2.5/weather?q=${aG}&appid=${aH}&units=metric`).then(aJ=>aJ.json()).then(aK=>{const{main:aL,name:aM,sys:_D,weather:_E}=aK,F=`./img/weather/${_E[0]['icon']}.svg`,g=document.querySelector('.capitalCity.active #capitalWeather');g.innerHTML=`
            <div class="city-name" data-name="${aM},${_D.country}">
              <span>${aM}</span>
            </div>
            <div class="city-temp">${Math.round(aL.temp)}<sup>°C</sup></div>
            <figure>
              <img class="city-icon" src="${F}" alt="${_E[0]['description']}">
              <figcaption>${_E[0]['description']}</figcaption>
            </figure>
          `}).catch(()=>_d.textContent='Please search for a valid city')});let _e=document.querySelectorAll('.currency');for(const aN of _e)aN.addEventListener('click',function(){for(const aP of _e)aP.classList.remove('currency-open');this.classList.add('currency-open');var aO=this.querySelector('span').textContent||this.querySelector('span').innerText;fetch('https://openexchangerates.org/api/latest.json?app_id=507f9314f79f467d9605061678f7e286').then(aQ=>aQ.json()).then(aR=>{const aS=document.querySelector('.currency-open #currencyData');let aT=new Intl.NumberFormat('en-EN', {style:'currency',currency:`${aO}`,currencyDisplay:'name'}).format(`${aR.rates[aO]}`);aS.innerHTML=`
            <span>1 US$ = ${aT}</span>
          `}).catch(()=>{_e.textContent='There is no data';console.log('There is no data')})})},f=aU=>aU.length>0&&(document.getElementById('countryList').innerHTML=aU.map(aV=>`
          <div class="card">
            <div class="card-top">
              <div class="card-title">${aV.country}</div>
              <img src="./img/flags/${aV.id.toLowerCase()}.svg">
            </div>
            <div class="card-data">
              <div class="population">
              Population: <span>${new Intl.NumberFormat('ru-RU').format(aV.pop2023)}</span></div>
              <div class="density">Density: <span>${new Intl.NumberFormat('ru-RU').format(Math.round10(aV.density,-1))} /km<sup>2</sup></span></div>
              <div class="area">Area: <span>${(aV.area/1000).toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g,' ')}K km<sup>2</sup></span></div>
              <div class="area">GDP (2023): <span>$${new Intl.NumberFormat('ru-RU').format(Math.round10(aV.gdp2023,0))} bln.</span></div>
              <div class="area">GDP PC (2023): <span>$${new Intl.NumberFormat('ru-RU').format(Math.round10(aV.gdppc2023,0))}</span></div>
              <div class="area">GDP PPP (2023): <span>$${new Intl.NumberFormat('ru-RU').format(Math.round10(aV.gdpppppc2023,0))}</span></div>
              <div class="capitalCity">Capital: <span class="capitalName">${aV.capital}</span>
                <div id="capitalWeather"></div>
              </div>
              <div class="countryCode">Country Code: <span>${aV.phoneCode}</span></div>
              <div class="currency">Сurrency: <span>${aV.currency}</span>
                <div id="currencyData"></div>
              </div>
              <div class="time">Time in the capital: <span>${new Date(new Date().getTime()+d(`${aV.timezones}`)).toUTCString()}</span></div>
            </div>
          </div>
        `).join(''));function d(s){var[h,m]=s.replace(/utc/i,'').split(':').map(x=>+x.replace(/\D/,'')),_=h*60*60*1000+m*60*1000;return s.includes('-')?-_:_}(function(){function B(C,_b,_c){if(b(_c)||!+_c)return Math[C](_b);_b=+_b;_c=+_c;if(isNaN(_b)||!A(_c)||(_c%1))return NaN;_b=`${_b}`.split('e');_b=Math[C](+(_b[0]+'e'+(_b[1]?+_b[1]-_c:-_c)));_b=`${_b}`.split('e');return +(_b[0]+'e'+(_b[1]?+_b[1]+_c:_c))}!Math.round10&&(Math.round10=(_a,D)=>B('round',_a,D));!Math.floor10&&(Math.floor10=(_A,_B)=>B('floor',_A,_B));!Math.ceil10&&(Math.ceil10=(E,aA)=>B('ceil',E,aA))})();document.getElementById('search').addEventListener('input',()=>e(search.value));document.addEventListener('DOMContentLoaded',()=>document.getElementById('search').focus({focusVisible:!0}));
