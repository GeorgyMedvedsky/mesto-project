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
    }
    
    closePopup(){
        super.closePopup();
        this._form.reset();
    }

    _getInputValues() {
        const inputsData = {}
        this._inputList.forEach((input) => {
            inputsData[input.name] = input.value;
        })
        
        return inputsData;
    }
}