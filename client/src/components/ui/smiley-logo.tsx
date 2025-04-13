import React from "react";

interface SmileyLogoProps {
  className?: string;
  size?: number;
}

const SmileyLogo: React.FC<SmileyLogoProps> = ({ className = "", size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none" />
      <circle cx="8" cy="9" r="1.5" fill="white" />
      <circle cx="16" cy="9" r="1.5" fill="white" />
      <path
        d="M7.5 13.5C8.5 16 10.5 17 12 17C13.5 17 15.5 16 16.5 13.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default SmileyLogo;
