import Image from "next/image";
import Hero from "./sections/hero";
import Banner from "./sections/banner";

export default function Home() {
  return (
    <div className="home">
      <Hero />
      <Banner />
    </div>
  );
}
