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

    getAllCharacters = () => {
        return this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`)
    }

    getCharacter = (id) => {
        return this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`)
    }
}

export default MarvelServices;