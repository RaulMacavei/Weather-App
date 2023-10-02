import Head from "next/head";
import SearchBox from "../../components/SearchBox";
import FavoritePlaces from "../../components/FavoritePlaces";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Weather App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="home home-title">
        <h1>Weather App</h1>
        <h1>Raul Macavei</h1>
        <div className="container">
          <SearchBox placeholder="Search for a city..." />
          <FavoritePlaces />
        </div>
        <div className="github-btn">
          <button>
            <a
              href="https://github.com/RaulMacavei/Weather-app-accesa"
              target="_blank"
            >
              Github Repository
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}
