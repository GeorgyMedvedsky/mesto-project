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
// let profileClassLink;
// let avatarClassLink;
// let placeClassLink;
// let profilePopupLink;
// let placePopupLink;
export let imagePopupLink;
// let avatarPopupLink;
export let popupWithImageClass;
export let profilePopupWithForm;
let placePopupWithForm;
let avatarPopupWithForm;
let userData;

function handleProfileFormSumbit(evt) { //dffdfsfgdsa
    evt.preventDefault();

    const {name, job} = profilePopupWithForm.getInputValues();
    
    userData.setUserInfo(name, job);
}

function handleNewPlaceFormSubmit(evt) {
    evt.preventDefault();

    const {placeName, link} = placePopupWithForm.getInputValues();

    api.addNewCard(placeName, link)
        .then(cardData => {
            const card = new Card(cardData, utils.validationSelectors.cardSelectorId, api, popupWithImageClass);
            const newCard = card.createCard(profileId);   
            const addCard = new Section({}, utils.cardsContainer);
            addCard.addItem(newCard);
            placePopupWithForm.closePopup(utils.popupForPlace);
        })
        .catch(err => console.error(err));
}

function handleUpdateAvatar(evt) {
    evt.preventDefault()

    const {avatar} = avatarPopupWithForm.getInputValues();
    

    api.updateAvatar(avatar)
        .then(data => {
            data.avatar = avatar;
            utils.avatar.src = avatar;
            avatarPopupWithForm.closePopup(utils.popupForAvatar);
        })
        .catch(err => console.error(err));
}

utils.popups.forEach((popup) => {
    if (popup.classList.contains('popup-profile')) {
        profilePopupWithForm = new PopupWithForm(popup, handleProfileFormSumbit)
        profilePopupWithForm.setEventListeners()
    } else if (popup.classList.contains('popup-new-place')) {
        placePopupWithForm = new PopupWithForm(popup, handleNewPlaceFormSubmit)
        placePopupWithForm.setEventListeners()
    } else if (popup.classList.contains('popup-photo')) {
        popupWithImageClass = new PopupWithImage(popup, utils.popupImg, utils.popupDescription);
    } else if (popup.classList.contains('popup-avatar')) {
        avatarPopupWithForm = new PopupWithForm(popup, handleUpdateAvatar)
        avatarPopupWithForm.setEventListeners()
    }
})

utils.editButton.addEventListener('click', () => {
    utils.nameInput.value = utils.profileName.textContent;
    utils.jobInput.value = utils.profileJob.textContent;
    profilePopupWithForm.openPopup(utils.popupForProfile);
});
utils.addButton.addEventListener('click', () => placePopupWithForm.openPopup(utils.popupForPlace));
utils.avatar.addEventListener('click', () => avatarPopupWithForm.openPopup(utils.popupForAvatar));

function startValidation() {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach(formElement => {
        const formValidator = new FormValidator(utils.validationSelectors, formElement)
        
        // switch (formElement.id) {
        //     case 'profile': 
        //         profileClassLink = formValidator;
        //         break;
        //     case 'newPlace': 
        //         placeClassLink = formValidator;
        //         break;
        //     case 'avatar': 
        //         avatarClassLink = formValidator;
        //         break;
        // }

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
            const card = new Card(cardItem, utils.validationSelectors.cardSelectorId, api, popupWithImageClass);
            return card.createCard(profileId);
        });
        
        const addCard = new Section({items: createdCards, renderer: (item) => {
            addCard.addItem(item);
        }}, utils.cardsContainer);

        addCard.renderer()
    })
    .catch(err => console.error(err));