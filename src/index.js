import * as utils from './scripts/utils.js';
import { api } from './scripts/api.js';
import {Card} from './scripts/card.js';
import {FormValidator} from './scripts/validation.js';
import {Section} from './scripts/section.js';
import {Popup} from './scripts/popup.js';
import { PopupWithForm } from './scripts/popupWithForm.js';
import { PopupWithImage } from './scripts/popupWithImage.js';
import {UserInfo} from './scripts/user.js';
import './pages/index.css';

let profileId;
let profileClassLink;
let avatarClassLink;
let placeClassLink;
let profilePopupLink;
let placePopupLink;
export let imagePopupLink;
let avatarPopupLink;
export let popupWithImageClass;
export let profilePopupWithForm;
let placePopupWithForm;
let avatarPopupWithForm;
let userData;

function handleProfileFormSumbit(evt) {
    evt.preventDefault();

    const {name, job} = profilePopupWithForm.getInputValues();
    
    userData.setUserInfo(name, job);
}

function handleNewPlaceFormSubmit(evt) {
    evt.preventDefault();

    const {placeName, link} = placePopupWithForm.getInputValues();

    api.addNewCard(placeName, link)
        .then(cardData => {
            const card = new Card(cardData, utils.validationSelectors.cardSelectorId);
            const newCard = card.createCard(profileId);   
            const addCard = new Section({}, utils.cardsContainer);
            addCard.addItem(newCard);
            placePopupWithForm.closePopup(utils.popupForPlace);
        })
        .catch(err => console.error(err));
}

function handleUpdateAvatar(evt) {
    evt.preventDefault()

    const {avatar} = placePopupWithForm.getInputValues();

    api.updateAvatar(avatar)
        .then(data => {
            data.avatar = utils.avatarInput.value;
            utils.avatar.src = utils.avatarInput.value;
            avatarPopupWithForm.closePopup(utils.popupForAvatar);
        })
        .catch(err => console.error(err));
}

utils.popups.forEach((popup) => {
    const popupClass = new Popup(popup);

    if (popup.classList.contains('popup-profile')) {
        profilePopupLink = popupClass;
        profilePopupWithForm = new PopupWithForm(popup, handleProfileFormSumbit)
        profilePopupWithForm.setEventListeners()
    } else if (popup.classList.contains('popup-new-place')) {
        placePopupLink = popupClass;
        placePopupWithForm = new PopupWithForm(popup, handleNewPlaceFormSubmit)
        placePopupWithForm.setEventListeners()
    } else if (popup.classList.contains('popup-photo')) {
        imagePopupLink = popupClass;
        popupWithImageClass = new PopupWithImage(popup);
    } else if (popup.classList.contains('popup-avatar')) {
        avatarPopupLink = popupClass;
        avatarPopupWithForm = new PopupWithForm(popup, handleUpdateAvatar)
        avatarPopupWithForm.setEventListeners()
    }

    popupClass.setEventListeners()
})

utils.editButton.addEventListener('click', () => {
    utils.nameInput.value = utils.profileName.textContent;
    utils.jobInput.value = utils.profileJob.textContent;
    profilePopupLink.openPopup(utils.popupForProfile);
});
utils.addButton.addEventListener('click', () => placePopupLink.openPopup(utils.popupForPlace));
utils.avatar.addEventListener('click', () => avatarPopupLink.openPopup(utils.popupForAvatar));

function startValidation() {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach(formElement => {
        const formValidator = new FormValidator(utils.validationSelectors, formElement)

        switch (formElement.id) {
            case 'profile': 
                profileClassLink = formValidator;
                break;
            case 'newPlace': 
                placeClassLink = formValidator;
                break;
            case 'avatar': 
                avatarClassLink = formValidator;
                break;
        }

        formValidator.enableValidation();
    });
}

startValidation();

Promise.all([api.getProfileData(), api.getInitialCards()])
    .then(([resProfileData, resInitialCards]) => {
        utils.profileName.textContent = resProfileData.name;
        utils.profileJob.textContent = resProfileData.about;
        utils.avatar.src = resProfileData.avatar;
        profileId = resProfileData._id;
        userData = new UserInfo(resProfileData.name, resProfileData.about)

        const createdCards = resInitialCards.map(cardItem => {
            const card = new Card(cardItem, utils.validationSelectors.cardSelectorId);
            return card.createCard(profileId);
        });
        
        const addCard = new Section({items: createdCards, renderer: (item) => {
            addCard.addItem(item);
        }}, utils.cardsContainer);

        addCard.renderer()
    })
    .catch(err => console.error(err));