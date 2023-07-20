class Api {
    constructor(config) {
        this.config = config;
    }

    _checkResponse(res) {
        return !res.ok ? Promise.reject(`Ошибка: ${res.status}`) : res.json();
    }

    getInitialCards() {
        return fetch(`${this.config.baseUrl}/cards`, {
            headers: this.config.headers
        })
        .then(res => this._checkResponse(res))
    }

    getProfileData() {
        return fetch(`${this.config.baseUrl}/users/me`, {
            headers: this.config.headers
        })
        .then(res => this._checkResponse(res))
    }

    setProfileData(name, about) {
        return fetch(`${this.config.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.config.headers,
            body: JSON.stringify({name, about})
        })
        .then(res => this._checkResponse(res))
    }

    addNewCard(name, link) {
        return fetch(`${this.config.baseUrl}/cards`, {
            method: 'POST',
            headers: this.config.headers,
            body: JSON.stringify({name, link})
        })
        .then(res => this._checkResponse(res))
    }

    deleteCard(cardId) {
        return fetch(`${this.config.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.config.headers
        })
        .then(res => this._checkResponse(res))
    }

    updateAvatar(avatar) {
        return fetch(`${this.config.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.config.headers,
            body: JSON.stringify({avatar})
        })
        .then(res => this._checkResponse(res))  
    }

    setLike(cardId) {
        return fetch(`${this.config.baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this.config.headers
        })
        .then(res => this._checkResponse(res))
    }

    deleteLike(cardId) {
        return fetch(`${this.config.baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this.config.headers
        })
        .then(res => this._checkResponse(res))
    }

}

export const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-26',
    headers: {
        authorization: '150d7da5-c5ff-47a3-9dc0-d14b9b96c88c',
        'Content-Type': 'application/json'
    }
})