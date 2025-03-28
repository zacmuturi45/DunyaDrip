import Image from "next/image";
import Hero from "./sections/hero";
import Banner from "./sections/banner";
import Dunya_Video from "./sections/dunya_video";
import Featured from "./sections/featured";
import SummerSale from "./sections/summer_sale";
import MensArrivals from "./sections/mens_arrivals";
import WomensArrivals from "./sections/womens_arrivals";
import Wild from "./sections/wild";
import ShopByCollection from "./sections/shop_by_collection";
import TopPicks from "./sections/top_picks";
import PreFooter from "./sections/pre_footer";

export default function Home() {
  return (
    <div className="home">
      <Hero />
      <Banner />
      <Dunya_Video />
      <ShopByCollection />
      <Featured />
      <SummerSale />
      <MensArrivals />
      <WomensArrivals />
      <Wild />
      <TopPicks />
      <PreFooter />
    </div>
  );
}
