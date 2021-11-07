const axios = require('axios');

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
  let classCard = 'plants-cards-container-card'
  const section = document.createElement('section');
  section.className = classCard;

  const sectionInfo = document.createElement('section');
  sectionInfo.className = `${classCard}-more-info-imgs`;

  const sectionMoreInfo = document.createElement('section');
  sectionMoreInfo.className = `${classCard}-more-info`;

  const sectionHeader = document.createElement('section');
  sectionHeader.className = `${classCard}-header`;

  if (staff_favorite) {
    section.appendChild(createCustomElement(
      'section',
      '-favorite-text',
      'Staff favorite'
    ));
    section.className = `${classCard}-favorite`;
    classCard = 'plants-cards-container-card-favorite'
  }

  sectionHeader.appendChild(createImageElement(url, `${classCard}-img`));
  section.appendChild(sectionHeader)
  section.appendChild(createCustomElement(
    'div', `${classCard}-title`, name));
  sectionMoreInfo.appendChild(createCustomElement(
    'div', `${classCard}-price`, `$${price}`));

  toxicity ?
    sectionInfo.appendChild(createCustomElement(
      'div', 'plants-cards-container-card-more-info-imgs-dog-toxic', ''))
  :
    sectionInfo.appendChild(createCustomElement(
      'div', 'plants-cards-container-card-more-info-imgs-dog-pet', ''))

  sun === 'high' ?
  sectionInfo.appendChild(createCustomElement(
    'div', 'plants-cards-container-card-more-info-imgs-sun-low', ''))
  :
    sectionInfo.appendChild(createCustomElement(
      'div', 'plants-cards-container-card-more-info-imgs-sun-no', ''))

  if (water === 'rarely') {
    sectionInfo.appendChild(createCustomElement(
      'div', 'plants-cards-container-card-more-info-imgs-water-1-drop', ''));
  } else if (water === 'regularly') {
    sectionInfo.appendChild(createCustomElement(
      'div', 'plants-cards-container-card-more-info-imgs-water-2-drops', ''));
  } else {
    sectionInfo.appendChild(createCustomElement(
      'div', 'plants-cards-container-card-more-info-imgs-water-3-drops', ''));
  }

    sectionMoreInfo.appendChild(sectionInfo)
    section.appendChild(sectionMoreInfo)

  return section;
}

const fetchPlants = () => {
  const selectSun = document.getElementById('filters-cards-sun-select')
  const filterSun = selectSun.options[selectSun.selectedIndex].value;
  selectSun.onchange = () => fetchPlants();

  const selectWater = document.getElementById('filters-cards-water-select')
  const filterWater = selectWater.options[selectWater.selectedIndex].value;
  selectWater.onchange = () => fetchPlants();

  const selectPets = document.getElementById('filters-cards-pets-select')
  const filterPets = selectPets.options[selectPets.selectedIndex].value;
  selectPets.onchange = () => fetchPlants();

  axios.get(`https://front-br-challenges.web.app/api/v2/green-thumb/?sun=${filterSun}&water=${filterWater}&pets=${filterPets}`)
    .then(response => {
        document.querySelector('.plants-no-result') ?
          document.querySelector('.plants-no-result').className = 'no-show' : null;
        document.querySelector('.no-plants-cards') ?
          document.querySelector('.no-plants-cards').className = 'plants-cards' : null;

      const cards = document.querySelector('.plants-cards');
      const cardsContainer = document.querySelector('.plants-cards-container');
      cards.removeChild(cardsContainer)

      const newContainer = createCustomElement('section', 'plants-cards-container', '')
      response.data.forEach((element) => {
        newContainer.appendChild(createPlantElement(element));
      });
      cards.appendChild(newContainer)
    }).catch((err) => {
      console.log(err);
        document.querySelector('.no-show').className = 'plants-no-result';
        document.querySelector('.plants-cards').className = 'no-plants-cards';
    });
};
fetchPlants();
window.onload = function onload() {
  fetchPlants();
};
