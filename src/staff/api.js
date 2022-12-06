let api = {
    songs: {
        list: () => {
            return fetch(`data/songs.json`)
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
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
        }
    },
}