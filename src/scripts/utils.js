export const popups = document.querySelectorAll('.popup');
//Popup for profile
export const popupForProfile = document.querySelector('.popup-profile');
export const profileForm = document.forms.profile;
export const nameInput = profileForm.elements.name;
export const jobInput = profileForm.elements.job;
//Popup for new place
export const popupForPlace = document.querySelector('.popup-new-place');
export const newPlaceForm = document.forms.newPlace;
export const placeNameInput = newPlaceForm.elements.placeName;
export const linkInput = newPlaceForm.elements.link;
//Popup for photo
export const popupForPhoto = document.querySelector('.popup-photo');
export const popupImg = popupForPhoto.querySelector('.popup__img');
export const popupDescription = popupForPhoto.querySelector('.popup__description');
//Profile
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');
//Avatar
export const avatar = document.querySelector('.profile__avatar');
export const popupForAvatar = document.querySelector('.popup-avatar');
export const avatarForm = document.forms.avatar;
export const avatarInput = avatarForm.elements.avatar;
//Cards
export const cardsContainer = document.querySelector('.cards__list');
//Buttons
export const editButton = document.querySelector('.edit-button');
export const addButton = document.querySelector('.add-button');
export const submitBtnForProfile = profileForm.querySelector('.popup__submit');

export const validationSelectors = {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__submit',
        inactiveButtonClass: 'popup__submit_inactive',
        inputErrorClass: 'popup__input_type_error',
        cardSelectorId: '#card'
    }