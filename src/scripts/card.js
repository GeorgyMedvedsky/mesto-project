import * as modal from './modal.js';

export const cardTemplate = document.querySelector('#card').content;
export const cardsContainer = document.querySelector('.cards__list');

export function deleteCard(button) {
    button.closest('.card').remove();
}
export function likeCard(button) {
    button.classList.toggle('like-button_active');
}
export function showPhoto(cardImage) {
    modal.popupImg.src = cardImage.src;
    modal.popupImg.alt = cardImage.alt;
    modal.popupDescription.textContent = cardImage.alt;
    modal.openPopup(modal.popupForPhoto);
}
export function setDeleteButton(card) {
    const buttonItem = card.querySelector('.delete-button');
    buttonItem.addEventListener('click', () => deleteCard(buttonItem));
}
export function setLikeButton(card) {
    const buttonItem = card.querySelector('.like-button');
    buttonItem.addEventListener('click', () => likeCard(buttonItem));
}
export function setFullPhoto(card) {
    const cardImage = card.querySelector('.card__image');
    cardImage.addEventListener('click', () => showPhoto(cardImage));
}
export function createCard(cardData) {
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
export function renderCard(cardItem){
    cardsContainer.prepend(cardItem);
}