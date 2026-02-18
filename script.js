const countryList = document.getElementById('countryList');
var currentDate = new Date();
function offsetToMs(e) {
  let [t, a] = e
      .replace(/utc/i, '')
      .split(':')
      .map((e) => Number(e.replace(/\D/, ''))),
    r = 36e5 * t + 6e4 * a;
  return e.includes('-') ? -r : r;
}
function numberFormatter(e) {
  return Number.isInteger(e)
    ? new Intl.NumberFormat('ru-RU').format(e)
    : new Intl.NumberFormat('ru-RU', { maximumSignificantDigits: 2 }).format(e);
}
function dollarFormatter(e) {
  return 0 == e ? 'no data' : new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'USD' }).format(e);
}
const searchcountry = async (e) => {
    let t = await fetch('./data/countries.json', { priority: 'high' }),
      a = await t.json(),
      r = a.filter((t) => {
        let a = RegExp(`^${e}`, 'gi');
        return t.country.match(a) || t.capital.match(a);
      });
    (0 === e.length && ((r = []), (countryList.innerHTML = '')), outputHtml(r));
    let n = document.querySelectorAll('.capitalCity');
    n.forEach((e) => {
      e.addEventListener('click', function () {
        (n.forEach((e) => e.classList.remove('active')), this.classList.add('active'));
        var e = this.querySelector('span').textContent || this.querySelector('span').innerText;
        let t = `https://api.openweathermap.org/data/2.5/weather?q=${e}&appid=4d8fb5b93d4af21d66a2948710284366&units=metric`;
        fetch(t)
          .then((e) => e.json())
          .then((e) => {
            let { main: t, name: a, sys: r, weather: n } = e,
              i = `./img/weather/${n[0].icon}.svg`,
              s = document.querySelector('.capitalCity.active #capitalWeather'),
              c = `
            <div class="city-name" data-name="${a},${r.country}">
              <span>${a}</span>
            </div>
            <div class="city-temp">${Math.round(t.temp)}<sup>\xb0C</sup></div>
            <figure>
              <img class="city-icon" src="${i}" alt="${n[0].description}">
              <figcaption>${n[0].description}</figcaption>
            </figure>
          `;
            s.innerHTML = c;
          })
          .catch(() => {
            n.textContent = 'Please search for a valid city';
          });
      });
    });
    let i = document.querySelectorAll('.currency');
    i.forEach((e) => {
      e.addEventListener('click', function () {
        (i.forEach((e) => e.classList.remove('currency-open')), this.classList.add('currency-open'));
        var e = this.querySelector('span').textContent || this.querySelector('span').innerText;
        fetch('https://openexchangerates.org/api/latest.json?app_id=507f9314f79f467d9605061678f7e286')
          .then((e) => e.json())
          .then((t) => {
            let a = document.querySelector('.currency-open #currencyData'),
              r = new Intl.NumberFormat('en-EN', {
                style: 'currency',
                currency: `${e}`,
                currencyDisplay: 'name',
              }).format(`${t.rates[e]}`),
              n = `
            <span>1 US$ = ${r}</span>
          `;
            a.innerHTML = n;
          })
          .catch(() => {
            ((i.textContent = 'There is no data'), console.log('There is no data'));
          });
      });
    });
  },
  outputHtml = (e) => {
    if (e.length > 0) {
      let t = e
        .map(
          (e) => `
          <div class="card">
            <div class="card-top">
              <div class="card-title">${e.country}</div>
              <img src="./img/flags/${e.id.toLowerCase()}.svg">
            </div>
            <div class="card-data">
              <div class="population">
              Population (2026): <span>${numberFormatter(e.pop2026)} (${e.rank} place)</span></div>
              <div class="density">Density: <span>${numberFormatter(e.density)} /km<sup>2</sup></span></div>
              <div class="area">Area: <span>${numberFormatter(e.area, 0)} km<sup>2</sup></span></div>
              <div class="area">GDP (2025), bln.: <span>${dollarFormatter(e.gdp2025)} </span></div>
              <div class="area">GDP per capita (2024): <span>${dollarFormatter(e.gdppc2024)}</span></div>
              <div class="area">GDP PPP (2024), int.dollars: <span>${dollarFormatter(e.gdpppppc2024)}</span></div>
              <div class="capitalCity">Capital: <span class="capitalName">${e.capital}</span>
                <div id="capitalWeather"></div>
              </div>
              <div class="countryCode">Country Code: <span>${e.phoneCode}</span></div>
              <div class="currency">Сurrency: <span>${e.currency}</span>
                <div id="currencyData"></div>
              </div>
              <div class="time">Time in the capital: <span>${new Date(new Date().getTime() + offsetToMs(`${e.timezones}`)).toUTCString()}</span></div>
            </div>
          </div>
        `,
        )
        .join('');
      document.getElementById('countryList').innerHTML = t;
    }
  };
(document.getElementById('search').addEventListener('input', () => searchcountry(search.value)),
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('search').focus({ focusVisible: !0 });
  }));
