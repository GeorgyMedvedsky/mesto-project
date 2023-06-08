const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

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
const cardsContainer = page.querySelector('.cards__list');

function openPopup(popup){
    popup.classList.add('popup_opened');
}
function closePopup(popup){
    popup.classList.remove('popup_opened');
}
function deleteCard(button) {
    const cardItem = button.closest('.card');
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
function setDeleteButton(card) {
    const buttonItem = card.querySelector('.delete-button');
    buttonItem.addEventListener('click', () => deleteCard(buttonItem));
}
function createCard(placeName, link) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__name').textContent = placeName;
    cardElement.querySelector('.card__image').src = link;
    setDeleteButton(cardElement);
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
popups.forEach(item => {
    setCloseButton(item);
    setSubmitButton(item);
});

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