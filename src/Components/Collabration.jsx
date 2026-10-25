import React from "react";
import Section from "./Section";
import { collabApps, collabContent, collabText } from "../constant";
import { brainwaveSymbol, check } from "../assets";
import Button from "./Button";
import { LeftCurve, RightCurve } from "./design/Collaboration";
export default function Collabration() {
  return (
    <Section crosses>
      <div className="container lg:flex">
        <div className="max-w-[25rem]">
          <h2 className="h2 mb-[4rem]">
            AI Chat App for seamless collaboration
          </h2>
          <ul className="block">
            {collabContent.map((item, i) => (
              <li key={i} className="mb-3 py-3">
                <div className="flex items-center gap-x-6 ">
                  <img src={check} alt="check"></img>
                  <h6 className="body-2">{item.title}</h6>
                </div>
                {item.text && (
                  <h6 className="body-2 mt-2 text-n-4">{item.text}</h6>
                )}
              </li>
            ))}
          </ul>

          <Button className={"mt-8"}>Try it Now</Button>
        </div>

        <div className="lg:ml-auto  xl:w-[38rem] mt-4">
          <p className="mb-8 body-2 text-n-4  md:mb-16 lg:mb-32 lg:w-[22rem]">
            {collabText}
          </p>
          <div className="relative left-1/2  flex w-[22rem] aspect-square border border-n-4 rounded-full -translate-x-1/2 scale:75 md:scale-100">
            <div className="flex w-60 m-auto aspect-square rounded-full border border-n-4">
              <div className="w-[6rem] aspect-square m-auto p-[0.2rem] bg-conic-gradient rounded-full">
                <div className=" flex item-center justify-center w-full h-full bg-n-8 rounded-full">
                  <img
                    className="m-auto"
                    width={48}
                    height={48}
                    src={brainwaveSymbol}
                    alt="symbol"
                  />
                </div>
              </div>
            </div>

            <ul className="mt-5">
              {collabApps.map((app, i) => (
                <li
                  className={`absolute top-0 left-1/2 h-1/2 -ml-[1.6rem] origin-bottom rotate-${
                    i * 45
                  }`}
                  key={i}
                >
                  <div
                    className={`flex items-center relative -top-[1.2rem] w-[3.2rem] h-[3.2rem] bg-n-7 border border-n-1/15  rounded-xl -rotate-${
                      i * 45
                    }`}
                  >
                    <img
                      className="m-auto"
                      width={app.width}
                      height={app.height}
                      src={app.icon}
                      alt="icon"
                    />
                  </div>
                </li>
              ))}
            </ul>

            <LeftCurve />
            <RightCurve />
          </div>
        </div>
      </div>
    </Section>
  );
}
