import React from "react";
import moment from "moment-timezone";
import Image from "next/image";

export default function DailyWeather({ dailyWeather, timezone }) {
  return (
    <div className="daily">
      <h3 className="daily__title">
        Weekly <span>Weather</span>
      </h3>

      {dailyWeather.length > 0 &&
        dailyWeather.map((weather, index) => {
          if (index == 0) {
            return;
          }

          return (
            <div className="daily__card" key={weather.dt}>
              <div className="daily__inner">
                <div className="daily__left-content">
                  <div>
                    <h3>
                      {moment.unix(weather.dt).tz(timezone).format("dddd")}
                    </h3>

                    <h4>
                      <span>{weather.temp.max.toFixed(0)}&deg;C</span>
                      <span>{weather.temp.min.toFixed(0)}&deg;C</span>
                    </h4>
                  </div>

                  <div className="daily__sun-times">
                    <div>
                      <span>Sunrise</span>
                      <span>
                        {moment.unix(weather.sunrise).tz(timezone).format("LT")}
                      </span>
                    </div>
                    <div>
                      <span>Sunset</span>
                      <span>
                        {moment.unix(weather.sunset).tz(timezone).format("LT")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="daily__right-content">
                  <div className="daily__icon-wrapper">
                    <div>
                      <Image
                        layout="fill"
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt={weather.weather[0].description}
                      />
                    </div>
                  </div>

                  <h5>{weather.weather[0].description}</h5>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
