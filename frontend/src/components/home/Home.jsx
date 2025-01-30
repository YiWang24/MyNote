import React from "react";
import Banner from "./Banner";
import Reviews from "./Reviews";
import ImageSection from "./ImageSection";
import ContentSection from "./ContentSection";
import {MarqueeDemo} from "./Marquee";
const Home = () => {
  return (
    <>
      <Banner />
      <MarqueeDemo />
      <ImageSection />
      <ContentSection />
      <Reviews />
    </>
  );
};

export default Home;
