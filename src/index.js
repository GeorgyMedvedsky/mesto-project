import { initialCards } from './scripts/cards.js';
import {
    popupForProfile,
    profileForm,
    nameInput,
    jobInput,
    profileName,
    profileJob,
    popupForPlace,
    newPlaceForm,
    openPopup,
    handleProfileFormSumbit,
    handleNewPlaceFormSubmit,
    closePopup
} from './scripts/modal.js';
import {
    createCard,
    renderCard
} from './scripts/card.js';
import { enableValidation } from './scripts/validation.js';
import './pages/index.css';

const popups = document.querySelectorAll('.popup');
const editButton = document.querySelector('.edit-button');
const addButton = document.querySelector('.add-button');

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) closePopup(popup);
        if (evt.target.classList.contains('popup__close-button')) closePopup(popup);
    });
})
initialCards.forEach(card => renderCard(createCard(card)));
editButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(popupForProfile);
});
addButton.addEventListener('click', () => openPopup(popupForPlace));
profileForm.addEventListener('submit', handleProfileFormSumbit);
newPlaceForm.addEventListener('submit', handleNewPlaceFormSubmit);

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_type_error',
}); 