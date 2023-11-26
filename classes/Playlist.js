require("dotenv").config();

class Playlist {
    #urls;
    #apiKey;
    constructor(id) {
        this.id = id;
        this.#urls = [];
        this.#apiKey = process.env.GOOGLE_AUTH;
    }

    async fetchUrls() {
        return new Promise((resolve, reject) => {
            const part = `contentDetails`;
            const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=${part}&maxResults=50&playlistId=${this.id}&key=${this.#apiKey}`;
    
            var request = fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    'Bearer': this.#apiKey
                }
            });
    
            request.then(res => {
                res.json().then(data => {
                    for(const video of data.items) {
                        this.#urls.push(`https://youtube.com/watch?v=${video.contentDetails.videoId}`);
                    };

                    resolve(this.#urls);
                });
            });
        })
    }

    async getUrls() {
       try {
            return await this.fetchUrls();
       } catch(err) {
            console.error(err);
       }
    }
};

module.exports = Playlist;