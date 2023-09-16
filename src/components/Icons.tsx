import React from "react";

interface IconProps {
  className?: string;
  id?: string;
  rotate?: boolean;
}

export const ArrowIcon = (props: IconProps) => (
  <svg className={`w-6 h-6 ` + props.className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);