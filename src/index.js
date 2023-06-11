import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

fetchBreeds().then(createBreedsList);

const selectEl = document.querySelector('.breed-select');
selectEl.addEventListener('change', selectElHandler);
const loaderEl = document.querySelector('.loader');
const catInfoDiv = document.querySelector('.cat-info');

function createBreedsList(data) {
  const result = data.map(({ id, name }) => ({
    text: name,
    value: id
  }));

  const emptyObj = { text: " ", value: " " };
  result.unshift(emptyObj);

  new SlimSelect({
    select: '.breed-select',
    data: result,
    settings: {
      allowDeselect: true
    }
  });
}

function selectElHandler(event) {
  loaderEl.classList.remove("visually-hidden");
  const breedId = selectEl.value;

  if (breedId === " ") {
    setTimeout(hideLoader, 1000);
    return breedId;
  }

  fetchCatByBreed(breedId)
    .then(data => {
      const catImgURL = data[0].url;
      const catBreedInfo = data[0].breeds[0];

      const catInfoCode = `
        <div class="cat-info-box">
          <div class="cat-text-box">
            <h1 class="breed-name">${catBreedInfo.name}</h1>
            <p class="breed-description">${catBreedInfo.description}</p>
            <h2>Temperament:</h2>
            <p class="breed-temperament">${catBreedInfo.temperament}</p>
          </div>
          <img id="photo" class="breed-img" src="${catImgURL}" width="350" loading="lazy">
        </div>
      `;
      catInfoDiv.innerHTML = catInfoCode;
    })
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure(`Error: ${error}`);
    })
    .finally(() => {
      hideLoader();
    });
}

function hideLoader() {
  loaderEl.classList.add("visually-hidden");
}