function c(s){const [h, m]=s.replace(/utc/i,'').split(':').map((x)=>+x.replace(/\D/,''));const a=h*60*60*1000+m*60*1000;return s.includes('-')?-a:a}(function(){function a(a,c,d){if(d===void 0||!+d)return Math[a](c);c=+c;d=+d;if(isNaN(c)||!typeof d==='number'||d%1)return NaN;c=c.toString().split('e');c=Math[a](+(c[0]+'e'+c[1]?+c[1]-d:-d));c=c.toString().split('e');return +(c[0]+'e'+c[1]?+c[1]+d:d)}!Math.round10&&(Math.round10=(value,exp)=>a('round',value,exp));!Math.floor10&&(Math.floor10=(value,exp)=>a('floor',value,exp));!Math.ceil10&&(Math.ceil10=(value,exp)=>a('ceil',value,exp))})();const d=async (a)=>{const c=await fetch('./data/countries.json');const d=await c.json();let e=d.filter((a)=>{const c=new RegExp(`^${a}`, 'gi');return a.country.match(c)||a.abbr.match(c)});!a.length&&(e=[],a.innerHTML='');e(e);let f=document.querySelectorAll('.capitalCity');for(const a of f)a.addEventListener('click',function(){for(const a of f)a.classList.remove('active');this.classList.add('active');var a=this.querySelector('span').textContent||this.querySelector('span').innerText;const c='4d8fb5b93d4af21d66a2948710284366';const d=`https://api.openweathermap.org/data/2.5/weather?q=${a}&appid=${c}&units=metric`;fetch(d).then((response)=>response.json()).then((a)=>{const {main, name, sys, weather}=a;const g=`./img/weather/${f[0]['icon']}.svg`;const h=document.querySelector('.capitalCity.active #capitalWeather');const i=`
            <div class="city-name" data-name="${d},${e.country}">
              <span>${d}</span>
            </div>
            <div class="city-temp">${Math.round(c.temp)}<sup>°C</sup></div>
            <figure>
              <img class="city-icon" src="${g}" alt="${f[0]['description']}">
              <figcaption>${f[0]['description']}</figcaption>
            </figure>
          `;h.innerHTML=i}).catch(()=>f.textContent='Please search for a valid city')});let g=document.querySelectorAll('.currency');for(const a of g)a.addEventListener('click',function(){for(const a of g)a.classList.remove('currency-open');this.classList.add('currency-open');const c='https://openexchangerates.org/api/latest.json?app_id=507f9314f79f467d9605061678f7e286';fetch(c).then((response)=>response.json()).then((a)=>{const c=document.querySelector('.currency-open #currencyData');let d=new Intl.NumberFormat('en-EN', {style:'currency',currency:`${a}`,currencyDisplay:'name'}).format(`${a.rates[a]}`);const e=`
            <span>1 US$ = ${d}</span>
          `;c.innerHTML=e}).catch(()=>{g.textContent='There is no data';console.log('There is no data')})})};document.getElementById('search').addEventListener('input',()=>d(search.value));document.addEventListener('DOMContentLoaded',()=>document.getElementById('search').focus({focusVisible:!0}));
