import { api } from './api.js';

export class UserInfo {
    constructor(name, about, avatar, id){
        this._name = name;
        this._about = about;
        this._avatar = avatar;
        this._id = id;
    }

    getUserInfo() {
        return {name: this._name, about: this._about, avatar: this._avatar, id: this._id};
    }

    setUserInfo(name, about) {
        this._name = name;
        this._about = about;
        return api.setProfileData(this._name, this._about)
    }
}