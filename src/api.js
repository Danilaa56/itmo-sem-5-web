let api = {
    reset: () => {
        fetch('/api/genius/reset')
            .then(response => response.json())
            .then(success => alert("Reset " + (success ? "successful" : "failed")));
    },
    save: () => {
        fetch('/api/genius/save')
            .then(response => response.json())
            .then(success => alert("Save " + (success ? "successful" : "failed")));
    },
    artists: {
        scanSongs: (artistId) => {
            artistId *= 1;
            if (artistId < 1 || Number.isNaN(artistId)) {
                alert("Invalid artistId: " + artistId);
                return;
            }
            fetch(`/api/genius/artists/${artistId}/scanSongs`)
                .then(response => response.json())
                .then(data => {
                    // boolean ok, String msg,
                    if (!data.ok) {
                        alert("Error: " + data.msg);
                    } else {
                        alert(data.msg);
                    }
                });
        },
        list: () => {
            return fetch(`/api/genius/artists`)
                .then(response => response.json());
        }
    },
    songs: {
        scanAllLyrics: () => {
            fetch(`/api/genius/songs/scanAllLyrics`)
                .then(response => {
                    if (response.status === 200) {
                        alert("Scan task successful added");
                    } else {
                        alert("Failed to add scan task: " + response.statusText);
                    }
                });
        },
        list: () => {
            return fetch(`/songs.json`)
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        alert("Failed to list songs: " + response.statusText);
                    }
                });
        }
    },
    search: (q) => {
        let url = new URL("/api/genius/search");
        url.searchParams.append("q", q);
        return fetch(url.toString())
            .then(response => response.json());
        // .then(success => alert("Reset " + (success ? "successful" : "failed")));
    }
}