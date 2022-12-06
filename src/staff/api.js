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
        }
    },
}