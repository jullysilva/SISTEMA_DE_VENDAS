import React from "react";
import { Link } from "react-router-dom";

interface CardProps {
  imageSrc: string;
  text: string;
  route: string | "/NotFound";
}

const Card: React.FC<CardProps> = ({ imageSrc, text, route }) => {
  return (
    <Link to={route}>
      <div
        className="
        flex
        flex-col
        bg-white
        rounded-lg
        shadow-lg
        hover:shadow-2xl
        hover:scale-105
        transform
        transition-all
        duration-300
        ease-in-out
        cursor-pointer
        p-3                 
        w-[150px]
        text-center      
      "
      >
        <img
          src={imageSrc}
          alt={text}
          className="w-full h-32 object-cover rounded-md mb-2"
        />
        <p className="w-[100%] h-fit object-cover rounded-md mb-2">{text}</p>
      </div>
    </Link>
  );
};

export default Card;
