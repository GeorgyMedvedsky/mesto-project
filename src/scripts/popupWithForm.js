import { Popup } from "./popup";

export class PopupWithForm extends Popup {
    constructor(element, callback) {
        super(element);
        this._callback = callback;
    }

    getInputValues() {
        const inputs = Array.from(this.element.querySelectorAll('.popup__input'));
        const inputsData = {}
        inputs.forEach((input) => {
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
        this.element.querySelector('.popup__form').reset()
    }
}