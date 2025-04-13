import React from "react";

interface CartIconProps {
  className?: string;
  itemCount?: number;
}

const CartIcon: React.FC<CartIconProps> = ({ className = "", itemCount = 0 }) => {
  return (
    <div className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`w-6 h-6 ${className}`}
      >
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <path d="M16 10a4 4 0 0 1-8 0"></path>
      </svg>
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-[hsl(320,100%,50%)] text-background text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
