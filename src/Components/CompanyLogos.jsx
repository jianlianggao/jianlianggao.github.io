import React from "react";
import { companyLogos } from "../constant";

export default function CompanyLogos({ className }) {
  return (
    <div className={className}>
      <p className="tagline text-n-1/40 text-center mb-7">
        Helps People To create a Beautiful Content
      </p>

      <ul className="flex">
        {companyLogos.map((logo, i) => (
          <li
            className="flex items-center justify-center flex-1 height-[8.5rem]"
            key={i}
          >
            <img src={logo} width={120} height={34} alt={logo} />
          </li>
        ))}
      </ul>
    </div>
  );
}
