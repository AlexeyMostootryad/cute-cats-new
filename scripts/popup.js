class Popup {
    constructor(className) {
        this._className = className;
        this.popup = document.querySelector(`.${className}`)
        this._handleEscUp = this._handleEscUp.bind(this);
    }

    _handleEscUp(event) {
        if (event.key === 'Escape') {
            this.close()
        }
    }

    open() {
        this.popup.classList.add('popup_active');
        document.addEventListener('keyup', this._handleEscUp);
    }

    close() {
        this.popup.classList.remove('popup_active')
        document.removeEventListener('keyup', this._handleEscUp)
    }

    setContent(contentNode) {
        const containerContent = this.popup.querySelector('.popup__content');
        containerContent.innerHTML = '';
        containerContent.append(contentNode);
    }

    setEventListener() {
        this.popup.addEventListener('click', (event) => {
            if (event.target.classList.contains(this._className) || event.target.closest('.popup__close')) {
                this.close();
            }
        })
    }
}