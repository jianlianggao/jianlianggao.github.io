import React from "react";
import { loading } from "../assets";

export default function GeneratingText({ className }) {
  return (
    <div
      className={`flex gap-2 items-center h-[3.5rem] px-6 bg-n-6/90 rounded-[1.75rem] 
    ${className || ""}`}
    >
      <img className="w-5 h-5" src={loading} alt="loading" />
      AI is generating
    </div>
  );
}
