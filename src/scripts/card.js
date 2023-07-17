import * as api from './api.js';
import * as modal from './modal.js';
import * as utils from './utils.js';

export function deleteCard(button) {
    button.closest('.card').remove();
}
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
            api.deleteCard(cardData._id)
                .then(() => {
                    deleteCard(button);
                })
                .catch(err => console.error(err));
        });
        
    } else {
        button.classList.add('delete-button_hidden');
    }
}
export function setLikeButton(button, cardData, likes, profileId) {
    cardData.likes.forEach(item => {
        if(item._id === profileId) {
            button.classList.add('like-button_active');
        }
    })
    button.addEventListener('click', () => {
            if(button.classList.contains('like-button_active')) {
                api.deleteLike(cardData._id)
                    .then(res => {
                        button.classList.remove('like-button_active');
                        likes.textContent = res.likes.length;
                    })
            } else {
                api.setLike(cardData._id)
                    .then(res => {
                        button.classList.add('like-button_active');
                        likes.textContent = res.likes.length;
                    })
            }
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
    setLikeButton(likeBtn, cardData, likes, profileId);
    setFullPhoto(cardImage);

    return cardElement;
}
