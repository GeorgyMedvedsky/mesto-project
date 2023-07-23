import * as utils from './utils.js';

export class Popup {
    constructor(selector) {
        this.selector = selector;
    }
    openPopup(){
        this.selector.classList.add('popup_opened');
        document.addEventListener('keydown', (evt) => this._closeByEsc(evt));
    }
    closePopup(){
        this.selector.classList.remove('popup_opened');
        document.removeEventListener('keydown', (evt) => this._closeByEsc(evt));
    }
    _closeByEsc(evt) {
        if(evt.key === 'Escape') {
            const openedPopup = document.querySelector('.popup_opened');
            this.closePopup(openedPopup);
        }
    }
    setEventListeners() {
        this.selector.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened')) this.closePopup();
            if (evt.target.classList.contains('popup__close-button')) this.closePopup();
        });
    }
}

export class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
    }

    openPopup(cardImage) {
        utils.popupImg.src = cardImage.src;
        utils.popupImg.alt = cardImage.alt;
        utils.popupDescription.textContent = cardImage.alt;

        this.selector.classList.add('popup_opened');
        document.addEventListener('keydown', (evt) => this._closeByEsc(evt));
    }
}

export class PopupWithForm extends Popup {
    constructor(selector, callback) {
        super(selector);
        this._callback = callback;
    }

    _getInputValues() {
        const inputs = Array.from(this.selector.querySelectorAll('.popup__input'));
        const inputsValues = inputs.map(input => input.value);

        return inputsValues;
    }

    setEventListeners() {
        this.selector.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened')) this.closePopup();
            if (evt.target.classList.contains('popup__close-button')) this.closePopup();
        });

        this.selector.addEventListener('submit', (evt) => this._callback(evt))
    }

    closePopup(){
        this.selector.classList.remove('popup_opened');
        document.removeEventListener('keydown', (evt) => this._closeByEsc(evt));
        this.selector.querySelector('.popup__form').reset()
    }
}