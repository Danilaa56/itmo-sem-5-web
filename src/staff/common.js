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
<a href="song.html?id=${song.id}">
    <div>${song.id}</div>
    <div>${song.title}</div>
    <div>${song.artistNames}</div>
</a>
`;
    });

    table.innerHTML = `
<div>
    <div>
        <div>Id</div>
        <div>Название</div>
        <div>Авторы</div>
    </div>
</div>
<div id="songs_list">${songsListHtml}</div>
`;

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