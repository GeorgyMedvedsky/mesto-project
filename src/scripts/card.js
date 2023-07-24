import { api } from './api.js';
import {popupWithImageClass} from '../index.js'

export class Card {
    constructor(cardData, selector) {
        this._cardData = cardData;
        this._selector = selector;
        this._profileId = null;
    }

    createCard(profileId) {
        this._profileId = profileId;
        this._element = this._getElement();
        
        const cardName = this._element.querySelector('.card__name');
        const cardImage = this._element.querySelector('.card__image');
        const deleteBtn = this._element.querySelector('.delete-button');
        const likeBtn = this._element.querySelector('.like-button');
        const likes = this._element.querySelector('.like-button__likes');
        
        cardImage.src = this._cardData.link;
        cardImage.alt = this._cardData.name;
        cardName.textContent = this._cardData.name;
        likes.textContent = this._cardData.likes.length;
    
        this._setDeleteButton(deleteBtn);
        this._setLikeButton(likeBtn, likes);
        this._setFullPhoto(cardImage);
    
        return this._element;
    }

    _getElement() {
        const templateElement = document.querySelector(this._selector).content.cloneNode(true);
        return templateElement;
    }

    _setDeleteButton(button) {
        if(this._cardData.owner._id === this._profileId) {
            button.classList.remove('delete-button_hidden');
            button.addEventListener('click', () => {
                api.deleteCard(this._cardData._id)
                    .then(() => {
                        this._deleteCard(button);
                    })
                    .catch(err => console.error(err));
            });
            
        } else {
            button.classList.add('delete-button_hidden');
        }
    }

    _deleteCard(button) {
        button.closest('.card').remove();
    }

    _setLikeButton(button, likes) {
        this._cardData.likes.forEach(item => {
            if(item._id === this._profileId) {
                button.classList.add('like-button_active');
            }
        })
        button.addEventListener('click', () => {
                if(button.classList.contains('like-button_active')) {
                    api.deleteLike(this._cardData._id)
                        .then(res => {
                            button.classList.remove('like-button_active');
                            likes.textContent = res.likes.length;
                        })
                        .catch(err => console.error(err));
                } else {
                    api.setLike(this._cardData._id)
                        .then(res => {
                            button.classList.add('like-button_active');
                            likes.textContent = res.likes.length;
                        })
                        .catch(err => console.error(err));
                }
        });
    }
    
    _setFullPhoto(cardImage) {
        cardImage.addEventListener('click', () => popupWithImageClass.openPopup(cardImage));
    }
}
