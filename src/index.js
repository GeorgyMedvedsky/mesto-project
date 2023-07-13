import * as modal from './scripts/modal.js';
import * as validation from './scripts/validation.js';
import * as api from './scripts/api.js';
import * as card from './scripts/card.js';
import './pages/index.css';

const popups = document.querySelectorAll('.popup');
const editButton = document.querySelector('.edit-button');
const addButton = document.querySelector('.add-button');
let profileId = undefined;

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) modal.closePopup(popup);
        if (evt.target.classList.contains('popup__close-button')) modal.closePopup(popup);
    });
})
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
api.getProfileData()
    .then(profileData => {
        modal.profileName.textContent = profileData.name;
        modal.profileJob.textContent = profileData.about;
        modal.avatar.src = profileData.avatar;
        profileId = profileData._id;
    })
    .catch(err => console.error(err));

api.getInitialCards()
    .then(data => {
        data.forEach(cardItem => {
            const newCard = card.createCard(cardItem, profileId)

            card.renderCard(newCard);
        });
    })
    .catch(err => console.error(err));