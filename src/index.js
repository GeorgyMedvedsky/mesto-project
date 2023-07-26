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





export let imagePopupLink;

let popupWithImageClass;
export let profilePopupWithForm;
let placePopupWithForm;
let avatarPopupWithForm;
let userData;
let addCard;

function handleProfileFormSumbit(evt) {
    evt.preventDefault();

    const {name, job} = profilePopupWithForm.handleSubmit();
    
    api.setProfileData(name, job)
        .then((profileData) => {
            userData.setUserInfo(profileData);
            utils.profileName.textContent = name;
            utils.profileJob.textContent = job;
            profilePopupWithForm.closePopup(utils.popupForProfile);
        })
        .catch(err => console.error(err));
    
    
}

function handleNewPlaceFormSubmit(evt) {
    evt.preventDefault();

    const {placeName, link} = placePopupWithForm.handleSubmit();
    
    api.addNewCard(placeName, link)
        .then(cardData => {
            const card = new Card(cardData, utils.validationSelectors.cardSelectorId, api, popupWithImageClass);
            const newCard = card.createCard(profileId);   
            addCard.addItem(newCard);
            placePopupWithForm.closePopup(utils.popupForPlace);
        })
        .catch(err => console.error(err));
}

function handleUpdateAvatar(evt) {
    evt.preventDefault()

    const {avatar} = avatarPopupWithForm.handleSubmit();
    
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
        userData = new UserInfo(resProfileData);

        const createdCards = resInitialCards.map(cardItem => {
            const card = new Card(cardItem, utils.validationSelectors.cardSelectorId, api, popupWithImageClass);
            return card.createCard(profileId);
        });
        
        addCard = new Section({items: createdCards, renderer: (item) => {
            addCard.addItem(item);
        }}, utils.cardsContainer);

        addCard.renderer()
    })
    .catch(err => console.error(err));