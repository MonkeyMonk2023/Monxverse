import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFish,
  faPaintBrush,
  faBowlingBall,
  faCampground,
  faChurch,
  faOm,
  faMosque,
  faGlassMartiniAlt,
  faTree,
  faPlaceOfWorship,
  faCaravan,
  faShoppingCart,
  faSpa,
  faSynagogue,
  faLandmark,
  faPaw,
  faMuseum,
  faPlayCircle,
  faSquare,
  faCutlery
} from "@fortawesome/free-solid-svg-icons";

const Chips = ({ allTags, selectedTags, onTagClick, onRemoveTag }) => {
  const icon_info = {
  "Amusement Park": { icon: faPlayCircle, color: "#FF6B6B" },
  "Aquarium": { icon: faFish, color: "#3A86FF" },
  "Art Gallery": { icon: faPaintBrush, color: "#FFD166" },
  "Bowling Alley": { icon: faBowlingBall, color: "#06D6A0" },
  "Campground": { icon: faCampground, color: "#118AB2" },
  "Church": { icon: faChurch, color: "#EF476F" },
  "Hindu Temple": { icon: faOm, color: "#FFD166" },
  "Mosque": { icon: faMosque, color: "#EF476F" },
  "Museum": { icon: faMuseum, color: "#118AB2" },
  "Night Club": { icon: faGlassMartiniAlt, color: "#FF6B6B" },
  "Park": { icon: faTree, color: "#06D6A0" },
  "Place of Worship": { icon: faPlaceOfWorship, color: "#EF476F" },
  "Restaurants": { icon: faCutlery, color: "#FF5733"},
  "RV Park": { icon: faCaravan, color: "#FFD166" },
  "Shopping Mall": { icon: faShoppingCart, color: "#3A86FF" },
  "Spa": { icon: faSpa, color: "#118AB2" },
  "Synagogue": { icon: faSynagogue, color: "#EF476F" },
  "Tourist Attraction": { icon: faLandmark, color: "#3A86FF" },
  "Zoo": { icon: faPaw, color: "#06D6A0" },
  "Veg": { icon: faSquare, color: "#27AE60" },
  "Non Veg": { icon: faSquare, color: "#FF5733" }
};

  
  const renderTag = (tag) => (
    <div
      key={tag}
      className={`inline-flex flex-nowrap items-center rounded-full p-1.5 cursor-pointer m-1 ${
        selectedTags && selectedTags.includes(tag) ? "text-white bg-gray-900" : "bg-white text-black"
      }`}
      {...(selectedTags && !selectedTags.includes(tag) && { onClick: () => onTagClick(tag) })}
    >
      <FontAwesomeIcon icon={icon_info[tag].icon} className="me-1.5 inline-block size-3 rounded-full" style={{ color: icon_info[tag].color }} />
      <div className="whitespace-nowrap text-sm font-medium">
        {tag}
      </div>
      {selectedTags && selectedTags.includes(tag) && (
        <div
          className="ms-2.5 inline-flex justify-center items-center size-5 rounded-full text-black bg-white hover:bg-gray-100 cursor-pointer"
          onClick={() => onRemoveTag(tag)}
        >
          <svg
            className="flex-shrink-0 size-3"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </div>
      )}
    </div>
  );

  return (
    <>
      {selectedTags && selectedTags.map((tag) => renderTag(tag))}
      {allTags.map((tag) => !selectedTags || !selectedTags.includes(tag) ? renderTag(tag) : null)}
    </>
  );
};

export default Chips;
