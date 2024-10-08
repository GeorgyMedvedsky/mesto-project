export class Popup {
    constructor(popupSelector) {
        this._element = document.querySelector(popupSelector);
    }
    openPopup(){
        this._element.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
    closePopup(){
        this._element.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }
    _handleEscClose = (evt) => {
        if(evt.key === 'Escape') {
            this.closePopup();
        }
    }
    setEventListeners() {
        this._element.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened')) this.closePopup();
            if (evt.target.classList.contains('popup__close-button')) this.closePopup();
        });
    }
}