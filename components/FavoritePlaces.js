import React from "react";
import Image from "next/image";
import Link from "next/link";

// Import imagini
import Cluj from "../public/images/Cluj-Napoca.jpg";
import Oradea from "../public/images/Oradea.jpg";
import Bucuresti from "../public/images/Bucuresti.jpg";
import Munchen from "../public/images/Munchen.webp";

const places = [
  {
    name: "Cluj-Napoca",
    image: Cluj,
    url: "/location/cluj-napoca-681290",
  },
  {
    name: "Oradea",
    image: Oradea,
    url: "/location/oradea-671768",
  },
  {
    name: "Bucuresti",
    image: Bucuresti,
    url: "/location/bucharest-683506",
  },
  {
    name: "München",
    image: Munchen,
    url: "/location/munich-2867714",
  },
];

export default function FavoritePlaces() {
  return (
    <div>
      <div className="places">
        <div className="places__row">
          {places.length > 0 &&
            places.map((place, index) => (
              <div className="places__box" key={index}>
                <Link legacyBehavior href={place.url}>
                  <a>
                    <div className="places__image-wrapper">
                      <Image
                        src={place.image}
                        alt={`${place.name} Image`}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>

                    <span>{place.name}</span>
                  </a>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
