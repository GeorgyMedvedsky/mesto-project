import * as api from './api.js';
import * as card from './card.js';
import * as utils from './utils.js';
import * as validation from './validation.js';

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
export const avatar = document.querySelector('.profile__avatar');

export function openPopup(popup){
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
}
export function closePopup(popup){
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
}
export function closeByEsc(evt) {
    if(evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}
export function handleProfileFormSumbit(evt) {
    evt.preventDefault();

    const buttonElement = profileForm.querySelector('.popup__submit');

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    
    utils.setProfileData(profileName.textContent, profileJob.textContent);
    validation.disableButtonSumbit(buttonElement, true);
    buttonElement.classList.add('popup__submit_inactive');
    closePopup(popupForProfile);
}
export function handleNewPlaceFormSubmit(evt) {
    evt.preventDefault();
    const cardObj = {
        name: placeNameInput.value,
        link: linkInput.value
    }
    utils.addNewCardToServer(cardObj)
    card.renderCard(card.createCard(cardObj));
    newPlaceForm.reset();
    closePopup(popupForPlace);
}
