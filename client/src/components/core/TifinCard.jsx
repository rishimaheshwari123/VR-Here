import React from "react";
import { Link } from "react-router-dom";
import { HiCurrencyRupee } from "react-icons/hi2";
import { FaLocationDot } from "react-icons/fa6";
import { TbToolsKitchen3 } from "react-icons/tb";
import SevenDayMeal from "./SevenDayMeal"; // Ensure the correct import path

const TifinCard = ({ tifin, view }) => {
  const formatMealType = (type) => {
    switch (type) {
      case "veg":
        return "Veg";
      case "nonveg":
        return "Non-Veg";
      case "veg&nonveg":
        return "Both";
      default:
        return type;
    }
  };

  return (
    <div
      className={`mb-8 p-4 border rounded shadow-xl shadow-yellow-600 ${
        view === "row" ? "flex flex-col md:flex-row" : ""
      }`}
    >
      <Link
        to={`/tifin/${tifin?.slug}`}
        className={`w-full  ${
          view === "row" ? "flex flex-col md:flex-row" : ""
        }`}
      >
        <div className="h-[200px] w-[300px] md:h-[180px] md:w-[210px] lg:h-[200px] lg:w-[325px] mx-auto md:mx-0 shadow-lg  shadow-yellow-600">
          <img
            src={tifin?.images?.[0]?.url}
            alt={`Image of ${tifin?.name}`}
            className="object-cover h-full w-full rounded hover:scale-95"
          />
        </div>
        <div
          className={`mt-4 ${
            view === "row"
              ? "md:ml-4 flex flex-col justify-center md:text-start"
              : "text-start  lg:pl-0"
          }`}
        >
          <p className="font-semibold text-lg">{tifin?.name}</p>
          <p className="mt-2 flex gap-2 items-center text-green-600">
            <HiCurrencyRupee size={25} />
            <span className="lg:text-xl">{tifin?.price}/Month</span>
          </p>
          <p className="mt-2 text-red-600 flex gap-2 items-center">
            <FaLocationDot size={25} />
            <span className="lg:text-xl">
              {tifin?.Location?.map((loc) => loc?.name).join(", ")}
            </span>
          </p>
          <div className="mt-2 text-gray-600 flex gap-2 items-center">
            <TbToolsKitchen3 size={25} />
            <span className="lg:text-xl">{formatMealType(tifin?.type)}</span>
          </div>
        </div>
      </Link>

      <div className=" mt-2">
        <SevenDayMeal menu={tifin?.menu} title="Seven Days Menu" />
      </div>
    </div>
  );
};

export default TifinCard;
