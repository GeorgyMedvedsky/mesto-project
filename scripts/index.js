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
//Popup for photo
const popupForPhoto = page.querySelector('.popup-photo');
const popupImg = popupForPhoto.querySelector('.popup__img');
const popupDescription = popupForPhoto.querySelector('.popup__description');
//Main buttons
const editButton = page.querySelector('.edit-button');
const addButton = page.querySelector('.add-button');
//Profile data
const profileName = page.querySelector('.profile__name');
const profileJob = page.querySelector('.profile__job');
//Cards
const cardTemplate = document.querySelector('#card').content;
const cardsContainer = page.querySelector('.cards__list');

function openPopup(popup){
    popup.classList.add('popup_opened');
}
function closePopup(popup){
    popup.classList.remove('popup_opened');
}
function deleteCard(button) {
    button.closest('.card').remove();
}
function likeCard(button) {
    button.classList.toggle('like-button_active');
}
function showPhoto(cardImage) {
    popupImg.src = cardImage.src;
    popupImg.alt = cardImage.alt;
    popupDescription.textContent = cardImage.alt;
    openPopup(popupForPhoto);
}
function setCloseButtons() {
    page.querySelectorAll('.popup__close-button').forEach(button => {
        const buttonsPopup = button.closest('.popup');
        button.addEventListener('click', () => closePopup(buttonsPopup));
    }); 
}
function setSubmitButtons() {
    page.querySelectorAll('.popup__submit').forEach(button => {
        const buttonsPopup = button.closest('.popup');
        button.addEventListener('click', () => closePopup(buttonsPopup));
    });
}
function setDeleteButton(card) {
    const buttonItem = card.querySelector('.delete-button');
    buttonItem.addEventListener('click', () => deleteCard(buttonItem));
}
function setLikeButton(card) {
    const buttonItem = card.querySelector('.like-button');
    buttonItem.addEventListener('click', () => likeCard(buttonItem));
}
function setFullPhoto(card) {
    const cardImage = card.querySelector('.card__image');
    cardImage.addEventListener('click', () => showPhoto(cardImage));
}
function createCard(placeName, link) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardName = cardElement.querySelector('.card__name');
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = link;
    cardImage.alt = placeName;
    cardName.textContent = placeName;
    setDeleteButton(cardElement);
    setLikeButton(cardElement);
    setFullPhoto(cardElement);
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

initialCards.forEach(card => renderCard(createCard(card.name, card.link)));

popups.forEach(() => {
    setCloseButtons();
    setSubmitButtons();
});
editButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(popupForProfile);
});
addButton.addEventListener('click', () => {
    placeNameInput.value = '';
    linkInput.value = '';
    openPopup(popupForPlace);
});
formElementForProfile.addEventListener('submit', handleFormSubmitForProfile);
formElementForPlace.addEventListener('submit', handleFormSubmitForPlace);