export class Card {
    constructor(cardData, selector, api, popupImg) {
        this._cardData = cardData;
        this._selector = selector;
        this._api = api;
        this._popupImg = popupImg;
    }

    createCard(profileId) {
        this._profileId = profileId;
        this._element = this._getElement();
        
        this._cardName = this._element.querySelector('.card__name');
        this._cardImage = this._element.querySelector('.card__image');
        this._deleteBtn = this._element.querySelector('.delete-button');
        this._likeBtn = this._element.querySelector('.like-button');
        this._numberOfLikes = this._element.querySelector('.like-button__likes');
        
        this._cardImage.src = this._cardData.link;
        this._cardImage.alt = this._cardData.name;
        this._cardName.textContent = this._cardData.name;
        this._numberOfLikes.textContent = this._cardData.likes.length;
    
        this._setEventListeners();
    
        return this._element;
    }

    _getElement() {
        const templateElement = document.querySelector(this._selector).content.cloneNode(true);
        return templateElement;
    }

    
    _setEventListeners() {
        this._deleteCard();
        this._toggleLike();
        this._handleImageClick();
    }

    _deleteCard() {
        if(this._cardData.owner._id === this._profileId) {
            this._deleteBtn.classList.remove('delete-button_hidden');
            this._deleteBtn.addEventListener('click', () => {
                this._api.deleteCardFromServ(this._cardData._id)
                    .then(() => {
                        this._deleteCardFromUser();
                    })
                    .catch(err => console.error(err));
                });
            
        } else {
            this._deleteBtn.classList.add('delete-button_hidden');
        }
    }
    
    _deleteCardFromUser() {
        this._deleteBtn.closest('.card').remove();
    }

    _toggleLike() {
        this._cardData.likes.forEach(item => {
            if(item._id === this._profileId) {
                this._likeBtn.classList.add('like-button_active');
            }
        })
        this._likeBtn.addEventListener('click', () => {
            if(this._likeBtn.classList.contains('like-button_active')) {
                this._api.deleteLike(this._cardData._id)
                    .then(res => {
                        this._likeBtn.classList.remove('like-button_active');
                        this._numberOfLikes.textContent = res.likes.length;
                    })
                    .catch(err => console.error(err));
            } else {
                this._api.setLike(this._cardData._id)
                    .then(res => {
                        this._likeBtn.classList.add('like-button_active');
                        this._numberOfLikes.textContent = res.likes.length;
                    })
                    .catch(err => console.error(err));
            }
        });
    }

    _handleImageClick() {
        this._cardImage.addEventListener('click', () => this._popupImg.openPopup(this._cardImage));
    }
}
