import { Popup } from './popup.js';

export class PopupWithImage extends Popup {
    constructor(element, popupImg, popupDescription) {
        super(element);
        this._image = popupImg;
        this._description = popupDescription;
    }

    openPopup(cardImage) {
        super.openPopup();
        this._image.src = cardImage.src;
        this._image.alt = cardImage.alt;
        this._description.textContent = cardImage.alt;
    }
}