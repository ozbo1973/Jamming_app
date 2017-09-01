
const clientId= "41b941fa464d4511a70b34ea5541f69e";
const redirectURI = 'http://localhost:3000/';
let accessToken;

export const Spotify = {
  getAccessToken() {
    if(accessToken){
      return accessToken;
    }

    const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const tokenExpire = window.location.href.match(/expires_in=([^&]*)/);

    if (tokenMatch && tokenExpire){
      accessToken = tokenMatch[1];
      const expiresIn = Number(tokenExpire[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const spotifyAccessURL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = spotifyAccessURL;
    }
  },

  search(term) {
    return fetch(`https://api.spotify.com/v1/search?type=track&q={term}`, {
      header: {Authorization: `Bearer ${Spotify.accessToken}`}
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (jsonResponse.tracks) {
        jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri

        }))
      }else {return []}
    })
  }

}
