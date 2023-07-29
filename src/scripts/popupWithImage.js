import { Popup } from './popup.js';

export class PopupWithImage extends Popup {
    constructor(element) {
        super(element);
        this._image = this._element.querySelector('.popup__img');
        this._description = this._element.querySelector('.popup__description');
    }

    openPopup(cardImage) {
        super.openPopup();
        this._image.src = cardImage.src;
        this._image.alt = cardImage.alt;
        this._description.textContent = cardImage.alt;
    }
}