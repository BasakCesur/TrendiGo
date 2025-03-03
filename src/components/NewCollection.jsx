import React from "react";
import Slider from "./Slider";
import slide1 from "../assets/slide-01.jpg";
import slide2 from "../assets/slide-02.jpg";
import slide3 from "../assets/slide-03.jpg";

export default function NewCollection() {
  const slides = [
    {
      id: 1,
      image: slide1,
      title: "SUMMER 2025",
      subtitle: "YENİ KOLEKSİYON",
      description: "Kaçırılmayacak Fırsatlarla Yaz Koleksiyonu",
      buttonText: "Alışverişe Başla",
    },
    {
      id: 2,
      image: slide2,
      title: "SUMMER 2025",
      subtitle: "YENİ KOLEKSİYON",
      description: "Kaçırılmayacak Fırsatlarla Yaz Koleksiyonu",
      buttonText: "Alışverişe Başla",
    },
    {
      id: 3,
      image: slide3,
      title: "SUMMER 2025",
      subtitle: "YENİ KOLEKSİYON",
      description: "Kaçırılmayacak Fırsatlarla Yaz Koleksiyonu",
      buttonText: "Alışverişe Başla",
    },
  ];

  return (
    <div className="w-full">
      <Slider slides={slides} />
    </div>
  );
}
