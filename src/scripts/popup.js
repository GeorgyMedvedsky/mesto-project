

export class Popup {
    constructor(element) {
        this.element = element;
    }
    openPopup(){
        this.element.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
    closePopup(){
        this.element.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }
    _handleEscClose = (evt) => {
        if(evt.key === 'Escape') {
            this.closePopup();
        }
    }
    setEventListeners() {
        this.element.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened')) this.closePopup();
            if (evt.target.classList.contains('popup__close-button')) this.closePopup();
        });
    }
}