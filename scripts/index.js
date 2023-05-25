//Popup
const page = document.querySelector('.page');
const popup = page.querySelector('.popup');
const formElement = page.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');

//Buttons
const editButton = page.querySelector('.edit-button');
const closeButton = popup.querySelector('.popup__close-button');
const submitButton = popup.querySelector('.popup__submit');

const profileName = page.querySelector('.profile__name');
const profileJob = page.querySelector('.profile__job');

//Functions
function closePopup(){
    popup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
}

//Handlers
editButton.addEventListener('click', function() {
    popup.classList.add('popup_opened');

    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
});
closeButton.addEventListener('click', function() {
    closePopup();
});
submitButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);