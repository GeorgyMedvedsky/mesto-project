import { initialCards } from './cards.js';
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
    setProfileFormSumbit,
    setNewPlaceFormSubmit
} from './modal.js';
import {
    setCloseButtons,
    createCard,
    renderCard
} from './card.js';
import { enableValidation } from './validation.js';

const popups = document.querySelectorAll('.popup');
const editButton = document.querySelector('.edit-button');
const addButton = document.querySelector('.add-button');

initialCards.forEach(card => renderCard(createCard(card)));

popups.forEach(() => setCloseButtons());

editButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(popupForProfile);
});

addButton.addEventListener('click', () => {
    openPopup(popupForPlace);
});

profileForm.addEventListener('submit', setProfileFormSumbit);
newPlaceForm.addEventListener('submit', setNewPlaceFormSubmit);

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_type_error',
  }); 