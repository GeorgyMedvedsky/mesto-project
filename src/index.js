import { initialCards } from './scripts/cards.js';
import * as modal from './scripts/modal.js';
import * as card from './scripts/card.js';
import * as validation from './scripts/validation.js';

import './pages/index.css';

const popups = document.querySelectorAll('.popup');
const editButton = document.querySelector('.edit-button');
const addButton = document.querySelector('.add-button');

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) modal.closePopup(popup);
        if (evt.target.classList.contains('popup__close-button')) modal.closePopup(popup);
    });
})
initialCards.forEach(cardItem => card.renderCard(card.createCard(cardItem)));
editButton.addEventListener('click', () => {
    modal.nameInput.value = modal.profileName.textContent;
    modal.jobInput.value = modal.profileJob.textContent;
    modal.openPopup(modal.popupForProfile);
});
addButton.addEventListener('click', () => modal.openPopup(modal.popupForPlace));
modal.profileForm.addEventListener('submit', modal.handleProfileFormSumbit);
modal.newPlaceForm.addEventListener('submit', modal.handleNewPlaceFormSubmit);

validation.enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_type_error',
}); 