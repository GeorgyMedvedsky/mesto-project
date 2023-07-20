import * as modal from './scripts/modal.js';
import { api } from './scripts/api.js';
import * as utils from './scripts/utils.js';
import './pages/index.css';
import {Card} from './scripts/card.js';
import {FormValidator} from './scripts/validation.js';

console.log(Card)

let profileId = undefined;

const getProfileData = () => {
    return api.getProfileData();
};

const getInitialCards = () => {
    return api.getInitialCards();
};

function renderCard(cardItem){
    utils.cardsContainer.prepend(cardItem);
}

function handleProfileFormSumbit(evt) {
    evt.preventDefault();
    
    console.log(evt.target.closest('.popup__form'))
    
    api.setProfileData(utils.nameInput.value, utils.jobInput.value)
        .then(() => {
            utils.profileName.textContent = utils.nameInput.value;
            utils.profileJob.textContent = utils.jobInput.value;
            //validation.disableButtonSumbit(utils.submitBtnForProfile, true);
            modal.closePopup(utils.popupForProfile);
        })
        .catch(err => console.error(err)); 
}

function handleNewPlaceFormSubmit(evt) {
    evt.preventDefault();

    api.addNewCard(utils.placeNameInput.value, utils.linkInput.value)
        .then(cardData => {
            const card = new Card(cardData, '#card');
            const newCard = card.createCard(profileId);
            renderCard(newCard);
            utils.newPlaceForm.reset();
            modal.closePopup(utils.popupForPlace);
        })
        .catch(err => console.error(err));
}

function handleUpdateAvatar(evt) {
    evt.preventDefault()

    api.updateAvatar(utils.avatarInput.value)
        .then(data => {
            data.avatar = utils.avatarInput.value;
            utils.avatar.src = utils.avatarInput.value;
            utils.avatarForm.reset();
            modal.closePopup(utils.popupForAvatar);
        })
        .catch(err => console.error(err));
}

utils.popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) modal.closePopup(popup);
        if (evt.target.classList.contains('popup__close-button')) modal.closePopup(popup);
    });
})
utils.editButton.addEventListener('click', () => {
    utils.nameInput.value = utils.profileName.textContent;
    utils.jobInput.value = utils.profileJob.textContent;
    modal.openPopup(utils.popupForProfile);
});
utils.addButton.addEventListener('click', () => modal.openPopup(utils.popupForPlace));
utils.profileForm.addEventListener('submit', handleProfileFormSumbit);
utils.newPlaceForm.addEventListener('submit', handleNewPlaceFormSubmit);
utils.avatar.addEventListener('click', () => modal.openPopup(utils.popupForAvatar));
utils.avatarForm.addEventListener('submit', handleUpdateAvatar);

function startValidation() {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    const formatedList = formList.map((form) => {
        console.log(form.name) /// dsadsakdkaskd
    });
    console.log(formatedList)
    formList.forEach(formElement => {
        const formValidator = new FormValidator({
            formSelector: '.popup__form',
            inputSelector: '.popup__input',
            submitButtonSelector: '.popup__submit',
            inactiveButtonClass: 'popup__submit_inactive',
            inputErrorClass: 'popup__input_type_error',
        }, formElement)

        formValidator.enableValidation();
    });
}

startValidation();

Promise.all([getProfileData(), getInitialCards()])
    .then(([resProfileData, resInitialCards]) => {
        utils.profileName.textContent = resProfileData.name;
        utils.profileJob.textContent = resProfileData.about;
        utils.avatar.src = resProfileData.avatar;
        profileId = resProfileData._id;

        resInitialCards.forEach(cardItem => {
            const card = new Card(cardItem, "#card");
            const newCard = card.createCard(profileId);

            renderCard(newCard);
        });
    })
    .catch(err => console.error(err));