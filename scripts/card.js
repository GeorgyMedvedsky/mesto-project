import {
    popupForPhoto,
    popupImg,
    popupDescription,
    openPopup,
    closePopup,
} from './modal.js';

const cardTemplate = document.querySelector('#card').content;
const cardsContainer = document.querySelector('.cards__list');

function deleteCard(button) {
    button.closest('.card').remove();
}
function likeCard(button) {
    button.classList.toggle('like-button_active');
}
function showPhoto(cardImage) {
    popupImg.src = cardImage.src;
    popupImg.alt = cardImage.alt;
    popupDescription.textContent = cardImage.alt;
    openPopup(popupForPhoto);
}
function setCloseButtons() {
    document.querySelectorAll('.popup__close-button').forEach(button => {
        const buttonsPopup = button.closest('.popup');
        button.addEventListener('click', () => closePopup(buttonsPopup));
    }); 
}
function setDeleteButton(card) {
    const buttonItem = card.querySelector('.delete-button');
    buttonItem.addEventListener('click', () => deleteCard(buttonItem));
}
function setLikeButton(card) {
    const buttonItem = card.querySelector('.like-button');
    buttonItem.addEventListener('click', () => likeCard(buttonItem));
}
function setFullPhoto(card) {
    const cardImage = card.querySelector('.card__image');
    cardImage.addEventListener('click', () => showPhoto(cardImage));
}
function createCard(cardData) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardName = cardElement.querySelector('.card__name');
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardName.textContent = cardData.name;
    setDeleteButton(cardElement);
    setLikeButton(cardElement);
    setFullPhoto(cardElement);
    return cardElement;
}
function renderCard(cardItem){
    cardsContainer.prepend(cardItem);
}

export {
    cardTemplate,
    cardsContainer,
    deleteCard,
    likeCard,
    showPhoto,
    setCloseButtons,
    setDeleteButton,
    setLikeButton,
    setFullPhoto,
    createCard,
    renderCard
};