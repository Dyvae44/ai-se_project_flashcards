import { hexToString, removeColorClasses } from "./colorMap.js";
import { getCarouselTitleString } from "./titles.js";

const carouselSection = document.querySelector("#carousel");
const mainContent = document.querySelector(".page__main-content");

const titleEl = carouselSection.querySelector(".carousel__title");
const cardEl = carouselSection.querySelector(".carousel__card");
const cardTextEl = carouselSection.querySelector(".carousel__card-text");
const flipBtn = carouselSection.querySelector(".carousel__flip-btn");
const leftBtn = carouselSection.querySelector(".carousel__arrow_left");
const rightBtn = carouselSection.querySelector(".carousel__arrow_right");

let currentIndex = 0;
let showingQuestion = true;

export function renderCarouselView(deck) {
  carouselSection.style.display = "flex";

  mainContent.classList.add("page__main-content_carousel");

  currentIndex = 0;
  showingQuestion = true;

  titleEl.textContent = getCarouselTitleString(
    deck.name,
    currentIndex + 1,
    deck.cards.length,
  );

  removeColorClasses(cardEl);
  const colorName = hexToString(deck.color);
  cardEl.classList.add(`carousel__card_color_${colorName}`);

  updateDisplay(deck);

  leftBtn.onclick = () => {
    if (currentIndex > 0) {
      currentIndex--;
      showingQuestion = true;
      updateDisplay(deck);
    }
  };

  rightBtn.onclick = () => {
    if (currentIndex < deck.cards.length - 1) {
      currentIndex++;
      showingQuestion = true;
      updateDisplay(deck);
    }
  };

  flipBtn.onclick = () => {
    showingQuestion = !showingQuestion;
    updateDisplay(deck);
  };
}

function updateDisplay(deck) {
  const card = deck.cards[currentIndex];

  titleEl.textContent = getCarouselTitleString(
    deck.name,
    currentIndex + 1,
    deck.cards.length,
  );
  if (showingQuestion) {
    cardTextEl.textContent = card.question;
    cardEl.classList.remove("carousel__card_color_white");
  } else {
    cardTextEl.textContent = card.answer;
    cardEl.classList.add("carousel__card_color_white");
  }

  leftBtn.disabled = currentIndex === 0;
  rightBtn.disabled = currentIndex === deck.cards.length - 1;
}
