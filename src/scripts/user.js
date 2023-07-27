export class UserInfo {
    constructor({name, about, avatar, _id}){
        this._name = name;
        this._about = about;
        this._avatar = avatar;
        this._id = _id;
    }

    getUserInfo() {
        return {name: this._name, about: this._about, avatar: this._avatar, _id: this._id};
    }

    setUserInfo({name, about, avatar, _id}) {
        this._name = name;
        this._about = about;
        this._avatar = avatar;
        this._id = _id;
    }
}