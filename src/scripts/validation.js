export class FormValidator {
    constructor(settings, form) {
        this._settings = settings;
        this._form = form;
        this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
        this._buttonElement = this._form.querySelector(this._settings.submitButtonSelector);
    }

    _showInputError(formElement, inputElement, errorMessage, inputErrorClass) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(inputErrorClass);
        errorElement.textContent = errorMessage;
    }

    _hideInputError(formElement, inputElement, inputErrorClass) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(inputErrorClass);
        errorElement.textContent = '';
    }

    _isValid(formElement, inputElement, inputErrorClass) {
        if (inputElement.validity.patternMismatch) inputElement.setCustomValidity(inputElement.dataset.errorMessage);
        else inputElement.setCustomValidity("");
    
        if(!inputElement.validity.valid) this._showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass)
        else this._hideInputError(formElement, inputElement, inputErrorClass);
    }
    
    _hasInvalidInput(inputList) {
        return inputList.some(inputElement => !inputElement.validity.valid);
    }

    _toggleButtonState(inputList, buttonElement, inactiveButtonClass) { 
        if(this._hasInvalidInput(inputList)) { 
            this._disableButtonSumbit(buttonElement, true, inactiveButtonClass);
            buttonElement.classList.add(inactiveButtonClass);
        } else { 
            this._disableButtonSumbit(buttonElement, false, inactiveButtonClass);
            buttonElement.classList.remove(inactiveButtonClass); 
        } 
    }

    _disableButtonSumbit(buttonElement, settings, inactiveButtonClass) {
        buttonElement.disabled = settings;
        buttonElement.classList.add(inactiveButtonClass);
    }

    _setEventListeners() {
        this._toggleButtonState(this._inputList, this._buttonElement, this._settings.inactiveButtonClass);
        this._form.addEventListener('reset', () => {
            this._disableButtonSumbit(this._buttonElement, true);
            this._buttonElement.classList.add(this._settings.inactiveButtonClass);
        });
        this._inputList.forEach(inputElement => inputElement.addEventListener('input', () => {
            this._isValid(this._form, inputElement, this._settings.inputErrorClass);
            this._toggleButtonState(this._inputList, this._buttonElement, this._settings.inactiveButtonClass);
        }));
    }

    enableValidation() {
        this._setEventListeners()
    }
}