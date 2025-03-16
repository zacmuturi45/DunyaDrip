import Image from "next/image";
import Hero from "./sections/hero";
import Banner from "./sections/banner";
import Dunya_Video from "./sections/dunya_video";
import Featured from "./sections/featured";
import SummerSale from "./sections/summer_sale";
import MensArrivals from "./sections/mens_arrivals";
import WomensArrivals from "./sections/womens_arrivals";
import Wild from "./sections/wild";

export default function Home() {
  return (
    <div className="home">
      <Hero />
      <Banner />
      <Dunya_Video />
      <Featured />
      <SummerSale />
      <MensArrivals />
      <WomensArrivals />
      <Wild />
    </div>
  );
}
