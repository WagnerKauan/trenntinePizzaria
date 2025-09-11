"use client";

import Image from "next/image";
import { CardPromotions } from "./cardPromotions";
import { Promotion } from "@/generated/prisma";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setPromotions } from "@/store/promotions/promotionsSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination, Autoplay as SwiperAutoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

export function Promotions({ promotions }: { promotions: Promotion[] }) {
  const dispatch = useDispatch();
  const swiperRef = useRef<any>(null)
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [gridRows, setGridRows] = useState(2);

  function handleResize() {
    const width = window.innerWidth;

    if(width < 640) {
      setSlidesPerView(1);
      setGridRows(1);
    }else if(width < 1024) {
      setSlidesPerView(2);
      setGridRows(2);
    }else {
      setSlidesPerView(3);
      setGridRows(2);
    }

    swiperRef.current?.swiper.update();
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    dispatch(setPromotions(promotions));
  }, [promotions]);

  return (
    <section id="promocoes" className="py-16 lg:py-24">
      <div className="relative w-full h-[130px]">
        <Image
          src={"/image/bg_promotionsPizza.png"}
          alt="Pizza"
          fill
          className="w-full object-cover"
          quality={100}
        />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <h2 className="text-white text-2xl xl:text-[34px] uppercase font-bold ">
            Promoções
          </h2>
        </div>
      </div>

      <article className="bg-secondary-light py-10">
        <div className="container mx-2 sm:mx-auto max-w-7xl">
          <Swiper
            ref={swiperRef}
            slidesPerView={slidesPerView} 
            grid={{ rows: gridRows, fill: "row" }} 
            spaceBetween={30}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            modules={[Grid, Pagination, SwiperAutoplay]}
            className="mySwiper"
            centeredSlides={slidesPerView === 1}
            
          >
            {promotions.map((promotion) => (
              <SwiperSlide key={promotion.id} >
                <CardPromotions promotion={promotion} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </article>
    </section>
  );
}
