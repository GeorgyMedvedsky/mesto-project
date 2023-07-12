export const config = {
    baseUrl: 'https://nomoreparties.co/plus-cohort-26',
    headers: {
        authorization: '150d7da5-c5ff-47a3-9dc0-d14b9b96c88c',
        'Content-Type': 'application/json'
    }
}

export function getInitialCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then(res => {
        if(!res.ok) return Promise.reject(`Ошибка: ${res.status}`);
        return res.json()
    })
}

export function getProfileData() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(res => {
        if(!res.ok) return Promise.reject(`Ошибка: ${res.status}`);
        return res.json()
    })
}

export function setProfileData(name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({name, about})
    })
    .then(res => {
        if(!res.ok) return Promise.reject(`Ошибка: ${res.status}`);
        return res.json()
    })
}

export function addNewCardToServer(name, link) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({name, link})
    })
    .then(res => {
        if(!res.ok) return Promise.reject(`Ошибка: ${res.status}`);
        return res.json()
    })
}
// export const deleteCardFromServer = (cardData) => {
//     const cardId = cardData._id;

//     fetch(`${config.baseUrl}/cards/${cardId}`, {
//         method: 'DELETE',
//         headers: config.headers
//     })
//     .then(res => {
//         if(!res.ok) return Promise.reject(`Ошибка: ${res.status}`);
//         return res.json();
//     })
// }