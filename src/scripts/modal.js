import {
    createCard,
    renderCard
} from './card.js';
import {disableButtonSumbit} from './validation.js';

//Popup for profile
const popupForProfile = document.querySelector('.popup-profile');
const profileForm = document.forms.profile;
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.job;
//Popup for new place
const popupForPlace = document.querySelector('.popup-new-place');
const newPlaceForm = document.forms.newPlace;
const placeNameInput = newPlaceForm.elements.placeName;
const linkInput = newPlaceForm.elements.link;
//Popup for photo
const popupForPhoto = document.querySelector('.popup-photo');
const popupImg = popupForPhoto.querySelector('.popup__img');
const popupDescription = popupForPhoto.querySelector('.popup__description');
//Profile
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

function openPopup(popup){
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
}
function closePopup(popup){
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
}
function closeByEsc(evt) {
    if(evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}
function handleProfileFormSumbit(evt) {
    evt.preventDefault();
    const buttonElement = profileForm.querySelector('.popup__submit');
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    disableButtonSumbit(buttonElement, true);
    buttonElement.classList.add('popup__submit_inactive');
    closePopup(popupForProfile);
}
function handleNewPlaceFormSubmit(evt) {
    evt.preventDefault();
    const cardObj = {
        name: placeNameInput.value,
        link: linkInput.value,
    }
    renderCard(createCard(cardObj));
    newPlaceForm.reset();
    closePopup(popupForPlace);
}

export {
    popupForProfile,
    profileForm,
    nameInput,
    jobInput,
    popupForPlace,
    newPlaceForm,
    placeNameInput,
    linkInput,
    popupForPhoto,
    popupImg,
    popupDescription,
    profileName,
    profileJob,
    openPopup,
    closePopup,
    closeByEsc,
    handleProfileFormSumbit,
    handleNewPlaceFormSubmit
};