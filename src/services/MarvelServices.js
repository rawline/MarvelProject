class MarvelServices{
    _apiBase = "https://gateway.marvel.com:443/v1/public/";
    _apiKey = "apikey=34c608b799b4bb0cf645bb3a0b5bfca8";

    getResource = async(url) => {
        let res = await fetch(url);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter)
    }

    getCharacter = async (id) => {
        const res =  await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {

        let correctDescr = char.description;
        if(!correctDescr) correctDescr = "The character's description will be soon...";
        if(correctDescr.length > 200) correctDescr = correctDescr.slice(0, 200) + "...";

        return {
            name: char.name,
            descr: correctDescr,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }
}

export default MarvelServices;