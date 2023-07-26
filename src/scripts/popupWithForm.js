import { Popup } from "./popup";

export class PopupWithForm extends Popup {
    constructor(element, callback) {
        super(element);
        this._callback = callback;
        this._inputList = Array.from(this.element.querySelectorAll('.popup__input'));
        this._form = this.element.querySelector('.popup__form');
    }

    handleSubmit() {
        return this._getInputValues();
    }

    _getInputValues() {
        const inputsData = {}
        this._inputList.forEach((input) => {
            inputsData[input.name] = input.value;
        })
        
        return inputsData;
    }

    setEventListeners() {
        super.setEventListeners();
        this.element.addEventListener('submit', (evt) => this._callback(evt))
    }

    closePopup(){
        super.closePopup();
        this._form.reset();
    }
}