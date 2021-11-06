function createImageElement(imageSource, className) {
  const img = document.createElement('img');
  img.className = className;
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createPlantElement({
  name, sun, water, url, price, toxicity, staff_favorite
}) {
  const section = document.createElement('section');
  section.className = 'cards-plants-card';

  if (staff_favorite) {
    section.appendChild(createCustomElement(
      'section',
      'cards-plants-card-favorite',
      'Staff favorite'
    ));
  }

  section.appendChild(createCustomElement(
    'span', 'cards-plants-card-title', name));
  section.appendChild(createCustomElement(
    'span', 'cards-plants-card-price', price));
  section.appendChild(createImageElement(url, 'cards-plants-card-img'));

  if (sun === 'high') {
    section.appendChild(createImageElement(
      'images/icons/low-sun.svg', 'cards-plants-card-sun'));
  } else {
    section.appendChild(createImageElement(
      'images/icons/no-sun.svg', 'cards-plants-card-sun'));
  }

  if (water === 'rarely') {
    section.appendChild(createImageElement(
      'images/icons/1-drop.svg', 'cards-plants-card-water'));
  } else if (water === 'regularly') {
    section.appendChild(createImageElement(
      'images/icons/2-drops.svg', 'cards-plants-card-water'));
  } else {
    section.appendChild(createImageElement(
      'images/icons/3-drops.svg', 'cards-plants-card-water'));
  }

  sun === 'high' ?
  section.appendChild(createImageElement(
    'images/icons/low-sun.svg', 'cards-plants-card-sun'))
  :
    section.appendChild(createImageElement(
      'images/icons/no-sun.svg', 'cards-plants-card-sun'))

  toxicity ?
    section.appendChild(createImageElement(
      'images/icons/toxic.svg', 'cards-plants-card-dog'))
  :
    section.appendChild(createImageElement(
      'images/icons/pet.svg', 'cards-plants-card-dog'))

  section.addEventListener('click', function (event) {
    if (event.target.className === 'item__add') {
      const idSku = getSkuFromProductItem(event.target.parentNode);
      innerCartNewElement(idSku);
    }
  });
  return section;
}

const fetchPlants = () => {
  fetch(`https://front-br-challenges.web.app/api/v2/green-thumb/?sun=high&water=regularly&pets=false`)
    .then(data => {
      console.log(data);
      document.querySelector('.cards-no-result').className = 'no-show';

      data.forEach((element) => {
        const cardsLocal = document.querySelector('.cards-plants');
        cardsLocal.appendChild(createPlantElement(element));
      });
    }).catch((err) => {
      console.log(err);
      document.querySelector('.no-show').className = 'cards-no-result';
    });
};

window.onload = function onload() {
  fetchPlants();
};