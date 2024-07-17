const refs = {
  search: document.querySelector('.js-search'),
  list: document.querySelector('.js-list'),
};
// console.log(refs.search);
refs.search.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault(e);
  const { query, days } = e.currentTarget.elements;

  getWeather(query.value, days.value)
    .then(data => (refs.list.innerHTML = creatMarkup(data.forecast.forecastday)))
    .catch(error => console.log(error));
}

function getWeather(city, days) {
  //  fetch('http://api.weatherapi.com/v1/forecast.json?key=069a0cd316de461b809173219241607&q=Ukraine/Odessa&days=5 ')
  const BASE_URL = 'http://api.weatherapi.com/v1/';
  const API_KEY = '069a0cd316de461b809173219241607';
  return fetch(
    `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=${days}&lang=uk`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
function creatMarkup(arr) {
  return arr
    .map(
      ({
        date,
        day: {
          avgtemp_c,
          condition: { text, icon },
        },
      }) =>
        `
  <li>
    <img src="${icon}" alt="${text}">
    <p>${text}</p>
    <h2>${date}</h2>
    <h3>${avgtemp_c}</h3>
    
</li>`
    )
    .join('');
}
