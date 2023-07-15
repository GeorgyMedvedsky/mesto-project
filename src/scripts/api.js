const config = {
    baseUrl: 'https://nomoreparties.co/plus-cohort-26',
    headers: {
        authorization: '150d7da5-c5ff-47a3-9dc0-d14b9b96c88c',
        'Content-Type': 'application/json'
    }
}
const checkResponse = res => !res.ok ? Promise.reject(`Ошибка: ${res.status}`) : res.json();

export function getInitialCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then(res => checkResponse(res))
}

export function getProfileData() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(res => checkResponse(res))
}

export function setProfileData(name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({name, about})
    })
    .then(res => checkResponse(res))
}

export function addNewCard(name, link) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({name, link})
    })
    .then(res => checkResponse(res))
}

export function deleteCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(res => checkResponse(res))
}

export function updateAvatar(avatar) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({avatar})
    })
    .then(res => checkResponse(res))  
}

export function setLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then(res => checkResponse(res))
}

export function deleteLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(res => checkResponse(res))
}