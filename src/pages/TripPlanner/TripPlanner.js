import React, { useState, useEffect, useRef, useLayoutEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faChevronDown,
  faTimes,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { GoogleGenerativeAI } from "@google/generative-ai";
import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";
import { db } from "../../firebase/Firebase";
import { addDoc, collection, getDocs, Timestamp } from "firebase/firestore";

import Chips from "../../components/chips/Chips";
import DisplayTripPlan from "../../containers/DisplayTripPlan/DisplayTripPlan";
import SuggestionCards from "../../components/suggestionCards/SuggestionCards";

import manali from "../../assets/manali.jpg";
import rome from "../../assets/rome.jpg";
import disney from "../../assets/disney.jpg";
import vrindhavan from "../../assets/vrindhavan.jpg";
import boraBora from "../../assets/bora-bora.jpg";

import "./TripPlanner.css";
import DisplayRestaurants from "../../containers/DisplayRestaurants/DisplayRestaurants";
import { useNavigate } from "react-router-dom";

const TripPlanner = () => {
  const navigate = useNavigate();
  const number_of_days = ["1 day", "2 days", "3 days", "4 days", "5 days"];
  const trip_style = [
    "Adventure and Outdoor",
    "Educational Explorations",
    "Family-Friendly",
    "Relaxation",
    "Religious Heritage",
  ];
  const all_place_tags = [
    "Amusement Park",
    "Aquarium",
    "Art Gallery",
    "Bowling Alley",
    "Campground",
    "Church",
    "Hindu Temple",
    "Mosque",
    "Museum",
    "Night Club",
    "Park",
    "Place of Worship",
    "RV Park",
    "Shopping Mall",
    "Spa",
    "Synagogue",
    "Tourist Attraction",
    "Zoo",
  ];
  const tripStyleTags = [
    {
      name: "Relaxation",
      tags: ["Park", "Spa", "Tourist Attraction", "Shopping Mall"],
    },
    {
      name: "Religious Heritage",
      tags: [
        "Church",
        "Hindu Temple",
        "Mosque",
        "Synagogue",
        "Place of Worship"
      ],
    },
    {
      name: "Educational Explorations",
      tags: ["Art Gallery", "Museum"],
    },
    {
      name: "Family-Friendly",
      tags: [
        "Amusement Park",
        "Aquarium",
        "Bowling Alley",
        "Zoo",
        "Park",
        "Tourist Attraction",
        "Shopping Mall"
      ],
    },
    {
      name: "Adventure and Outdoor",
      tags: [
        "Campground",
        "RV Park",
        "Night Club",
        "Amusement Park",
        "Park",
        "Tourist Attraction"
      ],
    },
  ];
  const foodPreferences = ["Veg", "Non Veg"];

  const [showNumberOptions, setShowNumberOptions] = useState(false);
  const [showTripStyleOptions, setShowTripStyleOptions] = useState(false);
  const [selectedTripDays, setSelectedTripDays] = useState(null);
  const [selectedTripStyle, setSelectedTripStyle] = useState(null);
  const [selectedTripDestination, setSelectedTripDestination] = useState(null);
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [relevanttags, setRelevantTags] = useState([]);
  const [selectedFoodPreferences, setSelectedFoodPreferences] = useState([
    "Veg",
  ]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [cityName, setCityName] = useState("");
  const [generatedRestaurants, setGeneratedRestaurants] = useState("");
  const [isResaturantsLoading, setIsResaturantsLoading] = useState(true);
  const [restaurantsError, setRestaurantsError] = useState("");
  const [restaurantsRetryCount, setRestaurantsRetryCount] = useState(0);
  const [featuredPlaces, setFeaturedPlaces] = useState([]);

  const containerRef = useRef(null);
  const destinationInputRef = useRef(null);
  const autoCompleteRef = useRef();

  const genAI = new GoogleGenerativeAI(
    process.env.REACT_APP_GENERATIVE_AI_API_KEY
  );
  console.log( process.env.REACT_APP_GENERATIVE_AI_API_KEY);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowNumberOptions(false);
        setShowTripStyleOptions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const options = {
      fields: ["name", "place_id", "address_components"],
      types: ["(cities)"],
    };

    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      destinationInputRef.current,
      options
    );
    autoCompleteRef.current.addListener("place_changed", handlePlaceChanged);
    return () => {
      const inputRef = destinationInputRef.current;
      if (inputRef) {
        inputRef.removeEventListener("place_changed", handlePlaceChanged);
      }
    };
  }, []);

  useEffect(() => {
    if (formSubmitted) {
      fetchTripPlan();
      fetchRestaurants();
    }
  }, [formSubmitted]);

  useLayoutEffect(() => {
    gsap.registerPlugin(TextPlugin);
    gsap.to(".typewriter", {
      text: "Your Personalized Trip Advisor",
      duration: 3,
      ease: "power1.in",
    });
  });

  useEffect(() => {
    if (selectedTripDestination) {
      const fetchFeaturedPlaces = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "featuredPlaces"));
          const placesData = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.cityName === cityName) {
              placesData.push({ id: doc.id, ...doc.data() });
            }
          });
          setFeaturedPlaces(placesData);
        } catch (error) {
          console.error("Error fetching trips: ", error);
        }
      };
      fetchFeaturedPlaces();
    }
  }, [formSubmitted, cityName]);

  const handlePlaceChanged = () => {
    const place = autoCompleteRef.current.getPlace();
    if (place) {
      setSelectedLocationId(place.place_id);
      setSelectedTripDestination(place.name);
      const address_components = place.address_components;
      address_components.forEach((component) => {
        const types = component.types;
        if (types.includes("locality")) {
          setCityName(component.long_name);
        }
      });
    }
  };

  const handleTripDaysSelect = (day) => {
    setSelectedTripDays(day);
    setShowNumberOptions(false);
  };

  const handleTripStyleSelect = (style) => {
    setSelectedTripStyle(style);
    setShowTripStyleOptions(false);
    findRelevantTags(style);
  };

  const clearSelectedOption = (field) => {
    switch (field) {
      case "trip-days":
        setSelectedTripDays(null);
        setFormSubmitted(false);
        break;
      case "trip-style":
        setSelectedTripStyle(null);
        setFormSubmitted(false);
        break;
      case "destination":
        setSelectedLocationId(null);
        destinationInputRef.current.value = "";
        setFormSubmitted(false);
        break;
      default:
        break;
    }
  };

  const handleChipsSelect = (tag) => {
    setRelevantTags([...relevanttags, tag]);
  };

  const handleChipsUnselect = (tag) => {
    setRelevantTags(relevanttags.filter((selectedtag) => selectedtag !== tag));
  };

  const handleFoodPreferenceSelect = (preference) => {
    setSelectedFoodPreferences([...selectedFoodPreferences, preference]);
  };

  const handleFoodPreferenceUnselect = (preference) => {
    setSelectedFoodPreferences(
      foodPreferences.filter(
        (selectedPreference) => selectedPreference !== preference
      )
    );
  };

  const handleSubmit = () => {
    setFormSubmitted(true);
  };

  const findRelevantTags = (selectedTripStyle) => {
    const placeCategory = tripStyleTags.find(
      (category) => category.name === selectedTripStyle
    );
    const tags = placeCategory ? placeCategory.tags : [];
    setRelevantTags(tags);
  };

  const toggleContent = () => {
    setExpanded(!expanded);
  };

  const handleCardClick = (destination, tripStyle) => {
    setSelectedTripDestination(destination);
    setSelectedTripStyle(tripStyle);
    setSelectedTripDays("2 days");
    destinationInputRef.current.value = destination;
    findRelevantTags(tripStyle);
    setFormSubmitted(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToTripPlan = () => {
    const windowHeight = window.innerHeight;
    const scrollToHeight = windowHeight + 500;
    window.scrollTo({
      top: scrollToHeight,
      behavior: "smooth",
    });
  };

  const fetchTripPlan = async () => {
    let favourable_places = relevanttags.toString();
    let food_preferences = selectedFoodPreferences.toString();
    let featured_place_names = featuredPlaces.map(
      (place) => {
      if (place.postOption !== "featuredPlaces") {
        return `${place.placeName} from ${place.Address}`;
      }
    }
    );
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Imagine you're a seasoned travel advisor specializing in crafting customized trips tailored to individual preferences. Plan a memorable trip for ${selectedTripDays} days to ${selectedTripDestination} with a focus on ${selectedTripStyle} trip style and only the places like ${favourable_places} are allowed within 70km radius. Take into account food preferences, ensuring options for ${food_preferences}. Also, make sure all places for each particular day are nearby to each other and easy to travel. Your goal is to provide detailed recommendations to ensure an enriching and delightful experience for the traveler.
      Your recommendations should include breakfast, lunch, and dinner venues and at least two tourist spots every day, each accompanied by the rating, average price, a brief one-line description, and the most suitable icon from [faFish, faPaintBrush, faBowlingBall, faCampground, faChurch, faOm, faMosque, faGlassMartiniAlt, faTree, faPlaceOfWorship, faCaravan, faShoppingCart, faSpa, faSynagogue, faLandmark, faPaw, faMuseum, faPlayCircle]. The first day of the trip must contain the places ${featured_place_names}. If ${favourable_places} has a particular religious place, then strictly no other religious place of a different religion is allowed in the whole plan. For example, if a temple is selected, no mosque, church, etc., are allowed. Please return your response in JSON format, and the output must be in the below format only:
      {
        trip_plan: {
          destination: "Hyderabad, Telangana, India",
          duration: "1 Day",
          trip_style: "Family-Friendly",
          itinerary: [
            {
              day: "1",
              activities: [
                ["9:00 AM", "Breakfast at Hotel Nayaab", "4.3/5", "₹200 for two", "A popular breakfast spot in Hyderabad, known for its delicious Hyderabadi dishes.", "faCutlery"],
                ["10:00 AM", "Visit the Charminar", "4.7/5", "₹50 per person", "A historical mosque and an iconic landmark of Hyderabad.", "faLandmark"],
                // Add more activities for day 1 as needed
              ]
            },
            // Add more days as needed
          ]
        }
      }
      `;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      let modified_text = JSON.parse(text.replace(/```.*(\n|$)/g, ""));
      setGeneratedContent(modified_text);
      setLoading(false);
      scrollToTripPlan();
      setFormSubmitted(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      if (retryCount < 2) {
        setRetryCount((prevCount) => prevCount + 1);
        fetchTripPlan();
      } else {
        setError("Sorry, something went wrong. Data could not be loaded.");
        setLoading(false);
      }
    }
  };

  const fetchRestaurants = async () => {
    let food_preference = selectedFoodPreferences.toString();
    setIsResaturantsLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Imagine you're a seasoned travel advisor specializing in suggesting restaurants considering individual preferences. Give a list of top 10 Restaurants in ${selectedTripDestination} serving great ${food_preference} food. Each accompanied by the rating, average price, a brief one-line description, 3 most famous ${food_preference} dish in array format only. Please return your response in JSON format, and the output must be in the below format only:
          {
            "destination": "Hyderabad, Telangana, India",
            "food_preference": "Veg",
            "restaurants": [
              {
                "landmark": "Banjara Hills",
                "place_name": "Chutneys",
                "rating": "4.5/5",
                "price": "₹500 for two",
                "bio": "Famous for its South Indian and North Indian vegetarian buffet with over 25 varieties of chutneys.",
                "must_try_dishes": ["Paneer Tikka", "Rajma Chawal", "Dosa"]
              },
              {
                "landmark": "Paradise Circle",
                "place_name": "Bawarchi",
                "rating": "4.6/5",
                "price": "₹700 for two",
                "bio": "Renowned for its Dum Biryani cooked with aromatic spices and flavorful basmati rice.",
                "must_try_dishes": ["Vegetable Dum Biryani", "Paneer Butter Masala", "Gulab Jamun"]
              },
              {
                "landmark": "Secunderabad Railway Station",
                "place_name": "Gokul Chat",
                "rating": "4.8/5",
                "price": "₹300 for two",
                "bio": "Savor the tangy and spicy flavors of Hyderabad's famous Pani Puri and Dahi Puri.",
                "must_try_dishes": ["Pani Puri", "Dahi Puri", "Bhel Puri"]
              },
              {
                "landmark": "Nampally Railway Station",
                "place_name": "Pragati Tiffin Center",
                "rating": "4.4/5",
                "price": "₹100 for two",
                "bio": "Grab some hot and crispy Masala Dosa or Idli served with a variety of chutneys.",
                "must_try_dishes": ["Masala Dosa", "Idli", "Vada"]
              },
              // Add 6 more restaurants...
            ]
          }
          `;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      let modified_text = JSON.parse(text.replace(/```.*(\n|$)/g, ""));
      setGeneratedRestaurants(modified_text);
      setIsResaturantsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", restaurantsError);
      if (restaurantsRetryCount < 2) {
        setRestaurantsRetryCount((prevCount) => prevCount + 1);
        fetchRestaurants();
      } else {
        setRestaurantsError("Sorry, something went wrong. Data could not be loaded.");
        setIsResaturantsLoading(false);
      }
    }
  };

  return (
    <>
      <div>
        <div className="trip_plan_main content-center">
          <div className="w-11/12 mx-auto text-center sm:text-left">
            <h2 className="text-5xl sm:text-7xl text-primary-400 font-extrabold my-2 shadow-black">
            <span className="tripplanner-title">Zenora</span> <sub className="text-sm text-white">By MonkeyMonk</sub></h2>
            <h4 className="text-xl sm:text-3xl text-white my-2 typewriter"></h4>
          </div>
          <div
            ref={containerRef}
            className="formcard md:shadow-2xl md:p-2 w-11/12 md:rounded-3xl m-auto mt-4 px-4 text-white"
          >
            <form>
              <div className="flex w-full flex-row flex-wrap gap-4 sm:gap-0">
                <div className="w-full sm:w-1/2 lg:w-1/3 sm:px-4 sm:py-2 min-w-[300px]">
                  <label htmlFor="destination">Destination:</label>
                  <div className="relative my-2">
                    <input
                      type="text"
                      id="destination"
                      name="destination"
                      ref={destinationInputRef}
                      className="flex-grow text-black relative w-full cursor-pointer rounded-xl border bg-white py-4 pl-6 leading-tight dark-app:bg-[#444444] pr-10 border-neutral-300 dark-app:border-transparent text-left transition-all focus:outline-none"
                      onFocus={() => {
                        setShowNumberOptions(false);
                        setShowTripStyleOptions(false);
                      }}
                    />
                    {selectedLocationId ? (
                      <div
                        className="absolute right-4 top-4 text-gray-500 cursor-pointer"
                        onClick={() => clearSelectedOption("destination")}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </div>
                    ) : (
                      <div className="absolute right-4 top-4 text-gray-500">
                        <FontAwesomeIcon icon={faSearch} />
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full sm:w-1/2 lg:w-1/3 sm:px-4 sm:py-2 min-w-[300px]">
                  <label htmlFor="trip-days">Trip days:</label>
                  <div className="relative my-2">
                    <button
                      type="button"
                      id="trip-days"
                      name="trip-days"
                      className={`dark-app:text-white relative w-full cursor-pointer rounded-xl border bg-white py-4 pl-6 leading-tight dark-app:bg-[#444444] pr-10 border-neutral-300 dark-app:border-transparent transition-all focus:transition-none text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-200 ${
                        selectedTripDays == null
                          ? "text-gray-500"
                          : "text-black"
                      }`}
                      aria-haspopup="list-box"
                      aria-expanded={showNumberOptions}
                      onClick={() => {
                        setShowNumberOptions(!showNumberOptions);
                        setShowTripStyleOptions(false);
                      }}
                    >
                      <span className="mr-2">
                        {selectedTripDays || "Trip days"}
                      </span>
                      {selectedTripDays ? (
                        <div
                          className="absolute right-4 top-4 text-gray-500 cursor-pointer"
                          onClick={() => clearSelectedOption("trip-days")}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </div>
                      ) : (
                        <div className="absolute right-4 top-4 text-gray-500">
                          <FontAwesomeIcon icon={faChevronDown} />
                        </div>
                      )}
                    </button>
                    {showNumberOptions && (
                      <div className="absolute z-10 mt-2 bg-white border rounded-md shadow-lg w-full">
                        <ul className="max-h-60 w-full overflow-auto rounded-md bg-white py-1 px-0 text-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark-app:bg-[#444444] dark-app:text-white sm:text-sm">
                          {number_of_days.map((option, index) => (
                            <li
                              key={`headlessui-listbox-option-${index}`}
                              className={`relative cursor-pointer select-none py-2 pr-4 pl-4 ${
                                selectedTripDays === option
                                  ? "text-blue-500"
                                  : ""
                              } hover:bg-gray-200`}
                              onClick={() => handleTripDaysSelect(option)}
                            >
                              <span className="block font-normal">
                                {option}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full sm:w-full lg:w-1/3 sm:px-4 sm:py-2 min-w-[300px]">
                  <label htmlFor="trip-style">Trip style:</label>
                  <div className="relative my-2">
                    <button
                      type="button"
                      id="trip-style"
                      name="trip-style"
                      className={`text-black dark-app:text-white relative w-full cursor-pointer rounded-xl border bg-white py-4 pl-6 leading-tight dark-app:bg-[#444444] pr-10 border-neutral-300 dark-app:border-transparent transition-all focus:transition-none text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-200 ${
                        selectedTripStyle == null
                          ? "text-gray-500"
                          : "text-black"
                      }`}
                      aria-haspopup="list-box"
                      aria-expanded={showTripStyleOptions}
                      onClick={() => {
                        setShowTripStyleOptions(!showTripStyleOptions);
                        setShowNumberOptions(false);
                      }}
                    >
                      <span className="mr-2">
                        {selectedTripStyle || "Trip style"}
                      </span>
                      {selectedTripStyle ? (
                        <div
                          className="absolute right-4 top-4 text-gray-500 cursor-pointer"
                          onClick={() => clearSelectedOption("trip-style")}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </div>
                      ) : (
                        <div className="absolute right-4 top-4 text-gray-500">
                          <FontAwesomeIcon icon={faChevronDown} />
                        </div>
                      )}
                    </button>
                    {showTripStyleOptions && (
                      <div className="absolute z-10 mt-2 bg-white border rounded-md shadow-lg w-full">
                        <ul className="max-h-60 w-full overflow-auto rounded-md bg-white py-1 px-0 text-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark-app:bg-[#444444] dark-app:text-white sm:text-sm">
                          {trip_style.map((option, index) => (
                            <li
                              key={`headlessui-listbox-option-${index}`}
                              className={`relative cursor-pointer select-none py-2 px-4 ${
                                selectedTripStyle === option
                                  ? "text-blue-500"
                                  : ""
                              } hover:bg-gray-200`}
                              onClick={() => handleTripStyleSelect(option)}
                            >
                              <span className="block font-normal">
                                {option}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {selectedTripStyle && (
                <div className="w-100 text-right">
                  <span onClick={toggleContent} className="cursor-pointer">
                    Filter{" "}
                    {!expanded ? (
                      <FontAwesomeIcon icon={faPlus} className="mx-2" />
                    ) : (
                      <FontAwesomeIcon icon={faMinus} className="mx-2" />
                    )}
                  </span>
                </div>
              )}
              {selectedTripStyle != null && expanded && (
                <div className=" sm:mx-2">
                  <h5 className="my-2">Place type</h5>
                  <Chips
                    allTags={all_place_tags}
                    selectedTags={relevanttags}
                    onTagClick={handleChipsSelect}
                    onRemoveTag={handleChipsUnselect}
                  />
                </div>
              )}
              {expanded && relevanttags &&(
                <div className="sm:mx-2">
                  <h5 className="my-2">Food preference</h5>
                  <Chips
                    allTags={foodPreferences}
                    selectedTags={selectedFoodPreferences}
                    onTagClick={handleFoodPreferenceSelect}
                    onRemoveTag={handleFoodPreferenceUnselect}
                  />
                </div>
              )}
              <div className="form_submit sm:mx-4">
                {loading && formSubmitted ? (
                  <button
                    type="button"
                    className="text-white bg-primary-400 hover:bg-primary-600 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-primary-400 dark:hover:bg-primary-600 focus:outline-none dark:focus:ring-primary-600 my-2"
                    disabled
                  >
                    <div className="flex items-center gap-2">
                      <span className="h-4 w-4 block rounded-full border-2 border-t-blue-300 animate-spin"></span>
                      loading...
                    </div>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="text-white bg-primary-400 hover:bg-primary-600 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-primary-400 dark:hover:bg-primary-600 focus:outline-none dark:focus:ring-primary-600 my-2"
                  >
                    Submit
                  </button>
                )}
              </div>
            </form>
          </div>
          <div></div>
        </div>
        {generatedContent && <DisplayTripPlan tripData={generatedContent} />}
        {generatedRestaurants && <DisplayRestaurants restaurantsData={generatedRestaurants}/>}
        {featuredPlaces.length !== 0 && (
          <div className="m-10">
            <div className="text-center">
              <h2 className="text-2xl lg:text-3xl mx-4 sm:mx-8 font-bold my-2">
                Recommended Places
              </h2>
              <p>Most trending and popular places around the world</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-screen-xl mx-auto my-2">
              {featuredPlaces.map((place) => (
                place.postOption !== "tripPlan" &&
                <SuggestionCards
                  key={place.id}
                  name={place.placeName}
                  tag={place.placeTag}
                  link={place.placeLink}
                  imageurl={place.placeImage}
                  description={place.placeDescription}
                  address={place.Address}
                />
              ))}
            </div>
          </div>
        )}
        <div className="m-2 rounded-2xl my-8 py-4">
          <div className="text-center">
            <h2 className="text-2xl lg:text-3xl mx-4 sm:mx-8 font-bold my-4">
              Famous Itineraries
            </h2>
            <p>Most famous itineraries from each category</p>
          </div>
          <div className="demo-section my-2">
            <div
              className="card anim-left"
              onClick={() =>
                handleCardClick("Orlando, U.S.A", "Family-Friendly")
              }
            >
              <div className="card__img">
                <img src={disney} alt="Disney, Orlando U.S.A" />
                <h1 className="title text-primary-400 font-bold text-3xl lg:text-4xl">
                  Orlando, U.S.A
                </h1>
                <div className="card__overlay">
                  <h2>Family-Friendly</h2>
                </div>
              </div>
            </div>

            <div
              className="card anim-center"
              onClick={() =>
                handleCardClick("Manali, India", "Adventure and Outdoor")
              }
            >
              <div className="card__img">
                <img src={manali} alt="Manali, India" />
                <h1 className="title text-primary-400 font-bold text-3xl lg:text-4xl">
                  Manali, India
                </h1>
                <div className="card__overlay">
                  <h2>Adventure and Outdoor</h2>
                </div>
              </div>
            </div>

            <div
              className="card anim-right"
              onClick={() =>
                handleCardClick("Vrindhavan, India", "Religious Heritage")
              }
            >
              <div className="card__img">
                <img src={vrindhavan} alt="Vrindhavan, India" />
                <h1 className="title text-primary-400 font-bold text-3xl lg:text-4xl">
                  Vrindhavan, India
                </h1>
                <div className="card__overlay">
                  <h2>Religious Heritage</h2>
                </div>
              </div>
            </div>

            <div
              className="card anim-left"
              onClick={() =>
                handleCardClick("Bora Bora, French Polynesia", "Relaxation")
              }
            >
              <div className="card__img">
                <img src={boraBora} alt="Bora Bora, French Polynesiar" />
                <h1 className="title text-primary-400 font-bold text-3xl lg:text-4xl">
                  Bora Bora, French Polynesia
                </h1>
                <div className="card__overlay">
                  <h2>Relaxation</h2>
                </div>
              </div>
            </div>

            <div
              className="card anim-right"
              onClick={() =>
                handleCardClick("Rome, Italy", "Educational Explorations")
              }
            >
              <div className="card__img">
                <img src={rome} alt="Rome, Italy" />
                <h1 className="title text-primary-400 font-bold text-3xl lg:text-4xl">
                  Rome, Italy
                </h1>
                <div className="card__overlay">
                  <h2>Educational Explorations</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-6 text-sm text-center dark:text-gray-400">
        © 2023 MonkeyMonk. All rights reserved.
      <p className="text-xs mt-1">By using MonkeyMonk, you agree to our <span className="cursor-pointer underline" onClick={() => { navigate("/terms&conditions")}} target="_blank">Terms of Service</span> and <span className="cursor-pointer underline" onClick={() => { navigate("/privacypolicy")}} target="_blank">Privacy Policy</span></p>
      </div>
      </div>
    </>
  );
};

export default TripPlanner;
