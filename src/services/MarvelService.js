class MarvelService {
   _apiKey = 'apikey=cc870ad11d5b1c6ba492308627064f32';
   _path = 'https://gateway.marvel.com:443/v1/public/';
getResource = async (url) => {
  let res = await fetch(url);

  if (!res.ok) {
    throw new Error (`Could not fetch ${url}, status: ${res.status}`);
  }

  return await res.json();
}

getAllCharacters = () =>{
  return this.getResource(`${this._path}characters?limit=9&offset=210&${this._apiKey}`)
}
getCharacter = (id) =>{
  return this.getResource(`${this._path}characters/${id}?${this._apiKey}`)
}
}
export default MarvelService;