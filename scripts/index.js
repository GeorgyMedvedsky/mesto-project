const page = document.querySelector('.page');
const popups = page.querySelectorAll('.popup');
//Popup for profile
const popupForProfile = page.querySelector('.popup-profile');
const formElementForProfile = popupForProfile.querySelector('.popup__form');
const nameInput = formElementForProfile.querySelector('.popup__input_type_name');
const jobInput = formElementForProfile.querySelector('.popup__input_type_job');
//Popup for new place
const popupForPlace = page.querySelector('.popup-new-place');
const formElementForPlace = popupForPlace.querySelector('.popup__form');
const placeNameInput = formElementForPlace.querySelector('.popup__input_type_place');
const linkInput = formElementForPlace.querySelector('.popup__input_type_link');

const editButton = page.querySelector('.edit-button');
const addButton = page.querySelector('.add-button');

const profileName = page.querySelector('.profile__name');
const profileJob = page.querySelector('.profile__job');

const cardTemplate = document.querySelector('#card');
const cardsContainer = document.querySelector('.cards__list');

for(let j = 0; j < popups.length; j++) {
    setCloseButton(popups[j]);
    setSubmitButton(popups[j]);
}

function openPopup(popup){
    popup.classList.add('popup_opened');
}
function closePopup(popup){
    popup.classList.remove('popup_opened');
}
function setCloseButton(popupElement) {
    const closeButtons = page.querySelectorAll('.popup__close-button');
    for(let i = 0; i < closeButtons.length; i++) {
        closeButtons[i].addEventListener('click', () => closePopup(popupElement));
    }
}
function setSubmitButton(popupElement) {
    const submitButtons = page.querySelectorAll('.popup__submit');
    for(let i = 0; i < submitButtons.length; i++) {
        submitButtons[i].addEventListener('click', () => closePopup(popupElement));
    }
}
function handleFormSubmitForProfile(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
}
function handleFormSubmitForPlace(evt) {
    evt.preventDefault();
    getCard(placeNameInput.value, linkInput.value);
    placeNameInput.value = '';
    linkInput.value = '';
}
function getCard(placeName, link) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__name').textContent = placeName;
    cardElement.querySelector('.card__image').src = link;
    cardsContainer.prepend(cardElement);
}

//Handlers
editButton.addEventListener('click', () => {
    openPopup(popupForProfile);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
});
addButton.addEventListener('click', () => {
    openPopup(popupForPlace);
    placeNameInput.value = '';
    linkInput.value = '';
});
formElementForProfile.addEventListener('submit', handleFormSubmitForProfile);
formElementForPlace.addEventListener('submit', handleFormSubmitForPlace)