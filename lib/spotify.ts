import axios from 'axios';
import { ArtistData } from '../interfaces/spotify';
import { CLIENT_ID, CLIENT_SECRET, TOKEN_ENDPOINT } from './constants';
import { getMostOccuringElement, getOccuranceMap } from './util';

const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

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
