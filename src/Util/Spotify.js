
const clientId= "41b941fa464d4511a70b34ea5541f69e";
const redirectURI = 'http://localhost:3000/';  //'http://jammingBB.surge.sh/'
const appApiUrl = 'https://api.spotify.com';
const appUserAccntUrl = 'https://accounts.spotify.com'
let accessToken;
let currentUserId;
let newlyCreatedPlaylistId;

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
      const spotifyAccessURL = `${appUserAccntUrl}/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = spotifyAccessURL;
    }
  }, //.getAccessToken

  getUserId() {
    if (currentUserId) {
      return currentUserId;
    }
    const headers = {Authorization: `Bearer ${this.getAccessToken()}`};
    //retriveing user id from spotify
    return fetch(`${appApiUrl}/v1/me`,{headers: headers}
    ).then(response => response.json()
    ).then(jsonResponse => {
       return jsonResponse.id;
    }).then(result => currentUserId = result)
  }, // .getUserId

  getNewlyCreatedPlaylist() {
    if(newlyCreatedPlaylistId) {
      return newlyCreatedPlaylistId;
    }
    return "There is no playlist, please create a playlist"
  }, //.getNewlyCreatedPlaylist

  search(term) {
    const headers = {Authorization: `Bearer ${this.getAccessToken()}`}
    return fetch(`${appApiUrl}/v1/search?type=track&q=${term}`, {
      headers: headers
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
       return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }))
      });
  }, // .search

  savePlaylist(name,trackURIs) {
    if (!name || !trackURIs.length) {
      return;
    }

  const headers = {Authorization: `Bearer ${this.getAccessToken()}`};
  return this.getUserId().then(() => {
  return fetch(`${appApiUrl}/v1/users/${currentUserId}/playlists`,
    {
    headers: headers,
    method: 'POST',
    body: JSON.stringify({name: name})
  }).then(response => response.json()
).then(jsonResponse => {
  const playlistId = jsonResponse.id;
  newlyCreatedPlaylistId= playlistId;
  return fetch(`${appApiUrl}/v1/users/${currentUserId}/playlists/${playlistId}/tracks`,
  {
    headers: headers,
    method: 'POST',
    body: JSON.stringify({uris:trackURIs}),
    success: console.log(`${currentUserId} Playlist: ${playlistId} was successfully saved to your account`)
  })
})//.jsonResponse
})

  } //.savePlaylist



}
