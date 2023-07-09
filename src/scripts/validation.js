function showInputError(formElement, inputElement, errorMessage, {inputErrorClass}) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
}
function hideInputError(formElement, inputElement, {inputErrorClass}) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = '';
}
function isValid(formElement, inputElement, {inputErrorClass}) {
    if (inputElement.validity.patternMismatch) inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    else inputElement.setCustomValidity("");

    if(!inputElement.validity.valid) showInputError(formElement, inputElement, inputElement.validationMessage, {inputErrorClass})
    else hideInputError(formElement, inputElement, {inputErrorClass});
}
function hasInvalidInput(inputList) {
    return inputList.some(inputElement => !inputElement.validity.valid);
}
function toggleButtonState(inputList, buttonElement, {inactiveButtonClass}) { 
    if(hasInvalidInput(inputList)) { 
        disableButtonSumbit(buttonElement, true);
        buttonElement.classList.add(inactiveButtonClass);
    } else { 
        disableButtonSumbit(buttonElement, false);
        buttonElement.classList.remove(inactiveButtonClass); 
    } 
} 
export function disableButtonSumbit(buttonElement, settings) {
    buttonElement.disabled = settings;
}
function setEventListeners(formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass}) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement, {inactiveButtonClass});
    formElement.addEventListener('reset', () => {
        disableButtonSumbit(buttonElement, true);
        buttonElement.classList.add(inactiveButtonClass);
    });
    inputList.forEach(inputElement => inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, {inputErrorClass});
        toggleButtonState(inputList, buttonElement, {inactiveButtonClass});
    }));
}
export function enableValidation({formSelector, ...rest}) {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach(formElement => setEventListeners(formElement, {...rest}));
}