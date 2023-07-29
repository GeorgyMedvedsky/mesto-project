import { Popup } from "./popup.js";

export class PopupWithForm extends Popup {
    constructor(element, callback) {
        super(element);
        this._callback = callback;
        this._inputList = Array.from(this._element.querySelectorAll('.popup__input'));
        this._form = this._element.querySelector('.popup__form');
    }

    handleSubmit() {
        return this._getInputValues();
    }
    
    setEventListeners() {
        super.setEventListeners();
        this._element.addEventListener('submit', (evt) => this._callback(evt))
        this._form.reset();
    }

    _getInputValues() {
        this._inputsData = {}
        this._inputList.forEach((input) => {
            this._inputsData[input.name] = input.value;
        })
        
        return this._inputsData;
    }
}