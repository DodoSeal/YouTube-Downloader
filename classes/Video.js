const download = require(`ytdl-core`);
const fs = require(`fs`);

class Video {
    constructor(url, fileName) {
        this.url = url;
        this.fileName = fileName;
    }

    #formatName(name) {
        return name.replace(/[?/:\\*"<>|]/gi, ``);
    }

    exportVideo() {
        download(this.url, {
            format: "mp4",
            filter: 'videoonly'
        }).pipe(fs.createWriteStream(`./output/video/${this.#formatName(this.fileName)}.mp4`));
    }

    exportAudio() {
        download(this.url, {
            format: "mp3",
            filter: 'audioonly'
        }).pipe(fs.createWriteStream(`./output/audio/${this.#formatName(this.fileName)}.mp3`));
    }

    export(url, path) {
        if (path == "") {
            download(url, {
                format: "mp4",
                filter: 'audioandvideo'
            }).pipe(fs.createWriteStream(`./output/video/${this.#formatName(this.fileName)}.mp4`));
        } else {
            download(url, {
                format: "mp4",
                filter: 'audioandvideo'
            }).pipe(fs.createWriteStream(path));
        }
    }

    exportPlaylist(playlistName, list) {
        const path = `./output/${this.#formatName(playlistName)}`;
        for (var url of list) {
            fs.mkdir(path);

            this.export(url, `${path}.mp4`);
        }
    }
}

module.exports = Video;