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
function isValid(formElement, inputElement, {...rest}) {
    if (inputElement.validity.patternMismatch) inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    else inputElement.setCustomValidity("");

    if(!inputElement.validity.valid) showInputError(formElement, inputElement, inputElement.validationMessage, {...rest})
    else hideInputError(formElement, inputElement, {...rest});
}
function hasInvalidInput(inputList) {
    return inputList.some(inputElement => !inputElement.validity.valid);
}
function toggleButtonState(inputList, buttonElement, {inactiveButtonClass}) {
    if(hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(inactiveButtonClass);
    }
}
function setEventListeners(formElement, {inputSelector, submitButtonSelector, ...rest}) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement, {...rest});
    inputList.forEach(inputElement => inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, {...rest});
        toggleButtonState(inputList, buttonElement, {...rest});
    }));
}
function enableValidation({formSelector, ...rest}) {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach(formElement => setEventListeners(formElement, {...rest}));
}

export {
    showInputError,
    hideInputError,
    isValid,
    setEventListeners,
    hasInvalidInput,
    toggleButtonState,
    enableValidation
};