export class Section {
    constructor({items = [], renderer = null}, selector) {
        this._items = items;
        this._renderer = renderer;
        this._container = selector;
    }

    addItem(item) {
        this._container.prepend(item);
    }

    renderer() {
        this._items.reverse().forEach(item => {
            this._renderer(item);
        })
    }
}   