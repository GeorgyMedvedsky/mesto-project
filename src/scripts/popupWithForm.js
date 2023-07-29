import { Popup } from "./popup.js";

export class PopupWithForm extends Popup {
    constructor(element, callback) {
        super(element);
        this._callback = callback;
        this._inputList = Array.from(this._element.querySelectorAll('.popup__input'));
        this._form = this._element.querySelector('.popup__form');
        this._submitBtn = this._form.querySelector('.popup__submit');
    }

    handleSubmit() {
        return this._getInputValues();
    }
    
    setEventListeners() {
        super.setEventListeners();
        this._element.addEventListener('submit', (evt) => this._callback(evt))
    }

    _getInputValues() {
        this._inputsData = {}
        this._inputList.forEach((input) => {
            this._inputsData[input.name] = input.value;
        })
        
        return this._inputsData;
    }

    openPopup() {
        super.openPopup()
        if(this._submitBtn.id === 'place-submit') this._submitBtn.value = 'Создать'
        else this._submitBtn.value = 'Сохранить'
    }

    closePopup() {
        super.closePopup()
        this._form.reset()
    }
}