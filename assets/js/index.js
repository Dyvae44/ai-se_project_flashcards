import { decks, getDeckByID } from "./decks.js";
import { hexToString, removeColorClasses } from "./colorMap.js";
import { renderDeckView } from "./deck-view.js";
import { renderCarouselView } from "./carousel.js";

const deckTemplate = document.querySelector("#deck-template");
const deckList = document.querySelector("#home .gallery__list");

const homeSection = document.querySelector("#home");
const deckViewSection = document.querySelector("#deck-view");
const aboutSection = document.querySelector("#about");
const notFoundSection = document.querySelector("#not-found");
const carouselSection = document.querySelector("#carousel");
const mainContent = document.querySelector(".page__main-content");

function createDeckEl(deckData) {
  const deckEl = deckTemplate.content.querySelector(".card").cloneNode(true);

  const titleEl = deckEl.querySelector(".card__title");
  titleEl.textContent = deckData.name;

  const deleteBtn = deckEl.querySelector(".card__btn_type_delete");
  deleteBtn.addEventListener("click", () => {
    deckEl.remove();
  });

  removeColorClasses(deckEl);
  const colorName = hexToString(deckData.color);
  deckEl.classList.add(`card_color_${colorName}`);

  const countEl = deckEl.querySelector(".card__count");
  countEl.textContent = `${deckData.cards.length} cards`;

  const deckLink = deckEl.querySelector(".card__link");
  deckLink.href = `#deck/${deckData.id}`;

  return deckEl;
}

function renderDeckEl(deckData) {
  const deckEl = createDeckEl(deckData);
  deckList.prepend(deckEl);
}
decks.forEach(renderDeckEl);

function renderHomeView() {
  homeSection.style.display = "block";
  deckViewSection.style.display = "none";
  aboutSection.style.display = "none";
  carouselSection.style.display = "none";
  notFoundSection.style.display = "none";
  mainContent.classList.remove("page__main-content_carousel");
}

function renderAboutView() {
  homeSection.style.display = "none";
  deckViewSection.style.display = "none";
  aboutSection.style.display = "block";
  notFoundSection.style.display = "none";
  carouselSection.style.display = "none";
  mainContent.classList.remove("page__main-content_carousel");
}

function renderNotFoundView() {
  homeSection.style.display = "none";
  deckViewSection.style.display = "none";
  aboutSection.style.display = "none";
  notFoundSection.style.display = "block";
  carouselSection.style.display = "none";
  mainContent.classList.remove("page__main-content_carousel");
}

function router() {
  const hash = window.location.hash;

  if (hash === "#home" || hash === "") {
    renderHomeView();
  } else if (hash === "#about") {
    renderAboutView();
  } else if (hash.startsWith("#deck/")) {
    const deckID = hash.split("/")[1];
    const deck = getDeckByID(deckID);

    if (deck) {
      homeSection.style.display = "none";
      deckViewSection.style.display = "block";
      aboutSection.style.display = "none";
      notFoundSection.style.display = "none";
      carouselSection.style.display = "none";
      mainContent.classList.remove("page__main-content_carousel");

      renderDeckView(deck);
    } else {
      renderNotFoundView();
    }
  } else if (hash.startsWith("#carousel/")) {
    const deckID = hash.split("/")[1];
    const deck = getDeckByID(deckID);

    if (deck) {
      homeSection.style.display = "none";
      deckViewSection.style.display = "none";
      aboutSection.style.display = "none";
      notFoundSection.style.display = "none";

      carouselSection.style.display = "flex";
      mainContent.classList.add("page__main-content_carousel");

      renderCarouselView(deck);
    } else {
      renderNotFoundView();
    }
  } else {
    renderNotFoundView();
  }
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
