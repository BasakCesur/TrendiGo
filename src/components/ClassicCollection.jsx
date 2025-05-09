import React from "react";
import Slider from "./Slider";
import slide1 from "../assets/classicslide-01.jpg";
import slide2 from "../assets/classicslide-02.jpg";
import slide3 from "../assets/classicslide-03.jpg";

export default function ClassicCollection() {
  const slides = [
    {
      id: 1,
      image: slide1,
      title: "VINTAGE 2025",
      subtitle: "KLASİK KOLEKSİYON",
      description: "Ben Klasiğim, Ben Vintage",
      buttonText: "Alışverişe Başla",
    },
    {
      id: 2,
      image: slide2,
      title: "VINTAGE 2025",
      subtitle: "KLASİK KOLEKSİYON",
      description: "Ben Klasiğim, Ben Vintage",
      buttonText: "Alışverişe Başla",
    },
    {
      id: 3,
      image: slide3,
      title: "VINTAGE 2025",
      subtitle: "KLASİK KOLEKSİYON",
      description: "Ben Klasiğim, Ben Vintage",
      buttonText: "Alışverişe Başla",
    },
  ];

  return (
    <div className="w-full">
      <Slider slides={slides} />
    </div>
  );
}
