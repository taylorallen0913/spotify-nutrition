export const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
export const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
export const AUTHORIZATION_ENDPOINT = `https://accounts.spotify.com/authorize?show_dialog=true&client_id=${CLIENT_ID}&response_type=code&redirect_uri=http%3A%2F%2Flocalhost:3000/&scope=user-top-read%20user-top-read`;
export const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
