import { hexToString, removeColorClasses } from "./colorMap.js";

const cardTemplate = document.querySelector("#card-template");
const cardList = document.querySelector("#deck-view .gallery__list");
const deckViewSection = document.querySelector("#deck-view");
const practiceBtn = document.querySelector(".gallery__practice-btn");

let currentDeck = null;

practiceBtn?.addEventListener("click", () => {
  if (!currentDeck) return;
  window.location.hash = `#carousel/${currentDeck.id}`;
});

function createCardEl(cardData, deckData) {
  const cardEl = cardTemplate.content.querySelector(".card").cloneNode(true);

  const titleEl = cardEl.querySelector(".card__title");
  titleEl.textContent = cardData.question;

  const practiceBtn = cardEl.querySelector(".card__btn_type_flip");
  practiceBtn.addEventListener("click", () => {
    window.location.hash = `#carousel/${deckData.id}`;
  });

  const deleteBtn = cardEl.querySelector(".card__btn_type_delete");
  deleteBtn.addEventListener("click", () => {
    cardEl.remove();
  });

  removeColorClasses(cardEl);

  const colorName = hexToString(deckData.color);
  cardEl.classList.add(`card_color_${colorName}`);

  return cardEl;
}

function renderDeckView(deckData) {
  currentDeck = deckData;
  cardList.innerHTML = "";

  const deckTitle = deckViewSection.querySelector(".gallery__title");
  deckTitle.textContent = deckData.name;

  deckData.cards.forEach((card) => {
    const cardEl = createCardEl(card, deckData);
    cardList.appendChild(cardEl);
  });
}

export { renderDeckView };
