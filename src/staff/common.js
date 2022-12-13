{
    let loadTime = Date.now();
    window.addEventListener('load', () => {
        let el = document.getElementById('load_time_label');
        if (el) {
            loadTime = Date.now() - loadTime;
            el.innerText = `Загрузилось за ${loadTime} мс`;
        }
        el = document.getElementById('time_label');
        if (el) {
            el.innerText = new Date().toLocaleTimeString();
        }

        function url_to_page(url) {
            let index = url.lastIndexOf('/');
            if (index !== -1) {
                url = url.slice(index + 1, url.length);
            }
            index = url.indexOf('?');
            if (index !== -1) {
                url = url.slice(0, index);
            }
            if (url === '')
                url = 'index.html';
            return url;
        }

        let navigation_els = document.querySelectorAll("nav > .header__link");
        let location = url_to_page(window.location + "");
        for (let nav_link of navigation_els) {
            if (url_to_page(nav_link.href) === location) {
                nav_link.classList.add("header__link__pointed");
            }
        }
    });
}

const songs_to_table = function (songs) {
    let table = document.createElement('div');
    table.className = 'table';

    let songsListHtml = ``;
    songs.forEach((song) => {
        songsListHtml += `
<a >
    <div>${song.id}</div>
    <div>${song.title}</div>
    <div>${song.artistNames}</div>
    <div><div class="favourite_star ${song.isFavourite ? 'favourite_star__active' : ''} center_margin"></div></div>
</a>
`;
    });

    table.innerHTML = `
<div>
    <div>
        <div>Id</div>
        <div>Название</div>
        <div>Авторы</div>
        <div>Избранное</div>
    </div>
</div>
<div id="songs_list">${songsListHtml}</div>
`;

    for (let favouriteStarEl of table.querySelectorAll('.favourite_star')) {
        favouriteStarEl.addEventListener('click', (e) => {
            let newIsFavouriteValue = !favouriteStarEl.classList.contains('favourite_star__active');
            let id = favouriteStarEl.parentElement.parentElement.children[0].innerText * 1;
            api.songs.setIsFavourite(id, newIsFavouriteValue);
            if (newIsFavouriteValue) {
                favouriteStarEl.classList.add('favourite_star__active');
            } else {
                favouriteStarEl.classList.remove('favourite_star__active');
            }
        });
    }

    return table;
};

const executeLong = (loadingElement, promise, elementToHide) => {
    loadingElement.classList.remove('hidden');
    if (elementToHide)
        elementToHide.classList.add('hidden');
    promise.then(() => {
        loadingElement.classList.add('hidden');
        if (elementToHide)
            elementToHide.classList.remove('hidden');
    });
}