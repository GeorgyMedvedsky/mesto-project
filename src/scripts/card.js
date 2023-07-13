import * as api from './api.js';
import * as modal from './modal.js';
import * as utils from './utils.js';

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
export function setDeleteButton(cardElement, cardData, profileId) {
    const buttonItem = cardElement.querySelector('.delete-button');

    if(cardData.owner._id === profileId) {
        buttonItem.classList.remove('delete-button_hidden');
        buttonItem.addEventListener('click', () => {
            utils.deleteCard(cardData._id, buttonItem);
        });
        
    } else {
        buttonItem.classList.add('delete-button_hidden');
    }
}
export function setLikeButton(card, cardData, profileId) {
    const buttonItem = card.querySelector('.like-button');
    const likes = cardData.likes;

    buttonItem.addEventListener('click', () => {
        likes.forEach(userLike => {
            if(userLike._id === profileId) {
                api.deleteLike(cardData._id);
            } else {
                api.setLike(cardData._id, cardData.likes)
            }
        })

        likeCard(buttonItem)
    });
}
export function setFullPhoto(card) {
    const cardImage = card.querySelector('.card__image');

    cardImage.addEventListener('click', () => showPhoto(cardImage));
}
export function createCard(cardData, profileId) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardName = cardElement.querySelector('.card__name');
    const cardImage = cardElement.querySelector('.card__image');
    const likes = cardElement.querySelector('.like-button__likes');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardName.textContent = cardData.name;
    likes.textContent = cardData.likes.length;

    setDeleteButton(cardElement, cardData, profileId);
    setLikeButton(cardElement, cardData, profileId);
    setFullPhoto(cardElement);

    return cardElement;
}
export function renderCard(cardItem){
    cardsContainer.prepend(cardItem);
}