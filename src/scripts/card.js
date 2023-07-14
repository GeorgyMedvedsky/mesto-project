import * as api from './api.js';
import * as modal from './modal.js';
import * as utils from './utils.js';

export function deleteCardFromUser(button) {
    button.closest('.card').remove();
}
// export function likeCard(button) {
//     button.classList.toggle('like-button_active');
// }
export function showPhoto(cardImage) {
    utils.popupImg.src = cardImage.src;
    utils.popupImg.alt = cardImage.alt;
    utils.popupDescription.textContent = cardImage.alt;
    modal.openPopup(utils.popupForPhoto);
}
export function setDeleteButton(button, cardData, profileId) {
    if(cardData.owner._id === profileId) {
        button.classList.remove('delete-button_hidden');
        button.addEventListener('click', () => {
            api.deleteCardFromServer(cardData._id)
            deleteCardFromUser(button);
        });
        
    } else {
        button.classList.add('delete-button_hidden');
    }
}
export function setLikeButton(button, cardData, profileId) {
        button.addEventListener('click', () => {
            cardData.likes.forEach(userLike => {
                if(userLike._id === profileId) {
                    button.classList.add('like-button_active');
                    api.setLike(cardData._id, cardData.likes);
                } else {
                    button.classList.remove('like-button_active');
                    api.deleteLike(cardData._id);
                }
            })
    });
}

export function setFullPhoto(cardImage) {
    cardImage.addEventListener('click', () => showPhoto(cardImage));
}

export function createCard(cardData, profileId) {
    const cardElement = utils.cardTemplate.querySelector('.card').cloneNode(true);
    const cardName = cardElement.querySelector('.card__name');
    const cardImage = cardElement.querySelector('.card__image');
    const deleteBtn = cardElement.querySelector('.delete-button');
    const likeBtn = cardElement.querySelector('.like-button');
    const likes = cardElement.querySelector('.like-button__likes');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardName.textContent = cardData.name;
    likes.textContent = cardData.likes.length;

    setDeleteButton(deleteBtn, cardData, profileId);
    setLikeButton(likeBtn, cardData, profileId);
    setFullPhoto(cardImage);

    return cardElement;
}
