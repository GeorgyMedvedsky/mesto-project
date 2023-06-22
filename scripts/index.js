const page = document.querySelector('.page');
const popups = page.querySelectorAll('.popup');
//Popup for profile
const popupForProfile = page.querySelector('.popup-profile');
const profileForm = document.forms.profile;
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.job;
//Popup for new place
const popupForPlace = page.querySelector('.popup-new-place');
const newPlaceForm = document.forms.newPlace;
const placeNameInput = newPlaceForm.elements.placeName;
const linkInput = newPlaceForm.elements.link;
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

function overlayClickHandler(evt){
    if(!evt.target.classList.contains('popup__container')) closePopup(evt.target);
}
function popupCloseHandlerOnEsc(evt, popup) {
    if(evt.key === 'Escape' && popup.classList.contains('popup_opened')) closePopup(popup);
}
function openPopup(popup){
    popup.classList.add('popup_opened');
    document.addEventListener('click', evt => overlayClickHandler(evt));
    document.addEventListener('keydown', evt => popupCloseHandlerOnEsc(evt, popup));
}
function closePopup(popup){
    popup.classList.remove('popup_opened');
    document.removeEventListener('click', evt => overlayClickHandler(evt));
    document.removeEventListener('keydown', evt => popupCloseHandlerOnEsc(evt, popup));
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
function createCard(cardData) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardName = cardElement.querySelector('.card__name');
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardName.textContent = cardData.name;
    setDeleteButton(cardElement);
    setLikeButton(cardElement);
    setFullPhoto(cardElement);
    return cardElement;
}
function renderCard(cardItem){
    cardsContainer.prepend(cardItem);
}
function setProfileFormSumbit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupForProfile);
}
function setNewPlaceFormSubmit(evt) {
    evt.preventDefault();
    const cardObj = {
        name: placeNameInput.value,
        link: linkInput.value,
    }
    renderCard(createCard(cardObj));
    newPlaceForm.reset();
    closePopup(popupForPlace);
}

initialCards.forEach(card => renderCard(createCard(card)));

popups.forEach(() => setCloseButtons());

editButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(popupForProfile);
});
addButton.addEventListener('click', () => {
    openPopup(popupForPlace);
});
profileForm.addEventListener('submit', setProfileFormSumbit);
newPlaceForm.addEventListener('submit', setNewPlaceFormSubmit);