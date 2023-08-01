export const popups = document.querySelectorAll('.popup');
// Profile
export const profileForm = document.forms.profile;
export const nameInput = profileForm.elements.name;
export const jobInput = profileForm.elements.job;
export const profileSubmit = profileForm.elements.profileSubmit;
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');
// New place
export const newPlaceForm = document.forms.newPlace;
export const placeNameInput = newPlaceForm.elements.placeName;
export const newPlaceSubmit = newPlaceForm.elements.placeSubmit;
//Avatar
export const avatar = document.querySelector('.profile__avatar');
export const avatarForm = document.forms.avatar;
export const avatarSubmit = avatarForm.elements.avatarSubmit;
//Cards
export const cardsContainer = document.querySelector('.cards__list');
//Buttons
export const editButton = document.querySelector('.edit-button');
export const addButton = document.querySelector('.add-button');

export const validationSelectors = {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__submit',
        inactiveButtonClass: 'popup__submit_inactive',
        inputErrorClass: 'popup__input_type_error'
    }