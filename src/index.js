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
let infoObject;
let addCard;

let popupWithImage;
let profilePopupWithForm;
let placePopupWithForm;
let avatarPopupWithForm;

Promise.all([api.getProfileData(), api.getInitialCards()])
    .then(([resProfileData, resInitialCards]) => {
        userData = new UserInfo(resProfileData);
        infoObject = userData.getUserInfo();
        utils.profileName.textContent = infoObject.name;
        utils.profileJob.textContent = infoObject.about;
        utils.avatar.src = infoObject.avatar;
        profileId = infoObject._id;

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

function finallyChangeBtn(btn) {
    btn.value = 'Сохранение...';
}

function handleProfileFormSumbit(evt) {
    evt.preventDefault();

    const {name, job} = profilePopupWithForm.handleSubmit();
    
    api.setProfileData(name, job)
    .then((profileData) => {
            userData.setUserInfo(profileData);
            infoObject = userData.getUserInfo();
            utils.profileName.textContent = infoObject.name;
            utils.profileJob.textContent = infoObject.about;
            profilePopupWithForm.closePopup();
        })
        .catch(err => console.error(err))
        .finally(() => {
            finallyChangeBtn(utils.profileSubmit);
        })
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
        .catch(err => console.error(err))
        .finally(() => {
            finallyChangeBtn(utils.newPlaceSubmit);
        })
}

function handleUpdateAvatar(evt) {
    evt.preventDefault()

    const {avatar} = avatarPopupWithForm.handleSubmit();
    
    api.updateAvatar(avatar)
        .then(data => {
            userData.setUserInfo(data);
            infoObject = userData.getUserInfo();
            utils.avatar.src = infoObject.avatar;
            avatarPopupWithForm.closePopup(utils.popupForAvatar);
        })
        .catch(err => console.error(err))
        .finally(() => {
            finallyChangeBtn(utils.avatarSubmit);
        })
}

utils.popups.forEach((popup) => {
    if (popup.classList.contains('popup-profile')) {
        profilePopupWithForm = new PopupWithForm('.popup-profile', handleProfileFormSumbit)
        profilePopupWithForm.setEventListeners()
    } else if (popup.classList.contains('popup-new-place')) {
        placePopupWithForm = new PopupWithForm('.popup-new-place', handleNewPlaceFormSubmit)
        placePopupWithForm.setEventListeners()
    } else if (popup.classList.contains('popup-photo')) {
        popupWithImage = new PopupWithImage('.popup-photo');
        popupWithImage.setEventListeners()
    } else if (popup.classList.contains('popup-avatar')) {
        avatarPopupWithForm = new PopupWithForm('.popup-avatar', handleUpdateAvatar)
        avatarPopupWithForm.setEventListeners()
    }
})

utils.editButton.addEventListener('click', () => {
    infoObject = userData.getUserInfo();
    utils.nameInput.value = infoObject.name;
    utils.jobInput.value = infoObject.about;
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