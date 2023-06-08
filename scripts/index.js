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

const cardTemplate = document.querySelector('#card').content;
const cardsContainer = document.querySelector('.cards__list');

popups.forEach(item => {
    setCloseButton(item);
    setSubmitButton(item);
});

function openPopup(popup){
    popup.classList.add('popup_opened');
}
function closePopup(popup){
    popup.classList.remove('popup_opened');
}
function deleteCard(deleteButton) {
    const cardItem = deleteButton.closest('.card');
    cardItem.remove();
}
function setCloseButton(popup) {
    const closeButtons = page.querySelectorAll('.popup__close-button');
    closeButtons.forEach(item => item.addEventListener('click', () => closePopup(popup)));
}
function setSubmitButton(popup) {
    const submitButtons = page.querySelectorAll('.popup__submit');
    submitButtons.forEach(item => item.addEventListener('click', () => closePopup(popup)));
}
function setDeleteButton() {
    const deleteButtons = page.querySelectorAll('.delete-button');
    for(let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => deleteCard(deleteButtons[i]));
    }
}
function createCard(placeName, link) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__name').textContent = placeName;
    cardElement.querySelector('.card__image').src = link;
    return cardElement;
}
function renderCard(cardItem){
    cardsContainer.prepend(cardItem);
}
function handleFormSubmitForProfile(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
}
function handleFormSubmitForPlace(evt) {
    evt.preventDefault();
    renderCard(createCard(placeNameInput.value, linkInput.value));
    placeNameInput.value = '';
    linkInput.value = '';
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
formElementForPlace.addEventListener('submit', handleFormSubmitForPlace);
setDeleteButton();