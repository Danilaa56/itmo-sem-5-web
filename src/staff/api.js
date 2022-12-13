let api = (() => {
    let songsJson = undefined;
    let favouriteSongIds = new Set();
    if (localStorage['favourites']) {
        for (let id of JSON.parse(localStorage['favourites']))
            favouriteSongIds.add(id);
    }
    let saveFavourites = () => {
        localStorage['favourites'] = JSON.stringify(Array.from(favouriteSongIds));
        songsJson = undefined;
    }
    return {
        songs: {
            list: () => {
                if (songsJson !== undefined) {
                    return Promise.resolve(Array.from(songsJson));
                }
                return fetch(`data/songs.json`)
                    .then(async response => {
                        if (response.status === 200) {
                            let songsJson = await response.json();
                            for (let song of songsJson) {
                                song.isFavourite = favouriteSongIds.has(song.id);
                            }
                            return Promise.resolve(Array.from(songsJson));
                        } else {
                            alert("Не удалось получить список песен: " + response.statusText);
                        }
                    })
                    .catch(() => {
                        alert("Не удалось получить список песен");
                    });
            },
            byId: (id) => {
                return api.songs.list()
                    .then(songs => {
                        for (let song of songs) {
                            // noinspection EqualityComparisonWithCoercionJS
                            if (song.id == id) {
                                return song;
                            }
                        }
                        alert(`Failed to find song with id '${id}'`);
                    })
            },
            search: (query) => {
                function stringToWords(str) {
                    return new Set(Array.from(str.toLocaleLowerCase().matchAll('[а-яёa-z]+')).map(a => a[0]));
                }

                let listPromise = api.songs.list();
                let queryWords = stringToWords(query);

                return listPromise.then(songs => {
                    let result = [];
                    for (let song of songs) {
                        let songWords = stringToWords(song.lyrics);
                        let isValid = true;
                        for (let word of queryWords) {
                            if (!songWords.has(word) && song.fullTitle.indexOf(word) === -1) {
                                isValid = false;
                                break;
                            }
                        }
                        if (isValid) {
                            result.push(song);
                        }
                    }
                    return result;
                })
            },
            setIsFavourite: (songId, isFavourite) => {
                api.songs.byId(songId).then(song => {
                    if (song === undefined) return;
                    if (isFavourite) {
                        favouriteSongIds.add(songId);
                        saveFavourites();
                        alert(`${song.title} добавлена в избранное`);
                    } else {
                        favouriteSongIds.delete(songId);
                        saveFavourites();
                        alert(`${song.title} удалена в избранного`);
                    }
                })
            },
            listFavouriteSongs: () => {
                return api.songs.list().then(songs => {
                   let result = [];
                   for (let song of songs) {
                       if (song.isFavourite) {
                           result.push(song);
                       }
                   }
                   return result;
                });
            }
        },
    }
})();