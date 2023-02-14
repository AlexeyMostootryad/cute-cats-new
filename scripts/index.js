const sectionCard = document.querySelector('.cards');
const btnOpenPopupForm = document.querySelector('#add');
const formAddCat = document.querySelector('#popup-form-cat');
const formLogin = document.querySelector('#popup-form-login');
const btnLoginOpenPopup = document.querySelector('#login');

const popupAddCat = new Popup('popup-add-cats');
popupAddCat.setEventListener();

const popupEditCat = new Popup('popup-edit-cat');
const a = popupEditCat.setEventListener();

const popupLogin = new Popup('popup-login');
popupLogin.setEventListener();

const popupCatInfo = new Popup('popup-cat-info');
const b = popupCatInfo.setEventListener();

const popupImage = new PopupImage('popup-image');
popupImage.setEventListener();

const catsInfoInstance = new CatsInfo('#cats-info-template', handleDeleteCat, handleEditorCat);
const catsInfoElement = catsInfoInstance.getElement();

const catEditInstance = new CatEdit('#cat-edit-template', handleEditCat);
const catEditElement = catEditInstance.getElement()

function createCat(dataCat) {
    const cardInstance = new Card(dataCat, '#card-template', handleCatImage, handleCatTitle);
    const newCardElement = cardInstance.getElement();
    sectionCard.append(newCardElement);
}

function checkLocalStorage() {
    const localData = JSON.parse(localStorage.getItem('cats'));
    const getTimeExpires = localStorage.getItem('catsRefrash');

    if (localData && localData.length && (new Date() < new Date(getTimeExpires))) {
        localData.forEach(catData => {
            createCat(catData);
        })
    } else {

        api
            .getCats()
            .then((data) => {
                data['data'].forEach(catData => {
                    createCat(catData);
                })
                updateLocalStorage(data['data'], { type: 'ALL_CATS' });
            })
    }
}

function handleFormAddCat(e) {
    e.preventDefault();
    const elementsFromCat = [...formAddCat.elements];
    const dataFormCat = serializeForm(elementsFromCat)

    api
        .addCat(dataFormCat)
        .then(() => {
            createCat(dataFormCat);
            updateLocalStorage(dataFormCat, { type: 'ADD_CAT' });
        })
    e.target.reset();
    popupAddCat.close();
}

function handleFormLogin(e) { // псевдо-авторизация
    e.preventDefault();
    const loginData = [...formLogin.elements];
    const serializeData = serializeForm(loginData);

    Cookies.set('email', `email=${serializeData.email}`);
    btnOpenPopupForm.classList.remove('visually-hidden');
    btnLoginOpenPopup.classList.add('visually-hidden');

    popupLogin.close();
}

function handleCatImage(dataCat) {
    popupImage.open(dataCat);
}

function handleCatTitle(cardInstance) {
    catsInfoInstance.setData(cardInstance);
    popupCatInfo.setContent(catsInfoElement);
    popupCatInfo.open();
}

function handleEditorCat(cardInstance) {
    catEditInstance.setData(cardInstance);
    popupEditCat.setContent(catEditElement);
    popupCatInfo.close();
    popupEditCat.open();
}

function handleDeleteCat(cardInstance) {

    api
        .deleteCat(cardInstance.getId())
        .then(() => {
            cardInstance.deleteView();
            updateLocalStorage(cardInstance.getId(), { type: 'DELETE_CAT' });
            popupCatInfo.close();
        })
}

function handleEditCat(cardInstance) {
    const formEditCat = document.querySelector('#popup-form-cat-edit');
    const elementsFromCat = [...formEditCat.elements];
    const dataFormCat = serializeForm(elementsFromCat)

    api
        .updCat(cardInstance.getId(), dataFormCat)
        .then(() => {
            popupEditCat.close();
        })
    updateLocalStorage(dataFormCat, { type: 'EDIT_CAT' });
}

function updateLocalStorage(data, action) {
    const oldStorage = JSON.parse(localStorage.getItem('cats'));

    switch (action.type) {
        case 'ADD_CAT':
            oldStorage.push(data);
            localStorage.setItem('cats', JSON.stringify(oldStorage));
            return;
        case 'ALL_CATS':
            localStorage.setItem('cats', JSON.stringify(data));
            setDataRefrash(5, 'catsRefrash');
            return;
        case 'DELETE_CAT':
            const newStorage = oldStorage.filter(cat => cat.id !== data);
            localStorage.setItem('cats', JSON.stringify(newStorage));
            return;
        case 'EDIT_CAT':
            const updateStorage = oldStorage.map(cat => cat.id.toString() === data.id ? data : cat);
            localStorage.setItem('cats', JSON.stringify(updateStorage));
            return;
        default:
            break;
    }
}

checkLocalStorage();

btnOpenPopupForm.addEventListener('click', () => popupAddCat.open());
btnLoginOpenPopup.addEventListener('click', () => popupLogin.open())
formAddCat.addEventListener('submit', handleFormAddCat);
formLogin.addEventListener('submit', handleFormLogin);

const isAuth = Cookies.get('email');

if (!isAuth) {
    popupLogin.open();
    btnOpenPopupForm.classList.add('visually-hidden');
} else {
    btnLoginOpenPopup.classList.add('visually-hidden');
}

function serializeForm(elements) { // формирует данные из формы в объект для отправки на сервер
    const formData = {};
    elements.forEach(input => {
        if (input.type === 'submit') return

        if (input.type !== 'checkbox') {
            formData[input.name] = input.value;
        };

        if (input.type === 'checkbox') {
            formData[input.name] = input.checked;
        };
    });
    return formData
}

function setDataRefrash(minutes, key) { // интервал обновления localStorage
    const setTime = new Date(new Date().getTime() + minutes * 60000)
    localStorage.setItem(key, setTime);
}