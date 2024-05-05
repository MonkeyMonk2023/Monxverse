import {React, useEffect} from "react";
import './TripCard.css';
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
  faCutlery,
} from "@fortawesome/free-solid-svg-icons";

const TripPlanCard = ({place, place_time, place_bio, place_price, place_rating, place_icon}) => {
  let icon = faLandmark;
  switch (place_icon) {
    case "faFish":
      icon = faFish;
      break;
    case "faPaintBrush":
      icon = faPaintBrush;
      break;
    case "faBowlingBall":
      icon = faBowlingBall;
      break;
    case "faCampground":
      icon = faCampground;
      break;
    case "faChurch":
      icon = faChurch;
      break;
    case "faOm":
      icon = faOm;
      break;
    case "faMosque":
      icon = faMosque;
      break;
    case "faGlassMartiniAlt":
      icon = faGlassMartiniAlt;
      break;
    case "faTree":
      icon = faTree;
      break;
    case "faPlaceOfWorship":
      icon = faPlaceOfWorship;
      break;
    case "faCaravan":
      icon = faCaravan;
      break;
    case "faShoppingCart":
      icon = faShoppingCart;
      break;
    case "faSpa":
      icon = faSpa;
      break;
    case "faSynagogue":
      icon = faSynagogue;
      break;
    case "faLandmark":
      icon = faLandmark;
      break;
    case "faPaw":
      icon = faPaw;
      break;
    case "faMuseum":
      icon = faMuseum;
      break;
    case "faPlayCircle":
      icon = faPlayCircle;
      break;
    case "faCutlery":
      icon = faCutlery;
      break;
    default:
      break;
  }

  return (
    <div className="blog-slider sm:border-primary-400 sm:border-t-4 sm:border-b-0 border-primary-400 border-b-4">
      <div className="blog-slider__item">
        <div className="blog-slider__img shadow-2xl bg-white">
          <FontAwesomeIcon icon={icon} size="2xl" color="#03A9F4"/>
        </div>
        <div className="blog-slider__content">
          <div className="blog-slider__code">
            <h5 className="w-1/2 text-left">{place_time}</h5>
            <h5 className="w-1/2 text-right">{place_price}</h5>
          </div>
          <div className="blog-slider__title">
            <h3>{place}</h3>
          </div>
          <div className="blog-slider__text">
            <h5>{place_bio}</h5>
          </div>
        </div>
      </div>
  </div>
  );
};
export default TripPlanCard;
