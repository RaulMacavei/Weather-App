import React from "react";
import cities from "../../../library/city.list.json";
import Head from "next/head";
import moment from "moment-timezone";
import TodaysWeather from "../../../components/TodaysWeather";
import HourlyWeather from "../../../components/HourlyWeather";
import DailyWeather from "../../../components/DailyWeather";
import SearchBox from "../../../components/SearchBox";
import Link from "next/link";

export async function getServerSideProps(context) {
  const city = getCity(context.params.city);

  if (!city) {
    return {
      notFound: true,
    };
  }

  const res = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=58ffc7b933668f6130cbbae82bd216e9&units=metric&exclune=minutely`
  );

  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  const slug = context.params.city;

  return {
    props: {
      city: city,
      currentWeather: data.current,
      timezone: data.timezone,
      dailyWeather: data.daily,
      hourlyWeather: getHourlyWeather(data.hourly, data.timezone),
    },
  };
}

const getCity = (param) => {
  const cityParam = param.trim();
  const splitCity = cityParam.split("-");
  const id = splitCity[splitCity.length - 1];

  if (!id) {
    return null;
  }

  const city = cities.find((city) => city.id.toString() == id);

  if (city) {
    return city;
  } else {
    return null;
  }
};

const getHourlyWeather = (hourlyData, timezone) => {
  const endOfDay = moment().tz(timezone).endOf("day").valueOf();
  const eodTimeStamp = Math.floor(endOfDay / 1000);

  const todaysData = hourlyData.filter((data) => data.dt < eodTimeStamp);

  return todaysData;
};

export default function City({
  city,
  hourlyWeather,
  timezone,
  currentWeather,
  dailyWeather,
}) {
  return (
    <div>
      <Head>
        <title>{city.name} Weather - Accesa Weather App</title>
      </Head>

      <div className="page-wrapper">
        <div className="container">
          <Link href="/" legacyBehavior>
            <a className="back-link">&larr; Home</a>
          </Link>
          <SearchBox placeholder="Search for another location..." />
          <TodaysWeather
            city={city}
            weather={dailyWeather[0]}
            timezone={timezone}
          />
          <HourlyWeather hourlyWeather={hourlyWeather} timezone={timezone} />
          <DailyWeather dailyWeather={dailyWeather} timezone={timezone} />
        </div>
      </div>
    </div>
  );
}
