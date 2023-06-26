import {
    createCard,
    renderCard
} from './card.js';

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
    document.addEventListener('click', evt => overlayClickHandler(evt));
    document.addEventListener('keydown', evt => popupCloseHandlerOnEsc(evt, popup));
}
function closePopup(popup){
    popup.classList.remove('popup_opened');
    document.removeEventListener('click', evt => overlayClickHandler(evt));
    document.removeEventListener('keydown', evt => popupCloseHandlerOnEsc(evt, popup));
}
function overlayClickHandler(evt){
    if(!evt.target.classList.contains('popup__container')) closePopup(evt.target);
}
function popupCloseHandlerOnEsc(evt, popup) {
    if(evt.key === 'Escape' && popup.classList.contains('popup_opened')) closePopup(popup);
}
function setProfileFormSumbit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupForProfile);
}
function setNewPlaceFormSubmit(evt) {
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
    overlayClickHandler,
    popupCloseHandlerOnEsc,
    setProfileFormSumbit,
    setNewPlaceFormSubmit
};