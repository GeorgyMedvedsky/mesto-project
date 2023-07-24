import * as utils from './utils.js';
import { Popup } from './popup.js';

export class PopupWithImage extends Popup {
    constructor(element) {
        super(element);
    }

    openPopup(cardImage) {
        utils.popupImg.src = cardImage.src;
        utils.popupImg.alt = cardImage.alt;
        utils.popupDescription.textContent = cardImage.alt;

        super.openPopup();
    }
}