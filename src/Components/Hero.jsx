import React, { useRef } from "react";
import Section from "./Section";
import { curve, heroBackground, robot } from "../assets";
import Button from "./Button";
import { heroIcons } from "../constant";
import { BackgroundCircles, BottomLine, Gradient } from "./design/Hero";
import { ScrollParallax } from "react-just-parallax";
import GeneratingText from "./GeneratingText";
import Notification from "./Notification";
import CompanyLogos from "./CompanyLogos";
export default function Hero() {
  const parallexRef = useRef();

  return (
    <Section
      className={"pt-[12rem] -mt-[5.25]"}
      crosses
      customPaddings
      crossesOffset="lg:translate-y-[5.2rem]"
      id="hero"
    >
      <div className="container relative" ref={parallexRef}>
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[4rem] md:mb-20 lg:mb:[6rem]">
          <h1 className="h1 mb-6">
            Explore the Possibilities of AI Chatting with
            <span className="inline-block relative">
              Brainwave
              <img
                className="absolute top-full left-0 w-full xl:-mt-2"
                src={curve}
                alt="curve"
                width={624}
                height={24}
              />
            </span>
          </h1>

          <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8">
            Unleash the power of AI within Brainwave. Upgrade your productivity
            with Brainwave, the open AI chat app.
          </p>

          <Button white>Get Started</Button>
        </div>

        <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
          <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
            <div className="relative bg-n-8 rounded-[1rem]">
              <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />

              <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]">
                <img
                  src={robot}
                  className="w-full scale-[1.7] translate-y-[8%] md:scale-[1] md:-translate-y-[10%] lg:-translate-y-[23%]"
                  width={1024}
                  height={490}
                  alt="AI"
                />

                <GeneratingText
                  className={
                    "absolute left-4 right-4 bottom-[1.2rem] md:left-1/2 md:right-auto md:botom-8  md:w-[31rem] md:-translate-x-1/2 "
                  }
                />

                <ScrollParallax isAbsolutelyPositioned>
                  <ul className="hidden absolute -left-[4.5rem] bottom-[7.5rem] backdrop-blur-border  px-1 py-1 bg-n-9/40 border border-n-1/20 rounded-2xl lg:flex ">
                    {heroIcons.map((icon) => (
                      <li className="p-5 ">
                        <img src={icon} alt="icon" width={24} height={25} />
                      </li>
                    ))}
                  </ul>
                </ScrollParallax>

                <ScrollParallax isAbsolutelyPositioned>
                  <Notification
                    className={`hidden absolute -right-20 bottom-[11rem] w-[18rem] xl:flex`}
                  />
                </ScrollParallax>
              </div>
            </div>

            <Gradient />
          </div>
          <div className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%]">
            <img
              src={heroBackground}
              className="w-full "
              width={1440}
              height={1800}
              alt="hero"
            />
          </div>

          <BackgroundCircles />
        </div>
      </div>
      <CompanyLogos className={`hidden relative z-10 my-10 lg:block`} />
      <BottomLine />
    </Section>
  );
}
