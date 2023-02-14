class CatsInfo {
    constructor(selectorTemplate, handleDeleteCat, handleEditorCat) {
        this._selectorTemplate = selectorTemplate;
        this._handleDeleteCat = handleDeleteCat;
        this._handleEditorCat = handleEditorCat;
        this._data = {};
    }

    _getTemplate() {
        return document.querySelector(this._selectorTemplate).content.children[0];
    }

    getElement() {
        this.element = this._getTemplate().cloneNode(true);

        this.buttonCatEdit = this.element.querySelector('.cat-info__edited');
        this.buttonDeleted = this.element.querySelector('.cat-info__deleted');
        this.catImage = this.element.querySelector('.cat-info__image');
        this.catName = this.element.querySelector('.cat-info__name');
        this.catRate = this.element.querySelector('.cat-info__rate');
        this.catId = this.element.querySelector('.cat-info__id');
        this.catDesc = this.element.querySelector('.cat-info__desc');
        this.catAgeVal = this.element.querySelector('.cat-info__age-val');
        this.catAgeText = this.element.querySelector('.cat-info__age-text');
        this.catFav = this.element.querySelector('.cat-info__favourite');

        this.setEventListener();
        return this.element;
    }

    setData(cardInstance) {
        this._cardInstance = cardInstance;
        this._data = this._cardInstance.getData();
        this.catImage.src = this._data.img_link;
        this.catName.innerHTML = this._data.name;
        this.catRate.innerHTML = this._data.rate;
        this.catId.innerHTML = this._data.id;
        this.catDesc.innerHTML = this._data.description;
        this.catAgeVal.innerHTML = this._data.age;
        this.catAgeText.innerHTML = this._data.age > 0 ? this._data.age < 5 ? ' год(а)' : ' лет' : ' лет';
        this._data.favourite === true ?
            this.catFav.classList.add('cat-info__favourite_active') :
            this.catFav.classList.remove('cat-info__favourite_active');
    }

    setEventListener() {
        this.buttonDeleted.addEventListener('click', () => this._handleDeleteCat(this._cardInstance));
        this.buttonCatEdit.addEventListener('click', () => this._handleEditorCat(this._cardInstance));
    }
}