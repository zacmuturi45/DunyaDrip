"use client"

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
import NewsLetter from "./components/newsletterbanner";
import { Suspense, useEffect, useRef, useState } from "react";
import Loader from "./components/loader";

export default function Home() {
  const [showBanner, setShowBanner] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    if (sessionStorage.getItem("newsletterShown")) return; // Don't show again in same session

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowBanner(true);
          sessionStorage.setItem("newsletterShown", "true");
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, []);
  return (
    <div className="home">
      <Hero />
      <Banner />
      <Dunya_Video />
      <ShopByCollection />
      <Suspense fallback={<Loader />}>
      <Featured />
      </Suspense>
      <SummerSale />
      <MensArrivals />
      <WomensArrivals />
      <Wild />
      <TopPicks obsRef={observerRef} />
      <>
        {
          showBanner && <NewsLetter setShowBanner={setShowBanner} />
        }
      </>
      <PreFooter />
    </div>
  );
}
