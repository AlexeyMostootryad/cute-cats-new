class CatEdit {
    constructor(selectorTemplate, handleEditCat) {
        this._selectorTemplate = selectorTemplate;
        this._handleEditCat = handleEditCat;
        this._data = {};
    }

    _getTemplate() {
        return document.querySelector(this._selectorTemplate).content.children[0];
    }

    getElement() {
        this.element = this._getTemplate().cloneNode(true);

        this.buttonSaved = this.element.querySelector('#saved');
        this.catImageText = this.element.querySelector('.form__input_image');
        this.catImage = this.element.querySelector('.form__image-edit');
        this.catName = this.element.querySelector('.form__input-name');
        this.catRate = this.element.querySelector('.form__input-rate');
        this.catId = this.element.querySelector('.form__input-id');
        this.catDesc = this.element.querySelector('.form__textarea-edit');
        this.catAge = this.element.querySelector('.form__input-age');
        this.catFav = this.element.querySelector('.form__checkbox');

        this.setEventListener();
        return this.element;
    }

    setData(cardInstance) {
        this._cardInstance = cardInstance;
        this._data = this._cardInstance.getData();
        this.catImageText.value = this._data.img_link;
        this.catImage.style.backgroundImage = `url(${this._data.img_link})`;
        this.catName.value = this._data.name;
        this.catRate.value = this._data.rate;
        this.catId.value = this._data.id;
        this.catDesc.innerHTML = this._data.description;
        this.catAge.value = this._data.age;
        this.catFav.checked = this._data.favourite;
    }

    setEventListener() {
        this.buttonSaved.addEventListener('click', () => this._handleEditCat(this._cardInstance));
    }
}