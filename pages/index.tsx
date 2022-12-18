import { GetServerSideProps } from 'next';
import FiberScene from '../components/FiberScene';
import { ArtistData } from '../interfaces/spotify';
import { AUTHORIZATION_ENDPOINT } from '../lib/constants';
import {
  getRefreshToken,
  getTopArtistsAndYearlyValue,
  getTopGenreFromTopArtists,
} from '../lib/spotify';

interface HomePageProps {
  authEndpoint: string;
  topArtists: ArtistData[];
  topGenre: string;
  refreshToken?: string;
}

function Home({ authEndpoint, topArtists, topGenre }: HomePageProps) {
  const listeningStats = topArtists?.map((artist) => ({
    artistName: artist.name,
    listeningPercent: artist.listeningPercent,
  }));

  return (
    <div className="h-[100vh] w-[100vw]">
      <FiberScene listeningStats={[]} topGenre={''} />

      {/* {topArtists ? (
        <FiberScene listeningStats={listeningStats} topGenre={topGenre} />
      ) : (
        <div className="mt-20">
          <a
            href={authEndpoint}
            className="bg-[#EDF2F4] text-gray-800 p-3 rounded-lg"
          >
            Login
          </a>
        </div>
      )} */}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const code = context.query.code ? context.query.code.toString() : null;
  const refreshToken = code ? await getRefreshToken(code) : null;

  // If access code, hit API
  if (code) {
    const accessToken = refreshToken.access_token;
    if (typeof accessToken == 'string' && accessToken) {
      // Get top 8 artists and yearly value
      const topArtists = await getTopArtistsAndYearlyValue(accessToken, 8);

      // Get top genre
      const topGenre = getTopGenreFromTopArtists(topArtists);

      return {
        props: {
          authEndpoint: AUTHORIZATION_ENDPOINT,
          // Truncate so we are not sending unnecesary data
          topArtists: topArtists.slice(0, 8),
          topGenre,
          refreshToken,
        },
      };
    }
  }

  return { props: { authEndpoint: AUTHORIZATION_ENDPOINT } };
};

export default Home;
