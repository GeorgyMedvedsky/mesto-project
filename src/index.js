import * as utils from './scripts/utils.js';
import { api } from './scripts/api.js';
import {Card} from './scripts/card.js';
import {FormValidator} from './scripts/validation.js';
import {Section} from './scripts/section.js';
import { PopupWithForm } from './scripts/popupWithForm.js';
import { PopupWithImage } from './scripts/popupWithImage.js';
import {UserInfo} from './scripts/user.js';
import './pages/index.css';

let profileId;
let userData;
let addCard;

let popupWithImage;
let profilePopupWithForm;
let placePopupWithForm;
let avatarPopupWithForm;

Promise.all([api.getProfileData(), api.getInitialCards()])
    .then(([resProfileData, resInitialCards]) => {
        userData = new UserInfo(resProfileData);
        infoObj = userData.getUserInfo();
    
        utils.profileName.textContent = userData.getUserInfo().name;
        utils.profileJob.textContent = userData.getUserInfo().about;
        utils.avatar.src = userData.getUserInfo().avatar;
        profileId = userData.getUserInfo()._id;

        const createdCards = resInitialCards.map(cardItem => {
            return createCard(cardItem);
        });
        
        addCard = new Section({items: createdCards, renderer: (item) => {
            addCard.addItem(item);
        }}, utils.cardsContainer);

        addCard.renderer()
    })
    .catch(err => console.error(err));

function createCard(item) {
    const newCard = new Card(item, '#card', api, popupWithImage);
    return newCard.createCard(profileId)
}

function handleProfileFormSumbit(evt) {
    evt.preventDefault();

    const {name, job} = profilePopupWithForm.handleSubmit();
    
    api.setProfileData(name, job)
    .then((profileData) => {
            userData.setUserInfo(profileData);
            utils.profileName.textContent = userData.getUserInfo().name;
            utils.profileJob.textContent = userData.getUserInfo().about;
            profilePopupWithForm.closePopup(utils.popupForProfile);
        })
        .catch(err => console.error(err))
        .finally()
}

function handleNewPlaceFormSubmit(evt) {
    evt.preventDefault();

    const {placeName, link} = placePopupWithForm.handleSubmit();
    
    api.addNewCard(placeName, link)
        .then(cardData => {
            const card = createCard(cardData)
            addCard.addItem(card);
            placePopupWithForm.closePopup(utils.popupForPlace);
        })
        .catch(err => console.error(err));
}

function handleUpdateAvatar(evt) {
    evt.preventDefault()

    const {avatar} = avatarPopupWithForm.handleSubmit();
    
    api.updateAvatar(avatar)
        .then(data => {
            userData.setUserInfo(data);
            utils.avatar.src = userData.getUserInfo().avatar;
            avatarPopupWithForm.closePopup(utils.popupForAvatar);
        })
        .catch(err => console.error(err))
}

utils.popups.forEach((popup) => {
    if (popup.classList.contains('popup-profile')) {
        profilePopupWithForm = new PopupWithForm('.popup-profile', handleProfileFormSumbit)
        profilePopupWithForm.setEventListeners()
    } else if (popup.classList.contains('popup-new-place')) {
        placePopupWithForm = new PopupWithForm('.popup-new-place', handleNewPlaceFormSubmit)
        placePopupWithForm.setEventListeners()
    } else if (popup.classList.contains('popup-photo')) {
        popupWithImage = new PopupWithImage('.popup-photo', utils.popupImg, utils.popupDescription);
        popupWithImage.setEventListeners();
    } else if (popup.classList.contains('popup-avatar')) {
        avatarPopupWithForm = new PopupWithForm('.popup-avatar', handleUpdateAvatar)
        avatarPopupWithForm.setEventListeners()
    }
})

utils.editButton.addEventListener('click', () => {
    utils.nameInput.value = userData.getUserInfo().name;
    utils.jobInput.value = userData.getUserInfo().about;
    profilePopupWithForm.openPopup(utils.popupForProfile);
});
utils.addButton.addEventListener('click', () => placePopupWithForm.openPopup(utils.popupForPlace));
utils.avatar.addEventListener('click', () => avatarPopupWithForm.openPopup(utils.popupForAvatar));

function startValidation() {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach(formElement => {
        const formValidator = new FormValidator(utils.validationSelectors, formElement)

        formValidator.enableValidation();
    });
}

startValidation();