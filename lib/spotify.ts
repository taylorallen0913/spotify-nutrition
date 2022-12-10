import axios from 'axios';
import { getMostOccuringElement, getOccuranceMap } from './util';

export interface ArtistData {
  name: string;
  genres: string[];
  listeningPercent: number;
}

const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

export const AUTHORIZATION_ENDPOINT = `https://accounts.spotify.com/authorize?show_dialog=true&client_id=${client_id}&response_type=code&redirect_uri=http%3A%2F%2Flocalhost:3000/&scope=user-top-read%20user-top-read`;

export const getRefreshToken = async (refreshCode: string) => {
  const res = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: refreshCode,
      redirect_uri: 'http://localhost:3000/',
    }),
  });

  return res.json();
};

export const getTopArtistsAndYearlyValue = async (
  accessToken: string,
  numArtists: number
): Promise<ArtistData[]> => {
  // Get listening percent by taking top 50 tracks and comparing how many to artists
  const top50Songs = await axios
    .get(`https://api.spotify.com/v1/me/top/tracks?limit=50`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      return res.data.items.map((song: any) => ({
        artist: song.artists.map((artist: any) => artist.name),
      }));
    })
    .catch((err) => {
      console.log(err);
    });

  const top50FlatArr = top50Songs
    .map((el: { artist: string[] }) => el.artist)
    .flat();
  const artistOccuranceMap = getOccuranceMap(top50FlatArr);

  const topArtists = await axios
    .get(`https://api.spotify.com/v1/me/top/artists?limit=${numArtists}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      return res.data.items.map((artist: ArtistData) => {
        let listeningPercent = 0;
        if (artist.name in artistOccuranceMap) {
          listeningPercent =
            (artistOccuranceMap[artist.name] /
              Object.keys(artistOccuranceMap).length) *
            100;
        }
        return {
          name: artist.name,
          genres: artist.genres,
          listeningPercent,
        };
      });
    })
    .catch((err) => {
      console.log(err);
    });

  return topArtists;
};

// Gets top genre from top artists array
export const getTopGenreFromTopArtists = (topArtists: ArtistData[]) => {
  const genresFlat = topArtists.map((artist) => artist.genres).flat();
  const topGenre = getMostOccuringElement(genresFlat);
  const topGenreCapitalized = topGenre.replace(
    /(^\w{1})|(\s+\w{1})/g,
    (letter) => letter.toUpperCase()
  );
  return topGenreCapitalized;
};
