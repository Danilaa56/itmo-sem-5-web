let api = (() => {
    let songsJson = undefined;
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
                            return Promise.resolve(Array.from(songsJson));
                        } else {
                            alert("Failed to list songs: " + response.statusText);
                        }
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
            }
        },
    }
})();