import Image from "next/image";
import Hero from "./sections/hero";
import Banner from "./sections/banner";
import Dunya_Video from "./sections/dunya_video";
import Featured from "./sections/featured";

export default function Home() {
  return (
    <div className="home">
      <Hero />
      <Banner />
      <Dunya_Video />
      <Featured />
    </div>
  );
}
