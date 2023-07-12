import * as api from './api.js';
import * as card from './card.js';
import * as modal from './modal.js';

export function getInitialCards() {
    api.getInitialCards()
    .then(data => {
        data.forEach(cardItem => {
            const newCard = card.createCard(cardItem)

            card.renderCard(newCard);
        });
    })
    .catch(err => console.error(err));
}

export function getProfileData() {
    api.getProfileData()
    .then(profileData => {
        modal.profileName.textContent = profileData.name;
        modal.profileJob.textContent = profileData.about;
        modal.avatar.src = profileData.avatar;
    })
    .catch(err => console.error(err));
}

export function setProfileData(name, about) {
    api.setProfileData(name, about);
}

export function addNewCardToServer({name, link}) {
    api.addNewCardToServer(name, link)
}