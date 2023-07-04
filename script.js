const countryList = document.getElementById('countryList');
var currentDate = new Date();
function offsetToMs(e) {
  let [t, a] = e
      .replace(/utc/i, '')
      .split(':')
      .map((e) => Number(e.replace(/\D/, ''))),
    n = 36e5 * t + 6e4 * a;
  return e.includes('-') ? -n : n;
}
!(function () {
  function e(e, t, a) {
    return void 0 === a || 0 == +a
      ? Math[e](t)
      : ((a = +a), isNaN((t = +t)) || !('number' == typeof a && a % 1 == 0))
      ? NaN
      : +(
          (t = (t = Math[e](+((t = t.toString().split('e'))[0] + 'e' + (t[1] ? +t[1] - a : -a))))
            .toString()
            .split('e'))[0] +
          'e' +
          (t[1] ? +t[1] + a : a)
        );
  }
  Math.round10 ||
    (Math.round10 = function (t, a) {
      return e('round', t, a);
    }),
    Math.floor10 ||
      (Math.floor10 = function (t, a) {
        return e('floor', t, a);
      }),
    Math.ceil10 ||
      (Math.ceil10 = function (t, a) {
        return e('ceil', t, a);
      });
})();
const searchcountry = async (e) => {
    let t = await fetch('./data/countries.json'),
      a = await t.json(),
      n = a.filter((t) => {
        let a = RegExp(`^${e}`, 'gi');
        return t.country.match(a) || t.abbr.match(a);
      });
    0 === e.length && ((n = []), (countryList.innerHTML = '')), outputHtml(n);
    let r = document.querySelectorAll('.capitalCity');
    r.forEach((e) => {
      e.addEventListener('click', function () {
        r.forEach((e) => e.classList.remove('active')), this.classList.add('active');
        var e = this.querySelector('span').textContent || this.querySelector('span').innerText;
        let t = `https://api.openweathermap.org/data/2.5/weather?q=${e}&appid=4d8fb5b93d4af21d66a2948710284366&units=metric`;
        fetch(t)
          .then((e) => e.json())
          .then((e) => {
            let { main: t, name: a, sys: n, weather: r } = e,
              i = `./img/weather/${r[0].icon}.svg`,
              s = document.querySelector('.capitalCity.active #capitalWeather'),
              c = `
            <div class="city-name" data-name="${a},${n.country}">
              <span>${a}</span>
            </div>
            <div class="city-temp">${Math.round(t.temp)}<sup>\xb0C</sup></div>
            <figure>
              <img class="city-icon" src="${i}" alt="${r[0].description}">
              <figcaption>${r[0].description}</figcaption>
            </figure>
          `;
            s.innerHTML = c;
          })
          .catch(() => {
            r.textContent = 'Please search for a valid city';
          });
      });
    });
    let i = document.querySelectorAll('.currency');
    i.forEach((e) => {
      e.addEventListener('click', function () {
        i.forEach((e) => e.classList.remove('currency-open')), this.classList.add('currency-open');
        var e = this.querySelector('span').textContent || this.querySelector('span').innerText;
        fetch('https://openexchangerates.org/api/latest.json?app_id=507f9314f79f467d9605061678f7e286')
          .then((e) => e.json())
          .then((t) => {
            let a = document.querySelector('.currency-open #currencyData'),
              n = new Intl.NumberFormat('en-EN', {
                style: 'currency',
                currency: `${e}`,
                currencyDisplay: 'name',
              }).format(`${t.rates[e]}`),
              r = `
            <span>1 US$ = ${n}</span>
          `;
            a.innerHTML = r;
          })
          .catch(() => {
            (i.textContent = 'There is no data'), console.log('There is no data');
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
              Population: <span>${new Intl.NumberFormat('ru-RU').format(e.pop2022)} thousand</span></div>
              <div class="density">Density: <span>${new Intl.NumberFormat('ru-RU').format(
                Math.round10(e.density, -1)
              )} /km<sup>2</sup></span></div>
              <div class="area">Area: <span>${(e.area / 1e3)
                .toFixed(1)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}K km<sup>2</sup></span></div>
              <div class="area">GDP (2022): <span>$${new Intl.NumberFormat('ru-RU').format(
                Math.round10(e.gdp, 0)
              )} bln.</span></div>
              <div class="area">GDP PC (2022): <span>$${new Intl.NumberFormat('ru-RU').format(
                Math.round10(e.gdppc, 0)
              )}</span></div>
              <div class="area">GDP PPP (2022): <span>$${new Intl.NumberFormat('ru-RU').format(
                Math.round10(e.ppp, 0)
              )}</span></div>
              <div class="capitalCity">Capital: <span class="capitalName">${e.capital}</span>
                <div id="capitalWeather"></div>
              </div>
              <div class="countryCode">Country Code: <span>${e.phoneCode}</span></div>
              <div class="currency">Сurrency: <span>${e.currency}</span>
                <div id="currencyData"></div>
              </div>
              <div class="time">Time in the capital: <span>${new Date(
                new Date().getTime() + offsetToMs(`${e.timezones}`)
              ).toUTCString()}</span></div>
            </div>
          </div>
        `
        )
        .join('');
      document.getElementById('countryList').innerHTML = t;
    }
  };
document.getElementById('search').addEventListener('input', () => searchcountry(search.value)),
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('search').focus({ focusVisible: !0 });
  });
