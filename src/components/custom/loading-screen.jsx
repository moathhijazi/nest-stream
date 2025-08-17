import React from "react";
import { Cardio } from "ldrs/react";
import "ldrs/react/Cardio.css";

export default function LoadingScreen({content}) {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="p-2 flex flex-col items-center space-y-6">
        <Cardio size="80" stroke="6" speed="1" color="#f1455f" />
        <span className="text-xs font-light">{content || "Loading"}</span>
      </div>
    </div>
  );
}
